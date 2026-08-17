#!/usr/bin/env bash
# Scripts/deploy-cloud-run.sh
#
# Local Google Cloud SDK deployment path for VoltService Web.
# This uses the project's current Dockerfile and cloudbuild.yaml:
#   1. Bootstrap required APIs, service accounts, IAM, and Artifact Registry.
#   2. Submit cloudbuild.yaml locally with gcloud.
#   3. Cloud Build runs the Docker tester stage, builds runtime, pushes image,
#      and deploys Cloud Run.
#
# Examples:
#   Scripts/deploy-cloud-run.sh
#   Scripts/deploy-cloud-run.sh --bootstrap-only
#   Scripts/deploy-cloud-run.sh --skip-bootstrap
#   Scripts/deploy-cloud-run.sh --impersonate-deployer
#
# Environment overrides:
#   PROJECT_ID=voltservice-web
#   REGION=europe-west1
#   SERVICE=voltservice-web
#   AR_PROJECT_PATH=voltservice-web
#   AR_REPOSITORY=voltservice
#   RUNTIME_SA=voltserviceltd-cloud-run-runti@voltservice-web.iam.gserviceaccount.com
#   BUILD_SA=voltserviceltd-cloud-run-build@voltservice-web.iam.gserviceaccount.com
#   DEPLOYER_SA=voltserviceltd-cloud-run-deplo@voltservice-web.iam.gserviceaccount.com
#   NEXT_PUBLIC_SITE_URL=https://metalbrain.net
#   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
#   MIN_INSTANCES=1
#   MAX_INSTANCES=4
#   INGRESS=internal-and-cloud-load-balancing

set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

PROJECT_ID="${PROJECT_ID:-voltservice-web}"
REGION="${REGION:-europe-west1}"
SERVICE="${SERVICE:-voltservice-web}"
AR_REPOSITORY="${AR_REPOSITORY:-voltservice}"
NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://metalbrain.net}"
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="${NEXT_PUBLIC_RECAPTCHA_SITE_KEY:-}"
MIN_INSTANCES="${MIN_INSTANCES:-1}"
MAX_INSTANCES="${MAX_INSTANCES:-4}"
# Must match org policy constraints/run.allowedIngress (allowed_ingress_policy.yaml)
# — "all" is rejected, so the service is only reachable via a Cloud Load Balancer.
INGRESS="${INGRESS:-internal-and-cloud-load-balancing}"

RUNTIME_SA_NAME="${RUNTIME_SA_NAME:-voltserviceltd-cloud-run-runti}"
BUILD_SA_NAME="${BUILD_SA_NAME:-voltserviceltd-cloud-run-build}"
DEPLOYER_SA_NAME="${DEPLOYER_SA_NAME:-voltserviceltd-cloud-run-deplo}"

RUNTIME_SA="${RUNTIME_SA:-${RUNTIME_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com}"
BUILD_SA="${BUILD_SA:-${BUILD_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com}"
DEPLOYER_SA="${DEPLOYER_SA:-${DEPLOYER_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com}"

RUNTIME_SA_NAME="${RUNTIME_SA%@*}"
BUILD_SA_NAME="${BUILD_SA%@*}"
DEPLOYER_SA_NAME="${DEPLOYER_SA%@*}"

DO_BOOTSTRAP=1
DO_DEPLOY=1
IMPERSONATE_DEPLOYER=0

for arg in "$@"; do
  case "$arg" in
    --bootstrap-only)
      DO_BOOTSTRAP=1
      DO_DEPLOY=0
      ;;
    --deploy-only | --skip-bootstrap)
      DO_BOOTSTRAP=0
      DO_DEPLOY=1
      ;;
    --impersonate-deployer)
      IMPERSONATE_DEPLOYER=1
      ;;
    --help | -h)
      sed -n '1,38p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown option: $arg" >&2
      exit 2
      ;;
  esac
done

artifact_registry_project_path() {
  printf '%s' "$1" | tr ':' '/'
}

