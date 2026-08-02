#Requires -Version 5.1
<#
.SYNOPSIS
Deploys VoltService Web to Cloud Run using the local Google Cloud SDK.

.DESCRIPTION
This is the Windows PowerShell equivalent of Scripts/deploy-cloud-run.sh.
It uses the project's Dockerfile and cloudbuild.yaml:
  1. Bootstrap required APIs, service accounts, IAM, and Artifact Registry.
  2. Submit cloudbuild.yaml with gcloud builds submit.
  3. Cloud Build runs tests, builds the runtime image, pushes Artifact Registry,
     and deploys Cloud Run.

.PARAMETER BootstrapOnly
Create/update cloud prerequisites only. Do not submit a Cloud Build.

.PARAMETER SkipBootstrap
Submit a Cloud Build only. Assumes cloud prerequisites already exist.

.PARAMETER DeployOnly
Alias behavior for SkipBootstrap.

.PARAMETER ImpersonateDeployer
Submit the Cloud Build while impersonating the configured deployer service account.

.PARAMETER Help
Show this help text.

.EXAMPLE
.\Scripts\deploy-cloud-run.ps1

.EXAMPLE
.\Scripts\deploy-cloud-run.ps1 -BootstrapOnly

.EXAMPLE
.\Scripts\deploy-cloud-run.ps1 -SkipBootstrap

.EXAMPLE
.\Scripts\deploy-cloud-run.ps1 -SkipBootstrap -ImpersonateDeployer
#>
[CmdletBinding()]
param(
  [switch]$BootstrapOnly,
  [switch]$SkipBootstrap,
  [switch]$DeployOnly,
  [switch]$ImpersonateDeployer,
  [switch]$Help
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

if ($Help) {
  @"
Usage:
  .\Scripts\deploy-cloud-run.ps1
  .\Scripts\deploy-cloud-run.ps1 -BootstrapOnly
  .\Scripts\deploy-cloud-run.ps1 -SkipBootstrap
  .\Scripts\deploy-cloud-run.ps1 -SkipBootstrap -ImpersonateDeployer

Environment overrides:
  PROJECT_ID=voltservice-web
  REGION=europe-west2
  SERVICE=voltservice-web
  AR_PROJECT_PATH=voltservice-web
  AR_REPOSITORY=voltservice
  AR_DESCRIPTION="VoltService Web container images"
  AR_LABELS=service=voltservice-web,environment=production,owner=voltservice
  RUNTIME_SA=voltserviceltd-cloud-run-runti@voltservice-web.iam.gserviceaccount.com
  BUILD_SA=voltserviceltd-cloud-run-build@voltservice-web.iam.gserviceaccount.com
  DEPLOYER_SA=voltserviceltd-cloud-run-deplo@voltservice-web.iam.gserviceaccount.com
  NEXT_PUBLIC_SITE_URL=https://metalbrain.net
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
  MIN_INSTANCES=1
  MAX_INSTANCES=4
"@ | Write-Output
  exit 0
}

if ($BootstrapOnly -and ($SkipBootstrap -or $DeployOnly)) {
  throw "Use either -BootstrapOnly or -SkipBootstrap/-DeployOnly, not both."
}

function Get-EnvOrDefault {
  param(
    [Parameter(Mandatory = $true)][string]$Name,
    [Parameter(Mandatory = $true)][AllowEmptyString()][string]$Default
  )

  $value = [Environment]::GetEnvironmentVariable($Name)
  if ([string]::IsNullOrWhiteSpace($value)) {
    return $Default
  }

  return $value
}

function ConvertTo-ArtifactRegistryProjectPath {
  param([Parameter(Mandatory = $true)][string]$ProjectId)
  return $ProjectId.Replace(":", "/")
}

function Get-ServiceAccountNameFromEmail {
  param([Parameter(Mandatory = $true)][string]$Email)
  return ($Email -split "@", 2)[0]
}

function Require-Command {
  param([Parameter(Mandatory = $true)][string]$Name)

  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "Required command not found: $Name"
  }
}

function Invoke-Gcloud {
  param([Parameter(Mandatory = $true)][string[]]$Arguments)

  $previousErrorActionPreference = $ErrorActionPreference
  $ErrorActionPreference = "Continue"

  try {
    $output = & gcloud @Arguments 2>&1
    $exitCode = $LASTEXITCODE
  }
  finally {
    $ErrorActionPreference = $previousErrorActionPreference
  }

  foreach ($line in $output) {
    Write-Host $line.ToString()
  }

  if ($exitCode -ne 0) {
    throw "gcloud failed: gcloud $($Arguments -join ' ')"
  }
}

