#!/usr/bin/env bash
# Scripts/setup-load-balancer.sh
#
# Creates (idempotently) the Global external HTTPS Load Balancer that fronts
# the europe-west1 voltservice-web Cloud Run service: reserved static IP,
# Serverless NEG, backend service, URL map, Google-managed SSL cert for the
# custom domain, HTTPS forwarding rule, an HTTP->HTTPS redirect, and a Cloud
# Armor security policy attached to the backend.
#
# This exists because org policy constraints/run.allowedIngress (see
# allowed_ingress_policy.yaml) only permits "internal" and
# "internal-and-cloud-load-balancing" — the Cloud Run service deployed by
# cloudbuild.yaml is no longer reachable on its own *.run.app URL. This load
# balancer is the only public entry point once it's live.
#
# What this script does NOT do:
#   - Add the DNS record. It prints the reserved IP; you point
#     DOMAIN's A record at it wherever that zone is managed.
#   - Add the CVE-2025-55182 cve-canary Cloud Armor rule. That's printed as a
#     separate command at the end, with --preview, per Google's own guidance
#     to test in preview mode before enforcing (see the sources in the PR/chat
#     history for this). Review and apply it deliberately, don't script it
#     into an idempotent re-run.
#   - Wait for the managed cert to provision. It stays PROVISIONING until the
#     DNS record resolves to this IP; check with:
#       gcloud compute ssl-certificates describe <CERT_NAME> --global --format="value(managed.status)"
#
# Examples:
#   Scripts/setup-load-balancer.sh
#   Scripts/setup-load-balancer.sh --dry-run
#   DOMAIN=voltservice.metalbrain.net Scripts/setup-load-balancer.sh
#
# Environment overrides:
#   PROJECT_ID=voltservice-web
#   SERVICE=voltservice-web
#   REGION=europe-west1          # must match the Cloud Run service's region
#   DOMAIN=voltservice.metalbrain.net
#   NAME_PREFIX=voltservice-web  # base name for every LB resource created

set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

PROJECT_ID="${PROJECT_ID:-voltservice-web}"
SERVICE="${SERVICE:-voltservice-web}"
REGION="${REGION:-europe-west1}"
DOMAIN="${DOMAIN:-voltservice.metalbrain.net}"
NAME_PREFIX="${NAME_PREFIX:-voltservice-web}"

IP_NAME="${NAME_PREFIX}-lb-ip"
NEG_NAME="${NAME_PREFIX}-neg"
BACKEND_NAME="${NAME_PREFIX}-backend"
URLMAP_NAME="${NAME_PREFIX}-url-map"
CERT_NAME="${NAME_PREFIX}-cert"
HTTPS_PROXY_NAME="${NAME_PREFIX}-https-proxy"
HTTPS_FR_NAME="${NAME_PREFIX}-https-fr"
HTTP_REDIRECT_URLMAP_NAME="${NAME_PREFIX}-http-redirect"
HTTP_PROXY_NAME="${NAME_PREFIX}-http-proxy"
HTTP_FR_NAME="${NAME_PREFIX}-http-fr"
ARMOR_POLICY_NAME="${NAME_PREFIX}-armor-policy"

DRY_RUN=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --help | -h)
      sed -n '1,33p' "$0"
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

run_or_echo() {
  if [[ "$DRY_RUN" == "1" ]]; then
    echo "[dry-run] $*"
    return 0
  fi
  "$@"
}

ensure_static_ip() {
  if gcloud compute addresses describe "$IP_NAME" --global --project="$PROJECT_ID" >/dev/null 2>&1; then
    echo "Static IP exists: $IP_NAME"
    return
  fi
  echo "Reserving global static IP: $IP_NAME"
  run_or_echo gcloud compute addresses create "$IP_NAME" \
    --global \
    --project="$PROJECT_ID"
}

ensure_serverless_neg() {
  if gcloud compute network-endpoint-groups describe "$NEG_NAME" \
    --region="$REGION" --project="$PROJECT_ID" >/dev/null 2>&1; then
    echo "Serverless NEG exists: $NEG_NAME ($REGION)"
    return
  fi
  echo "Creating Serverless NEG: $NEG_NAME -> Cloud Run service $SERVICE ($REGION)"
  run_or_echo gcloud compute network-endpoint-groups create "$NEG_NAME" \
    --region="$REGION" \
    --network-endpoint-type=serverless \
    --cloud-run-service="$SERVICE" \
    --project="$PROJECT_ID"
}