AR_PROJECT_PATH="${AR_PROJECT_PATH:-$(artifact_registry_project_path "$PROJECT_ID")}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Required command not found: $1" >&2
    exit 1
  fi
}

current_gcloud_account() {
  gcloud config get-value account 2>/dev/null | tr -d '\r'
}

ensure_service_account() {
  local name="$1"
  local email="$2"
  local display_name="$3"

  if gcloud iam service-accounts describe "$email" --project="$PROJECT_ID" >/dev/null 2>&1; then
    echo "Service account exists: $email"
    return
  fi

  echo "Creating service account: $email"
  gcloud iam service-accounts create "$name" \
    --display-name="$display_name" \
    --project="$PROJECT_ID" \
    --quiet
}

bind_project_role() {
  local member="$1"
  local role="$2"

  echo "Ensuring project role: $member -> $role"
  # --condition=None: required non-interactively once a policy has any
  # conditional bindings, else gcloud refuses to add an unconditional one.
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="$member" \
    --role="$role" \
    --condition=None \
    --quiet >/dev/null
}

bind_service_account_role() {
  local service_account="$1"
  local member="$2"
  local role="$3"

  echo "Ensuring service account role: $member -> $role on $service_account"
  gcloud iam service-accounts add-iam-policy-binding "$service_account" \
    --member="$member" \
    --role="$role" \
    --project="$PROJECT_ID" \
    --condition=None \
    --quiet >/dev/null
}

ensure_artifact_repository() {
  if gcloud artifacts repositories describe "$AR_REPOSITORY" \
    --location="$REGION" \
    --project="$PROJECT_ID" >/dev/null 2>&1; then
    echo "Artifact Registry repository exists: $AR_REPOSITORY ($REGION)"
    return
  fi

  echo "Creating Artifact Registry repository: $AR_REPOSITORY ($REGION)"
  gcloud artifacts repositories create "$AR_REPOSITORY" \
    --repository-format=docker \
    --location="$REGION" \
    --description="VoltService Web container images" \
    --project="$PROJECT_ID" \
    --quiet
}

bootstrap_cloud() {
  local deployer_user="$1"

  echo "Enabling Google Cloud APIs"
  gcloud services enable \
    run.googleapis.com \
    cloudbuild.googleapis.com \
    artifactregistry.googleapis.com \
    iam.googleapis.com \
    serviceusage.googleapis.com \
    --project="$PROJECT_ID" \
    --quiet

  ensure_service_account "$RUNTIME_SA_NAME" "$RUNTIME_SA" "Cloud Run Runtime"
  ensure_service_account "$BUILD_SA_NAME" "$BUILD_SA" "Cloud Run Source Builder"
  ensure_service_account "$DEPLOYER_SA_NAME" "$DEPLOYER_SA" "Cloud Run Deployer"
  ensure_artifact_repository

  bind_project_role "user:${deployer_user}" "roles/serviceusage.serviceUsageConsumer"
  bind_project_role "user:${deployer_user}" "roles/cloudbuild.builds.editor"
  bind_project_role "user:${deployer_user}" "roles/run.sourceDeveloper"

  bind_project_role "serviceAccount:${BUILD_SA}" "roles/run.builder"
  bind_project_role "serviceAccount:${BUILD_SA}" "roles/run.developer"
  bind_project_role "serviceAccount:${BUILD_SA}" "roles/cloudbuild.builds.builder"
  bind_project_role "serviceAccount:${BUILD_SA}" "roles/developerconnect.readTokenAccessor"
  bind_project_role "serviceAccount:${BUILD_SA}" "roles/artifactregistry.writer"
  bind_project_role "serviceAccount:${BUILD_SA}" "roles/logging.logWriter"

  bind_project_role "serviceAccount:${DEPLOYER_SA}" "roles/serviceusage.serviceUsageConsumer"
  bind_project_role "serviceAccount:${DEPLOYER_SA}" "roles/cloudbuild.builds.editor"
  bind_project_role "serviceAccount:${DEPLOYER_SA}" "roles/run.sourceDeveloper"

  bind_service_account_role "$RUNTIME_SA" "user:${deployer_user}" "roles/iam.serviceAccountUser"
  bind_service_account_role "$BUILD_SA" "user:${deployer_user}" "roles/iam.serviceAccountUser"

  bind_service_account_role "$RUNTIME_SA" "serviceAccount:${BUILD_SA}" "roles/iam.serviceAccountUser"
  bind_service_account_role "$BUILD_SA" "serviceAccount:${DEPLOYER_SA}" "roles/iam.serviceAccountUser"
  bind_service_account_role "$DEPLOYER_SA" "user:${deployer_user}" "roles/iam.serviceAccountTokenCreator"

  # A GitHub-connected Cloud Build trigger runs builds via Cloud Build's own
  # service agent, not the interactive deployer — so the agent itself needs
  # permission to act as BUILD_SA, or webhook-triggered builds fail with a
  # permission error even though manual `gcloud builds submit` runs work fine.
  bind_service_account_role "$BUILD_SA" \
    "serviceAccount:service-${PROJECT_NUMBER}@gcp-sa-cloudbuild.iam.gserviceaccount.com" \
    "roles/iam.serviceAccountUser"
}

