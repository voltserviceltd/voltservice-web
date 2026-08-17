#!/usr/bin/env bash
# Scripts/create-cloud-build-trigger.sh
#
# Creates or repairs the Cloud Build trigger that gives this repo continuous
# deployment: a push to the tracked branch runs cloudbuild.yaml, which
# builds, tests, and deploys voltservice-web to Cloud Run with the
# --min-instances/--max-instances bounds set there.
#
# Runs the trigger under BUILD_SERVICE_ACCOUNT rather than Cloud Build's
# default service account — the default account does not have the
# run.builder / artifactregistry.writer / iam.serviceAccountUser bindings
# that Scripts/deploy-cloud-run.sh's bootstrap step grants specifically to
# BUILD_SERVICE_ACCOUNT, so builds under the default account fail with a
# permission error on the deploy step.
#
# Prerequisite: the GitHub repo must already be connected to Cloud Build via
# the 2nd-gen GitHub App connector (Cloud Console → Cloud Build → Repositories
# → Connect repository). That step is interactive OAuth and cannot be
# scripted — this script only creates/updates the trigger against an
# existing connection + repository resource.
#
# If a trigger already exists under a DIFFERENT name (for example, one
# auto-created by the Cloud Run console's "Continuously deploy" wizard),
# this script will not find it — list existing triggers/connections first:
#   gcloud builds triggers list --region=europe-west1 --project=voltservice-web
#   gcloud builds connections list --region=europe-west1 --project=voltservice-web
# then either pass TRIGGER_NAME=<that name> here to repair it in place, or
# delete the misconfigured one and let this script create a clean one.
#
# CONNECTION_NAME has no default: 2nd-gen GitHub connections are regional
# resources, so the europe-west2 connection from the earlier region cannot
# be reused here — a new connection must exist in europe-west1 first (Cloud
# Console → Cloud Build → Repositories → Manage connections → Create host
# connection, region europe-west1; or gcloud builds connections create
# github, which can reuse an already-installed GitHub App without redoing
# the OAuth flow).
#
# Examples:
#   CONNECTION_NAME=<europe-west1-connection> Scripts/create-cloud-build-trigger.sh
#   Scripts/create-cloud-build-trigger.sh --dry-run
#   TRIGGER_NAME=<existing-name> Scripts/create-cloud-build-trigger.sh
#
# Environment overrides:
#   PROJECT_ID=voltservice-web
#   REGION=europe-west1
#   REPO_OWNER=voltserviceltd
#   REPO_NAME=voltservice-web
#   CONNECTION_NAME=            # required — name of the europe-west1 GitHub connection
#   BUILD_SERVICE_ACCOUNT=voltserviceltd-cloud-run-build@voltservice-web.iam.gserviceaccount.com
#   TRIGGER_NAME=voltservice-web-main
#   BRANCH_PATTERN=^main$
#   BUILD_CONFIG=cloudbuild.yaml

set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

PROJECT_ID="${PROJECT_ID:-voltservice-web}"
REGION="${REGION:-europe-west1}"
REPO_OWNER="${REPO_OWNER:-voltserviceltd}"
REPO_NAME="${REPO_NAME:-voltservice-web}"
CONNECTION_NAME="${CONNECTION_NAME:-}"
BUILD_SERVICE_ACCOUNT="${BUILD_SERVICE_ACCOUNT:-voltserviceltd-cloud-run-build@${PROJECT_ID}.iam.gserviceaccount.com}"
TRIGGER_NAME="${TRIGGER_NAME:-${REPO_NAME}-main}"
BRANCH_PATTERN="${BRANCH_PATTERN:-^main$}"
BUILD_CONFIG="${BUILD_CONFIG:-cloudbuild.yaml}"

DRY_RUN=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --help | -h)
      sed -n '1,41p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown option: $arg" >&2
      exit 2
      ;;
  esac
done

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Required command not found: $1" >&2
    exit 1
  fi
}

require_command gcloud
require_command git

if [[ -z "$CONNECTION_NAME" ]]; then
  echo "CONNECTION_NAME is required — set it to the name of the existing" >&2
  echo "Cloud Build GitHub connection (Cloud Console → Cloud Build →" >&2
  echo "Repositories) that this repo was connected through." >&2
  exit 1
fi

REPOSITORY_RESOURCE="projects/${PROJECT_ID}/locations/${REGION}/connections/${CONNECTION_NAME}/repositories/${REPO_NAME}"
BUILD_SA_RESOURCE="projects/${PROJECT_ID}/serviceAccounts/${BUILD_SERVICE_ACCOUNT}"

echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo "Repository resource: $REPOSITORY_RESOURCE"
echo "Trigger name: $TRIGGER_NAME"
echo "Trigger service account: $BUILD_SERVICE_ACCOUNT"
echo "Branch pattern: $BRANCH_PATTERN"
echo "Build config: $BUILD_CONFIG"

if ! gcloud builds repositories describe "$REPO_NAME" \
  --connection="$CONNECTION_NAME" \
  --region="$REGION" \
  --project="$PROJECT_ID" >/dev/null 2>&1; then
  echo "Repository resource not found: $REPOSITORY_RESOURCE" >&2
  echo "Connect ${REPO_OWNER}/${REPO_NAME} under connection '${CONNECTION_NAME}' first" >&2
  echo "(Cloud Console → Cloud Build → Repositories → Link repository)." >&2
  exit 1
fi

if [[ "$DRY_RUN" == "1" ]]; then
  action="create"
  if gcloud builds triggers describe "$TRIGGER_NAME" --region="$REGION" --project="$PROJECT_ID" >/dev/null 2>&1; then
    action="update"
  fi
  echo "[dry-run] Would $action trigger '$TRIGGER_NAME' with service account '$BUILD_SERVICE_ACCOUNT'."
  exit 0
fi

if gcloud builds triggers describe "$TRIGGER_NAME" \
  --region="$REGION" \
  --project="$PROJECT_ID" >/dev/null 2>&1; then
  echo "Trigger already exists: $TRIGGER_NAME — updating it in place (service account, branch pattern, build config)."
  gcloud builds triggers update github "$TRIGGER_NAME" \
    --repository="$REPOSITORY_RESOURCE" \
    --branch-pattern="$BRANCH_PATTERN" \
    --build-config="$BUILD_CONFIG" \
    --service-account="$BUILD_SA_RESOURCE" \
    --region="$REGION" \
    --project="$PROJECT_ID"
  exit 0
fi

echo "Creating trigger: $TRIGGER_NAME"
gcloud builds triggers create github \
  --name="$TRIGGER_NAME" \
  --repository="$REPOSITORY_RESOURCE" \
  --branch-pattern="$BRANCH_PATTERN" \
  --build-config="$BUILD_CONFIG" \
  --service-account="$BUILD_SA_RESOURCE" \
  --region="$REGION" \
  --project="$PROJECT_ID"