ensure_backend_service() {
  if gcloud compute backend-services describe "$BACKEND_NAME" --global --project="$PROJECT_ID" >/dev/null 2>&1; then
    echo "Backend service exists: $BACKEND_NAME"
  else
    echo "Creating backend service: $BACKEND_NAME"
    run_or_echo gcloud compute backend-services create "$BACKEND_NAME" \
      --global \
      --load-balancing-scheme=EXTERNAL_MANAGED \
      --project="$PROJECT_ID"
  fi

  if gcloud compute backend-services describe "$BACKEND_NAME" --global --project="$PROJECT_ID" \
    --format="value(backends[].group)" 2>/dev/null | grep -q "$NEG_NAME"; then
    echo "Backend service already has the NEG attached"
    return
  fi
  echo "Attaching NEG to backend service"
  run_or_echo gcloud compute backend-services add-backend "$BACKEND_NAME" \
    --global \
    --network-endpoint-group="$NEG_NAME" \
    --network-endpoint-group-region="$REGION" \
    --project="$PROJECT_ID"
}

ensure_url_map() {
  if gcloud compute url-maps describe "$URLMAP_NAME" --global --project="$PROJECT_ID" >/dev/null 2>&1; then
    echo "URL map exists: $URLMAP_NAME"
    return
  fi
  echo "Creating URL map: $URLMAP_NAME -> $BACKEND_NAME"
  run_or_echo gcloud compute url-maps create "$URLMAP_NAME" \
    --default-service="$BACKEND_NAME" \
    --global \
    --project="$PROJECT_ID"
}

ensure_ssl_cert() {
  if gcloud compute ssl-certificates describe "$CERT_NAME" --global --project="$PROJECT_ID" >/dev/null 2>&1; then
    echo "Managed SSL certificate exists: $CERT_NAME"
    return
  fi
  echo "Creating Google-managed SSL certificate: $CERT_NAME ($DOMAIN)"
  run_or_echo gcloud compute ssl-certificates create "$CERT_NAME" \
    --domains="$DOMAIN" \
    --global \
    --project="$PROJECT_ID"
}

ensure_https_proxy() {
  if gcloud compute target-https-proxies describe "$HTTPS_PROXY_NAME" --global --project="$PROJECT_ID" >/dev/null 2>&1; then
    echo "Target HTTPS proxy exists: $HTTPS_PROXY_NAME"
    return
  fi
  echo "Creating target HTTPS proxy: $HTTPS_PROXY_NAME"
  run_or_echo gcloud compute target-https-proxies create "$HTTPS_PROXY_NAME" \
    --url-map="$URLMAP_NAME" \
    --ssl-certificates="$CERT_NAME" \
    --global \
    --project="$PROJECT_ID"
}

ensure_https_forwarding_rule() {
  if gcloud compute forwarding-rules describe "$HTTPS_FR_NAME" --global --project="$PROJECT_ID" >/dev/null 2>&1; then
    echo "HTTPS forwarding rule exists: $HTTPS_FR_NAME"
    return
  fi
  echo "Creating HTTPS forwarding rule: $HTTPS_FR_NAME (443)"
  run_or_echo gcloud compute forwarding-rules create "$HTTPS_FR_NAME" \
    --address="$IP_NAME" \
    --global \
    --target-https-proxy="$HTTPS_PROXY_NAME" \
    --ports=443 \
    --project="$PROJECT_ID"
}