function Invoke-GcloudOutput {
  param([Parameter(Mandatory = $true)][string[]]$Arguments)

  $previousErrorActionPreference = $ErrorActionPreference
  $ErrorActionPreference = "Continue"

  try {
    $output = & gcloud @Arguments 2>&1
    $exitCode = $LASTEXITCODE
  }
  finally {
    $ErrorActionPreference = $previousErrorActionPreference
  }

  if ($exitCode -ne 0) {
    throw "gcloud failed: gcloud $($Arguments -join ' ')"
  }

  return (($output | ForEach-Object { $_.ToString() }) -join "`n").Trim()
}

function Test-GcloudCommand {
  param([Parameter(Mandatory = $true)][string[]]$Arguments)

  $previousErrorActionPreference = $ErrorActionPreference
  $ErrorActionPreference = "Continue"

  try {
    & gcloud @Arguments *> $null
    $exitCode = $LASTEXITCODE
  }
  finally {
    $ErrorActionPreference = $previousErrorActionPreference
  }

  return $exitCode -eq 0
}

function Invoke-GitOutput {
  param([Parameter(Mandatory = $true)][string[]]$Arguments)

  $output = & git @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "git failed: git $($Arguments -join ' ')"
  }

  return ($output -join "`n").Trim()
}

function Get-CurrentGcloudAccount {
  return Invoke-GcloudOutput @("config", "get-value", "account")
}

function Ensure-ServiceAccount {
  param(
    [Parameter(Mandatory = $true)][string]$Name,
    [Parameter(Mandatory = $true)][string]$Email,
    [Parameter(Mandatory = $true)][string]$DisplayName
  )

  if (Test-GcloudCommand @("iam", "service-accounts", "describe", $Email, "--project=$ProjectId")) {
    Write-Host "Service account exists: $Email"
    return
  }

  Write-Host "Creating service account: $Email"
  Invoke-Gcloud @(
    "iam", "service-accounts", "create", $Name,
    "--display-name=$DisplayName",
    "--project=$ProjectId",
    "--quiet"
  )
}

function Bind-ProjectRole {
  param(
    [Parameter(Mandatory = $true)][string]$Member,
    [Parameter(Mandatory = $true)][string]$Role
  )

  Write-Host "Ensuring project role: $Member -> $Role"
  # --condition=None: required non-interactively once a policy has any
  # conditional bindings, else gcloud refuses to add an unconditional one.
  Invoke-Gcloud @(
    "projects", "add-iam-policy-binding", $ProjectId,
    "--member=$Member",
    "--role=$Role",
    "--condition=None",
    "--quiet"
  )
}

function Bind-ServiceAccountRole {
  param(
    [Parameter(Mandatory = $true)][string]$ServiceAccount,
    [Parameter(Mandatory = $true)][string]$Member,
    [Parameter(Mandatory = $true)][string]$Role
  )

  Write-Host "Ensuring service account role: $Member -> $Role on $ServiceAccount"
  Invoke-Gcloud @(
    "iam", "service-accounts", "add-iam-policy-binding", $ServiceAccount,
    "--member=$Member",
    "--role=$Role",
    "--project=$ProjectId",
    "--condition=None",
    "--quiet"
  )
}

function Ensure-ArtifactRepository {
  $repoExists = Test-GcloudCommand @(
    "artifacts", "repositories", "describe", $ArtifactRepository,
    "--location=$Region",
    "--project=$ProjectId"
  )

  if ($repoExists) {
    Write-Host "Artifact Registry repository exists: $ArtifactRepository ($Region)"
    Write-Host "Updating mutable Artifact Registry repository settings"
    Invoke-Gcloud @(
      "artifacts", "repositories", "update", $ArtifactRepository,
      "--location=$Region",
      "--project=$ProjectId",
      "--description=$ArtifactRepositoryDescription",
      "--update-labels=$ArtifactRepositoryLabels",
      "--no-immutable-tags",
      "--disable-vulnerability-scanning",
      "--clear-platform-logs",
      "--quiet"
    )
    return
  }

  Write-Host "Creating Artifact Registry repository: $ArtifactRepository ($Region)"
  Invoke-Gcloud @(
    "artifacts", "repositories", "create", $ArtifactRepository,
    "--repository-format=docker",
    "--mode=standard-repository",
    "--location=$Region",
    "--description=$ArtifactRepositoryDescription",
    "--labels=$ArtifactRepositoryLabels",
    "--disable-vulnerability-scanning",
    "--clear-platform-logs",
    "--project=$ProjectId",
    "--quiet"
  )
}

