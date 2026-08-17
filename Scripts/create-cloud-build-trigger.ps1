#Requires -Version 5.1
<#
.SYNOPSIS
Creates or repairs the Cloud Build trigger that gives voltservice-web
continuous deployment from GitHub.

.DESCRIPTION
This is the Windows PowerShell equivalent of Scripts/create-cloud-build-trigger.sh.
A push to the tracked branch runs cloudbuild.yaml, which builds, tests, and
deploys voltservice-web to Cloud Run with the --min-instances/--max-instances
bounds set there.

Runs the trigger under BuildServiceAccount rather than Cloud Build's default
service account - the default account does not have the run.builder /
artifactregistry.writer / iam.serviceAccountUser bindings that
Scripts/deploy-cloud-run.ps1's bootstrap step grants specifically to
BuildServiceAccount, so builds under the default account fail with a
permission error on the deploy step.

Prerequisite: the GitHub repo must already be connected to Cloud Build via
the 2nd-gen GitHub App connector (Cloud Console -> Cloud Build -> Repositories
-> Connect repository). That step is interactive OAuth and cannot be
scripted - this script only creates/updates the trigger against an existing
connection + repository resource.

If a trigger already exists under a DIFFERENT name (for example, one
auto-created by the Cloud Run console's "Continuously deploy" wizard), this
script will not find it - list existing triggers/connections first:
  gcloud builds triggers list --region=europe-west2 --project=voltservice-web
  gcloud builds connections list --region=europe-west2 --project=voltservice-web
then either set TRIGGER_NAME=<that name> to repair it in place, or delete
the misconfigured one and let this script create a clean one.

.PARAMETER DryRun
Print what would happen (create or update) without calling gcloud to change anything.

.PARAMETER Help
Show this help text.

.EXAMPLE
.\Scripts\create-cloud-build-trigger.ps1

.EXAMPLE
.\Scripts\create-cloud-build-trigger.ps1 -DryRun

.EXAMPLE
$env:TRIGGER_NAME = "<existing-name>"; .\Scripts\create-cloud-build-trigger.ps1
#>
[CmdletBinding()]
param(
  [switch]$DryRun,
  [switch]$Help
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

if ($Help) {
  @"
Usage:
  .\Scripts\create-cloud-build-trigger.ps1
  .\Scripts\create-cloud-build-trigger.ps1 -DryRun

Environment overrides:
  PROJECT_ID=voltservice-web
  REGION=europe-west2
  REPO_OWNER=voltserviceltd
  REPO_NAME=voltservice-web
  CONNECTION_NAME=cloudrun-voltservice-web-git-europe-west2-voltserviceltd-volzik
  BUILD_SERVICE_ACCOUNT=voltserviceltd-cloud-run-build@voltservice-web.iam.gserviceaccount.com
  TRIGGER_NAME=voltservice-web-main
  BRANCH_PATTERN=^main$
  BUILD_CONFIG=cloudbuild.yaml
"@ | Write-Output
  exit 0
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

Require-Command "gcloud"
Require-Command "git"

$repoRoot = Invoke-GitOutput @("rev-parse", "--show-toplevel")
Push-Location $repoRoot

try {
  $ProjectId = Get-EnvOrDefault "PROJECT_ID" "voltservice-web"
  $Region = Get-EnvOrDefault "REGION" "europe-west2"
  $RepoOwner = Get-EnvOrDefault "REPO_OWNER" "voltserviceltd"
  $RepoName = Get-EnvOrDefault "REPO_NAME" "voltservice-web"
  $ConnectionName = Get-EnvOrDefault "CONNECTION_NAME" "cloudrun-voltservice-web-git-europe-west2-voltserviceltd-volzik"
  $BuildServiceAccount = Get-EnvOrDefault "BUILD_SERVICE_ACCOUNT" "voltserviceltd-cloud-run-build@$ProjectId.iam.gserviceaccount.com"
  $TriggerName = Get-EnvOrDefault "TRIGGER_NAME" "$RepoName-main"
  $BranchPattern = Get-EnvOrDefault "BRANCH_PATTERN" "^main$"
  $BuildConfig = Get-EnvOrDefault "BUILD_CONFIG" "cloudbuild.yaml"

  if ([string]::IsNullOrWhiteSpace($ConnectionName)) {
    throw "CONNECTION_NAME is required - set it to the name of the existing Cloud Build GitHub connection (Cloud Console -> Cloud Build -> Repositories) that this repo was connected through."
  }

  $RepositoryResource = "projects/$ProjectId/locations/$Region/connections/$ConnectionName/repositories/$RepoName"
  $BuildSaResource = "projects/$ProjectId/serviceAccounts/$BuildServiceAccount"

  Write-Host "Project: $ProjectId"
  Write-Host "Region: $Region"
  Write-Host "Repository resource: $RepositoryResource"
  Write-Host "Trigger name: $TriggerName"
  Write-Host "Trigger service account: $BuildServiceAccount"
  Write-Host "Branch pattern: $BranchPattern"
  Write-Host "Build config: $BuildConfig"

  $repositoryExists = Test-GcloudCommand @(
    "builds", "repositories", "describe", $RepoName,
    "--connection=$ConnectionName",
    "--region=$Region",
    "--project=$ProjectId"
  )

  if (-not $repositoryExists) {
    throw "Repository resource not found: $RepositoryResource`nConnect $RepoOwner/$RepoName under connection '$ConnectionName' first (Cloud Console -> Cloud Build -> Repositories -> Link repository)."
  }

  $triggerExists = Test-GcloudCommand @(
    "builds", "triggers", "describe", $TriggerName,
    "--region=$Region",
    "--project=$ProjectId"
  )

  if ($DryRun) {
    $action = if ($triggerExists) { "update" } else { "create" }
    Write-Host "[dry-run] Would $action trigger '$TriggerName' with service account '$BuildServiceAccount'."
    return
  }

  if ($triggerExists) {
    Write-Host "Trigger already exists: $TriggerName - updating it in place (service account, branch pattern, build config)."
    Invoke-Gcloud @(
      "builds", "triggers", "update", "github", $TriggerName,
      "--repository=$RepositoryResource",
      "--branch-pattern=$BranchPattern",
      "--build-config=$BuildConfig",
      "--service-account=$BuildSaResource",
      "--region=$Region",
      "--project=$ProjectId"
    )
    return
  }

  Write-Host "Creating trigger: $TriggerName"
  Invoke-Gcloud @(
    "builds", "triggers", "create", "github",
    "--name=$TriggerName",
    "--repository=$RepositoryResource",
    "--branch-pattern=$BranchPattern",
    "--build-config=$BuildConfig",
    "--service-account=$BuildSaResource",
    "--region=$Region",
    "--project=$ProjectId"
  )
}
finally {
  Pop-Location
}