ensure_http_redirect() {
  if ! gcloud compute url-maps describe "$HTTP_REDIRECT_URLMAP_NAME" --global --project="$PROJECT_ID" >/dev/null 2>&1; then
    echo "Creating HTTP->HTTPS redirect URL map: $HTTP_REDIRECT_URLMAP_NAME"
    if [[ "$DRY_RUN" == "1" ]]; then
      echo "[dry-run] gcloud compute url-maps import $HTTP_REDIRECT_URLMAP_NAME --global --project=$PROJECT_ID --source=<generated YAML>"
    else
      local tmp_yaml
      tmp_yaml="$(mktemp)"
      cat >"$tmp_yaml" <<EOF
name: ${HTTP_REDIRECT_URLMAP_NAME}
defaultUrlRedirect:
  httpsRedirect: true
  redirectResponseCode: MOVED_PERMANENTLY_DEFAULT
  stripQuery: false
EOF
      gcloud compute url-maps import "$HTTP_REDIRECT_URLMAP_NAME" \
        --global \
        --project="$PROJECT_ID" \
        --source="$tmp_yaml" \
        --quiet
      rm -f "$tmp_yaml"
    fi
  else
    echo "HTTP->HTTPS redirect URL map exists: $HTTP_REDIRECT_URLMAP_NAME"
  fi

  if gcloud compute target-http-proxies describe "$HTTP_PROXY_NAME" --global --project="$PROJECT_ID" >/dev/null 2>&1; then
    echo "Target HTTP proxy exists: $HTTP_PROXY_NAME"
  else
    echo "Creating target HTTP proxy: $HTTP_PROXY_NAME"
    run_or_echo gcloud compute target-http-proxies create "$HTTP_PROXY_NAME" \
      --url-map="$HTTP_REDIRECT_URLMAP_NAME" \
      --global \
      --project="$PROJECT_ID"
  fi

  if gcloud compute forwarding-rules describe "$HTTP_FR_NAME" --global --project="$PROJECT_ID" >/dev/null 2>&1; then
    echo "HTTP forwarding rule exists: $HTTP_FR_NAME"
    return
  fi
  echo "Creating HTTP forwarding rule: $HTTP_FR_NAME (80, redirects to https)"
  run_or_echo gcloud compute forwarding-rules create "$HTTP_FR_NAME" \
    --address="$IP_NAME" \
    --global \
    --target-http-proxy="$HTTP_PROXY_NAME" \
    --ports=80 \
    --project="$PROJECT_ID"
}

ensure_cloud_armor_policy() {
  if gcloud compute security-policies describe "$ARMOR_POLICY_NAME" --project="$PROJECT_ID" >/dev/null 2>&1; then
    echo "Cloud Armor policy exists: $ARMOR_POLICY_NAME"
  else
    echo "Creating Cloud Armor policy: $ARMOR_POLICY_NAME"
    run_or_echo gcloud compute security-policies create "$ARMOR_POLICY_NAME" \
      --description="WAF policy for ${SERVICE}" \
      --project="$PROJECT_ID"
  fi

  if gcloud compute backend-services describe "$BACKEND_NAME" --global --project="$PROJECT_ID" \
    --format="value(securityPolicy)" 2>/dev/null | grep -q "$ARMOR_POLICY_NAME"; then
    echo "Cloud Armor policy already attached to backend service"
    return
  fi
  echo "Attaching Cloud Armor policy to backend service"
  run_or_echo gcloud compute backend-services update "$BACKEND_NAME" \
    --global \
    --security-policy="$ARMOR_POLICY_NAME" \
    --project="$PROJECT_ID"
}

echo "Project: $PROJECT_ID"
echo "Cloud Run service: $SERVICE ($REGION)"
echo "Domain: $DOMAIN"
echo "Resource prefix: $NAME_PREFIX"
echo ""

ensure_static_ip
ensure_serverless_neg
ensure_backend_service
ensure_url_map
ensure_ssl_cert
ensure_https_proxy
ensure_https_forwarding_rule
ensure_http_redirect
ensure_cloud_armor_policy

echo ""
echo "Load balancer resources ready (or would be, under --dry-run)."
echo ""
RESERVED_IP="$(gcloud compute addresses describe "$IP_NAME" --global --project="$PROJECT_ID" --format='value(address)' 2>/dev/null || echo '<pending — re-run without --dry-run>')"
echo "Point ${DOMAIN}'s A record at: ${RESERVED_IP}"
echo "The managed cert stays PROVISIONING until that DNS record resolves — check with:"
echo "  gcloud compute ssl-certificates describe ${CERT_NAME} --global --project=${PROJECT_ID} --format='value(managed.status)'"
echo ""
echo "Not run automatically — review, then apply deliberately (start with --preview):"
echo "  gcloud compute security-policies rules create 1000 \\"
echo "    --security-policy ${ARMOR_POLICY_NAME} \\"
echo "    --expression \"(has(request.headers['next-action']) || has(request.headers['rsc-action-id']) || request.headers['content-type'].contains('multipart/form-data') || request.headers['content-type'].contains('application/x-www-form-urlencoded')) && evaluatePreconfiguredWaf('cve-canary',{'sensitivity': 0, 'opt_in_rule_ids': ['google-mrs-v202512-id000001-rce','google-mrs-v202512-id000002-rce']})\" \\"
echo "    --action=deny-403 \\"
echo "    --preview \\"
echo "    --project=${PROJECT_ID}"
