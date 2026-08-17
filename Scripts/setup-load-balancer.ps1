#Requires -Version 5.1
<#
.SYNOPSIS
Creates the Global external HTTPS Load Balancer that fronts the europe-west1
voltservice-web Cloud Run service.

.DESCRIPTION
This is the Windows PowerShell equivalent of Scripts/setup-load-balancer.sh.
Creates, idempotently: a reserved static IP, a Serverless NEG, a backend
service, a URL map, a Google-managed SSL cert for the custom domain, an
HTTPS forwarding rule, an HTTP->HTTPS redirect, and a Cloud Armor security
policy attached to the backend.

This exists because org policy constraints/run.allowedIngress (see
allowed_ingress_policy.yaml) only permits "internal" and
"internal-and-cloud-load-balancing" - the Cloud Run service deployed by
cloudbuild.yaml is no longer reachable on its own *.run.app URL. This load
balancer is the only public entry point once it's live.

What this script does NOT do:
  - Add the DNS record. It prints the reserved IP; you point DOMAIN's A
    record at it wherever that zone is managed.
  - Add the CVE-2025-55182 cve-canary Cloud Armor rule. That's printed as a
    separate command at the end, with --preview, per Google's own guidance
    to test in preview mode before enforcing. Review and apply it
    deliberately, don't script it into an idempotent re-run.
  - Wait for the managed cert to provision. It stays PROVISIONING until the
    DNS record resolves to this IP.

.PARAMETER DryRun
Print what would happen without calling gcloud to change anything.

.PARAMETER Help
Show this help text.

.EXAMPLE
.\Scripts\setup-load-balancer.ps1

.EXAMPLE
.\Scripts\setup-load-balancer.ps1 -DryRun
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
  .\Scripts\setup-load-balancer.ps1
  .\Scripts\setup-load-balancer.ps1 -DryRun

Environment overrides:
  PROJECT_ID=voltservice-web
  SERVICE=voltservice-web
  REGION=europe-west1
  DOMAIN=voltservice.metalbrain.net
  NAME_PREFIX=voltservice-web
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

  if ($DryRun) {
    Write-Host "[dry-run] gcloud $($Arguments -join ' ')"
    return
  }

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
    return $null
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

Require-Command "gcloud"
Require-Command "git"

$repoRoot = Invoke-GitOutput @("rev-parse", "--show-toplevel")
Push-Location $repoRoot

