#!/usr/bin/env bash
# Scripts/docker-runtime.sh
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

# See docker-test.sh — env.ts requires NEXT_PUBLIC_SITE_URL at build time.
if [[ -f .env.local ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.local
  set +a
fi

docker build --target runtime -t voltservice-web:local \
  --build-arg "NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL:-http://localhost:3000}" \
  --build-arg "NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY:-}" \
  .