function Bootstrap-Cloud {
  param([Parameter(Mandatory = $true)][string]$DeployerUser)

  Write-Host "Enabling Google Cloud APIs"
  Invoke-Gcloud @(
    "services", "enable",
    "run.googleapis.com",
    "cloudbuild.googleapis.com",
    "artifactregistry.googleapis.com",
    "iam.googleapis.com",
    "serviceusage.googleapis.com",
    "--project=$ProjectId",
    "--quiet"
  )

  Ensure-ServiceAccount $RuntimeSaName $RuntimeSa "Cloud Run Runtime"
  Ensure-ServiceAccount $BuildSaName $BuildSa "Cloud Run Source Builder"
  Ensure-ServiceAccount $DeployerSaName $DeployerSa "Cloud Run Deployer"
  Ensure-ArtifactRepository

  Bind-ProjectRole "user:$DeployerUser" "roles/serviceusage.serviceUsageConsumer"
  Bind-ProjectRole "user:$DeployerUser" "roles/cloudbuild.builds.editor"
  Bind-ProjectRole "user:$DeployerUser" "roles/run.sourceDeveloper"

  Bind-ProjectRole "serviceAccount:$BuildSa" "roles/run.builder"
  Bind-ProjectRole "serviceAccount:$BuildSa" "roles/run.developer"
  Bind-ProjectRole "serviceAccount:$BuildSa" "roles/cloudbuild.builds.builder"
  Bind-ProjectRole "serviceAccount:$BuildSa" "roles/developerconnect.readTokenAccessor"
  Bind-ProjectRole "serviceAccount:$BuildSa" "roles/artifactregistry.writer"
  Bind-ProjectRole "serviceAccount:$BuildSa" "roles/logging.logWriter"

  Bind-ProjectRole "serviceAccount:$DeployerSa" "roles/serviceusage.serviceUsageConsumer"
  Bind-ProjectRole "serviceAccount:$DeployerSa" "roles/cloudbuild.builds.editor"
  Bind-ProjectRole "serviceAccount:$DeployerSa" "roles/run.sourceDeveloper"

  Bind-ServiceAccountRole $RuntimeSa "user:$DeployerUser" "roles/iam.serviceAccountUser"
  Bind-ServiceAccountRole $BuildSa "user:$DeployerUser" "roles/iam.serviceAccountUser"

  Bind-ServiceAccountRole $RuntimeSa "serviceAccount:$BuildSa" "roles/iam.serviceAccountUser"
  Bind-ServiceAccountRole $BuildSa "serviceAccount:$DeployerSa" "roles/iam.serviceAccountUser"
  Bind-ServiceAccountRole $DeployerSa "user:$DeployerUser" "roles/iam.serviceAccountTokenCreator"

  # A GitHub-connected Cloud Build trigger runs builds via Cloud Build's own
  # service agent, not the interactive deployer — so the agent itself needs
  # permission to act as BuildSa, or webhook-triggered builds fail with a
  # permission error even though manual `gcloud builds submit` runs work fine.
  Bind-ServiceAccountRole $BuildSa "serviceAccount:service-$projectNumber@gcp-sa-cloudbuild.iam.gserviceaccount.com" "roles/iam.serviceAccountUser"
}

function Get-CommitSha {
  $fromEnv = Get-EnvOrDefault "COMMIT_SHA" ""
  if (-not [string]::IsNullOrWhiteSpace($fromEnv)) {
    return $fromEnv
  }

  $sha = & git rev-parse --short=12 HEAD 2>$null
  if ($LASTEXITCODE -eq 0 -and -not [string]::IsNullOrWhiteSpace($sha)) {
    return ($sha -join "").Trim()
  }

  return Get-Date -Format "yyyyMMddHHmmss"
}

function Deploy-CloudRun {
  $commitSha = Get-CommitSha
  $substitutions = "COMMIT_SHA=$commitSha,_REGION=$Region,_SERVICE=$Service,_AR_PROJECT_PATH=$ArtifactRegistryProjectPath,_AR_REPOSITORY=$ArtifactRepository,_RUNTIME_SERVICE_ACCOUNT=$RuntimeSa,_NEXT_PUBLIC_SITE_URL=$NextPublicSiteUrl,_NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NextPublicRecaptchaSiteKey,_MIN_INSTANCES=$MinInstances,_MAX_INSTANCES=$MaxInstances"
  $buildServiceAccount = "projects/$ProjectId/serviceAccounts/$BuildSa"

  $args = @(
    "builds", "submit",
    ".",
    "--project=$ProjectId",
    "--config=cloudbuild.yaml",
    "--service-account=$buildServiceAccount",
    "--substitutions=$substitutions"
  )

  if ($ImpersonateDeployer) {
    $args += "--impersonate-service-account=$DeployerSa"
  }

  Write-Host "Submitting Cloud Build for $Service ($commitSha)"
  Invoke-Gcloud $args
}