deploy_cloud_run() {
  local commit_sha
  commit_sha="${COMMIT_SHA:-$(git rev-parse --short=12 HEAD 2>/dev/null || date +%Y%m%d%H%M%S)}"

  local substitutions
  substitutions="COMMIT_SHA=${commit_sha},_REGION=${REGION},_SERVICE=${SERVICE},_AR_PROJECT_PATH=${AR_PROJECT_PATH},_AR_REPOSITORY=${AR_REPOSITORY},_RUNTIME_SERVICE_ACCOUNT=${RUNTIME_SA},_NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL},_NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY},_MIN_INSTANCES=${MIN_INSTANCES},_MAX_INSTANCES=${MAX_INSTANCES},_INGRESS=${INGRESS}"

  local build_service_account
  build_service_account="projects/${PROJECT_ID}/serviceAccounts/${BUILD_SA}"

  local args=(
    builds submit
    .
    --project="$PROJECT_ID"
    --config=cloudbuild.yaml
    --service-account="$build_service_account"
    --substitutions="$substitutions"
  )

  if [[ "$IMPERSONATE_DEPLOYER" == "1" ]]; then
    args+=(--impersonate-service-account="$DEPLOYER_SA")
  fi

  echo "Submitting Cloud Build for ${SERVICE} (${commit_sha})"
  gcloud "${args[@]}"
}

require_command gcloud
require_command git

DEPLOYER_USER="$(current_gcloud_account)"
if [[ -z "$DEPLOYER_USER" || "$DEPLOYER_USER" == "(unset)" ]]; then
  echo "No active gcloud account. Run: gcloud auth login" >&2
  exit 1
fi

PROJECT_NUMBER="$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')"

echo "Project: $PROJECT_ID ($PROJECT_NUMBER)"
echo "Region: $REGION"
echo "Service: $SERVICE"
echo "Artifact Registry project path: $AR_PROJECT_PATH"
echo "Artifact Registry repository: $AR_REPOSITORY"
echo "Instance bounds: min=$MIN_INSTANCES max=$MAX_INSTANCES"
echo "Ingress: $INGRESS"
echo "Runtime service account: $RUNTIME_SA"
echo "Build service account: $BUILD_SA"
echo "Deployer service account: $DEPLOYER_SA"
echo "Active gcloud user: $DEPLOYER_USER"

if [[ "$DO_BOOTSTRAP" == "1" ]]; then
  bootstrap_cloud "$DEPLOYER_USER"
fi

if [[ "$DO_DEPLOY" == "1" ]]; then
  deploy_cloud_run
fi
