#!/usr/bin/env bash
# Scripts/docker-test.sh
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

# env.ts requires NEXT_PUBLIC_SITE_URL at build time, so this must be passed
# as a build-arg — unlike a bare `docker build`, load .env.local for local
# convenience (falls back to a placeholder if .env.local doesn't exist).
if [[ -f .env.local ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.local
  set +a
fi

docker build --target tester -t voltservice-web:test \
  --build-arg "NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL:-http://localhost:3000}" \
  --build-arg "NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY:-}" \
  .