Require-Command "gcloud"
Require-Command "git"

$repoRoot = Invoke-GitOutput @("rev-parse", "--show-toplevel")
Push-Location $repoRoot

try {
  $ProjectId = Get-EnvOrDefault "PROJECT_ID" "voltservice-web"
  $Region = Get-EnvOrDefault "REGION" "europe-west2"
  $Service = Get-EnvOrDefault "SERVICE" "voltservice-web"
  $ArtifactRepository = Get-EnvOrDefault "AR_REPOSITORY" "voltservice"
  $ArtifactRegistryProjectPath = Get-EnvOrDefault "AR_PROJECT_PATH" (ConvertTo-ArtifactRegistryProjectPath $ProjectId)
  $ArtifactRepositoryDescription = Get-EnvOrDefault "AR_DESCRIPTION" "VoltService Web container images"
  $ArtifactRepositoryLabels = Get-EnvOrDefault "AR_LABELS" "service=voltservice-web,environment=production,owner=voltservice"
  $NextPublicSiteUrl = Get-EnvOrDefault "NEXT_PUBLIC_SITE_URL" "https://metalbrain.net"
  $NextPublicRecaptchaSiteKey = Get-EnvOrDefault "NEXT_PUBLIC_RECAPTCHA_SITE_KEY" ""
  $MinInstances = Get-EnvOrDefault "MIN_INSTANCES" "1"
  $MaxInstances = Get-EnvOrDefault "MAX_INSTANCES" "4"

  $RuntimeSaName = Get-EnvOrDefault "RUNTIME_SA_NAME" "voltserviceltd-cloud-run-runti"
  $BuildSaName = Get-EnvOrDefault "BUILD_SA_NAME" "voltserviceltd-cloud-run-build"
  $DeployerSaName = Get-EnvOrDefault "DEPLOYER_SA_NAME" "voltserviceltd-cloud-run-deplo"

  $RuntimeSa = Get-EnvOrDefault "RUNTIME_SA" "$RuntimeSaName@$ProjectId.iam.gserviceaccount.com"
  $BuildSa = Get-EnvOrDefault "BUILD_SA" "$BuildSaName@$ProjectId.iam.gserviceaccount.com"
  $DeployerSa = Get-EnvOrDefault "DEPLOYER_SA" "$DeployerSaName@$ProjectId.iam.gserviceaccount.com"

  $RuntimeSaName = Get-ServiceAccountNameFromEmail $RuntimeSa
  $BuildSaName = Get-ServiceAccountNameFromEmail $BuildSa
  $DeployerSaName = Get-ServiceAccountNameFromEmail $DeployerSa

  $doBootstrap = $true
  $doDeploy = $true
  if ($BootstrapOnly) {
    $doDeploy = $false
  }
  if ($SkipBootstrap -or $DeployOnly) {
    $doBootstrap = $false
    $doDeploy = $true
  }

  $deployerUser = Get-CurrentGcloudAccount
  if ([string]::IsNullOrWhiteSpace($deployerUser) -or $deployerUser -eq "(unset)") {
    throw "No active gcloud account. Run: gcloud auth login"
  }

  $projectNumber = Invoke-GcloudOutput @("projects", "describe", $ProjectId, "--format=value(projectNumber)")

  Write-Host "Project: $ProjectId ($projectNumber)"
  Write-Host "Region: $Region"
  Write-Host "Service: $Service"
  Write-Host "Artifact Registry project path: $ArtifactRegistryProjectPath"
  Write-Host "Artifact Registry repository: $ArtifactRepository"
  Write-Host "Artifact Registry labels: $ArtifactRepositoryLabels"
  Write-Host "Instance bounds: min=$MinInstances max=$MaxInstances"
  Write-Host "Runtime service account: $RuntimeSa"
  Write-Host "Build service account: $BuildSa"
  Write-Host "Deployer service account: $DeployerSa"
  Write-Host "Active gcloud user: $deployerUser"

  if ($doBootstrap) {
    Bootstrap-Cloud $deployerUser
  }

  if ($doDeploy) {
    Deploy-CloudRun
  }
}
finally {
  Pop-Location
}