try {
  $ProjectId = Get-EnvOrDefault "PROJECT_ID" "voltservice-web"
  $Service = Get-EnvOrDefault "SERVICE" "voltservice-web"
  $Region = Get-EnvOrDefault "REGION" "europe-west1"
  $Domain = Get-EnvOrDefault "DOMAIN" "voltservice.metalbrain.net"
  $NamePrefix = Get-EnvOrDefault "NAME_PREFIX" "voltservice-web"

  $IpName = "$NamePrefix-lb-ip"
  $NegName = "$NamePrefix-neg"
  $BackendName = "$NamePrefix-backend"
  $UrlMapName = "$NamePrefix-url-map"
  $CertName = "$NamePrefix-cert"
  $HttpsProxyName = "$NamePrefix-https-proxy"
  $HttpsFrName = "$NamePrefix-https-fr"
  $HttpRedirectUrlMapName = "$NamePrefix-http-redirect"
  $HttpProxyName = "$NamePrefix-http-proxy"
  $HttpFrName = "$NamePrefix-http-fr"
  $ArmorPolicyName = "$NamePrefix-armor-policy"

  Write-Host "Project: $ProjectId"
  Write-Host "Cloud Run service: $Service ($Region)"
  Write-Host "Domain: $Domain"
  Write-Host "Resource prefix: $NamePrefix"
  Write-Host ""

  # Static IP
  if (Test-GcloudCommand @("compute", "addresses", "describe", $IpName, "--global", "--project=$ProjectId")) {
    Write-Host "Static IP exists: $IpName"
  }
  else {
    Write-Host "Reserving global static IP: $IpName"
    Invoke-Gcloud @("compute", "addresses", "create", $IpName, "--global", "--project=$ProjectId")
  }

  # Serverless NEG
  if (Test-GcloudCommand @("compute", "network-endpoint-groups", "describe", $NegName, "--region=$Region", "--project=$ProjectId")) {
    Write-Host "Serverless NEG exists: $NegName ($Region)"
  }
  else {
    Write-Host "Creating Serverless NEG: $NegName -> Cloud Run service $Service ($Region)"
    Invoke-Gcloud @(
      "compute", "network-endpoint-groups", "create", $NegName,
      "--region=$Region",
      "--network-endpoint-type=serverless",
      "--cloud-run-service=$Service",
      "--project=$ProjectId"
    )
  }

  # Backend service
  if (Test-GcloudCommand @("compute", "backend-services", "describe", $BackendName, "--global", "--project=$ProjectId")) {
    Write-Host "Backend service exists: $BackendName"
  }
  else {
    Write-Host "Creating backend service: $BackendName"
    Invoke-Gcloud @(
      "compute", "backend-services", "create", $BackendName,
      "--global",
      "--load-balancing-scheme=EXTERNAL_MANAGED",
      "--project=$ProjectId"
    )
  }

  $backendGroups = Invoke-GcloudOutput @("compute", "backend-services", "describe", $BackendName, "--global", "--project=$ProjectId", "--format=value(backends[].group)")
  if ($backendGroups -and $backendGroups.Contains($NegName)) {
    Write-Host "Backend service already has the NEG attached"
  }
  else {
    Write-Host "Attaching NEG to backend service"
    Invoke-Gcloud @(
      "compute", "backend-services", "add-backend", $BackendName,
      "--global",
      "--network-endpoint-group=$NegName",
      "--network-endpoint-group-region=$Region",
      "--project=$ProjectId"
    )
  }

  # URL map
  if (Test-GcloudCommand @("compute", "url-maps", "describe", $UrlMapName, "--global", "--project=$ProjectId")) {
    Write-Host "URL map exists: $UrlMapName"
  }
  else {
    Write-Host "Creating URL map: $UrlMapName -> $BackendName"
    Invoke-Gcloud @(
      "compute", "url-maps", "create", $UrlMapName,
      "--default-service=$BackendName",
      "--global",
      "--project=$ProjectId"
    )
  }

  # Managed SSL certificate
  if (Test-GcloudCommand @("compute", "ssl-certificates", "describe", $CertName, "--global", "--project=$ProjectId")) {
    Write-Host "Managed SSL certificate exists: $CertName"
  }
  else {
    Write-Host "Creating Google-managed SSL certificate: $CertName ($Domain)"
    Invoke-Gcloud @(
      "compute", "ssl-certificates", "create", $CertName,
      "--domains=$Domain",
      "--global",
      "--project=$ProjectId"
    )
  }

  # Target HTTPS proxy
  if (Test-GcloudCommand @("compute", "target-https-proxies", "describe", $HttpsProxyName, "--global", "--project=$ProjectId")) {
    Write-Host "Target HTTPS proxy exists: $HttpsProxyName"
  }
  else {
    Write-Host "Creating target HTTPS proxy: $HttpsProxyName"
    Invoke-Gcloud @(
      "compute", "target-https-proxies", "create", $HttpsProxyName,
      "--url-map=$UrlMapName",
      "--ssl-certificates=$CertName",
      "--global",
      "--project=$ProjectId"
    )
  }

  # HTTPS forwarding rule
  if (Test-GcloudCommand @("compute", "forwarding-rules", "describe", $HttpsFrName, "--global", "--project=$ProjectId")) {
    Write-Host "HTTPS forwarding rule exists: $HttpsFrName"
  }
  else {
    Write-Host "Creating HTTPS forwarding rule: $HttpsFrName (443)"
    Invoke-Gcloud @(
      "compute", "forwarding-rules", "create", $HttpsFrName,
      "--address=$IpName",
      "--global",
      "--target-https-proxy=$HttpsProxyName",
      "--ports=443",
      "--project=$ProjectId"
    )
  }

  # HTTP -> HTTPS redirect
  if (Test-GcloudCommand @("compute", "url-maps", "describe", $HttpRedirectUrlMapName, "--global", "--project=$ProjectId")) {
    Write-Host "HTTP->HTTPS redirect URL map exists: $HttpRedirectUrlMapName"
  }
  else {
    Write-Host "Creating HTTP->HTTPS redirect URL map: $HttpRedirectUrlMapName"
    if ($DryRun) {
      Write-Host "[dry-run] gcloud compute url-maps import $HttpRedirectUrlMapName --global --project=$ProjectId --source=<generated YAML>"
    }
    else {
      $tmpYaml = New-TemporaryFile
      @"
name: $HttpRedirectUrlMapName
defaultUrlRedirect:
  httpsRedirect: true
  redirectResponseCode: MOVED_PERMANENTLY_DEFAULT
  stripQuery: false
"@ | Set-Content -Path $tmpYaml.FullName -Encoding ASCII

      Invoke-Gcloud @(
        "compute", "url-maps", "import", $HttpRedirectUrlMapName,
        "--global",
        "--project=$ProjectId",
        "--source=$($tmpYaml.FullName)",
        "--quiet"
      )
      Remove-Item $tmpYaml.FullName -ErrorAction SilentlyContinue
    }
  }

  if (Test-GcloudCommand @("compute", "target-http-proxies", "describe", $HttpProxyName, "--global", "--project=$ProjectId")) {
    Write-Host "Target HTTP proxy exists: $HttpProxyName"
  }
  else {
    Write-Host "Creating target HTTP proxy: $HttpProxyName"
    Invoke-Gcloud @(
      "compute", "target-http-proxies", "create", $HttpProxyName,
      "--url-map=$HttpRedirectUrlMapName",
      "--global",
      "--project=$ProjectId"
    )
  }

  if (Test-GcloudCommand @("compute", "forwarding-rules", "describe", $HttpFrName, "--global", "--project=$ProjectId")) {
    Write-Host "HTTP forwarding rule exists: $HttpFrName"
  }
  else {
    Write-Host "Creating HTTP forwarding rule: $HttpFrName (80, redirects to https)"
    Invoke-Gcloud @(
      "compute", "forwarding-rules", "create", $HttpFrName,
      "--address=$IpName",
      "--global",
      "--target-http-proxy=$HttpProxyName",
      "--ports=80",
      "--project=$ProjectId"
    )
  }

  # Cloud Armor policy
  if (Test-GcloudCommand @("compute", "security-policies", "describe", $ArmorPolicyName, "--project=$ProjectId")) {
    Write-Host "Cloud Armor policy exists: $ArmorPolicyName"
  }
  else {
    Write-Host "Creating Cloud Armor policy: $ArmorPolicyName"
    Invoke-Gcloud @(
      "compute", "security-policies", "create", $ArmorPolicyName,
      "--description=WAF policy for $Service",
      "--project=$ProjectId"
    )
  }

  $backendPolicy = Invoke-GcloudOutput @("compute", "backend-services", "describe", $BackendName, "--global", "--project=$ProjectId", "--format=value(securityPolicy)")
  if ($backendPolicy -and $backendPolicy.Contains($ArmorPolicyName)) {
    Write-Host "Cloud Armor policy already attached to backend service"
  }
  else {
    Write-Host "Attaching Cloud Armor policy to backend service"
    Invoke-Gcloud @(
      "compute", "backend-services", "update", $BackendName,
      "--global",
      "--security-policy=$ArmorPolicyName",
      "--project=$ProjectId"
    )
  }

  Write-Host ""
  Write-Host "Load balancer resources ready (or would be, under -DryRun)."
  Write-Host ""
  $reservedIp = Invoke-GcloudOutput @("compute", "addresses", "describe", $IpName, "--global", "--project=$ProjectId", "--format=value(address)")
  if (-not $reservedIp) { $reservedIp = "<pending - re-run without -DryRun>" }
  Write-Host "Point $Domain's A record at: $reservedIp"
  Write-Host "The managed cert stays PROVISIONING until that DNS record resolves - check with:"
  Write-Host "  gcloud compute ssl-certificates describe $CertName --global --project=$ProjectId --format=`"value(managed.status)`""
  Write-Host ""
  Write-Host "Not run automatically - review, then apply deliberately (start with --preview):"
  Write-Host "  gcloud compute security-policies rules create 1000 \"
  Write-Host "    --security-policy $ArmorPolicyName \"
  Write-Host "    --expression `"(has(request.headers['next-action']) || has(request.headers['rsc-action-id']) || request.headers['content-type'].contains('multipart/form-data') || request.headers['content-type'].contains('application/x-www-form-urlencoded')) && evaluatePreconfiguredWaf('cve-canary',{'sensitivity': 0, 'opt_in_rule_ids': ['google-mrs-v202512-id000001-rce','google-mrs-v202512-id000002-rce']})`" \"
  Write-Host "    --action=deny-403 \"
  Write-Host "    --preview \"
  Write-Host "    --project=$ProjectId"
}
finally {
  Pop-Location
}
