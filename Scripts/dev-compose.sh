#!/usr/bin/env bash
# Scripts/dev-compose.sh — single command to build and run the site locally
# via Docker Compose, matching the production Cloud Run image (see
# doc/nextjs-migration-plan.md). Compose only auto-loads a plain ".env" file;
# this project's convention is ".env.local", so it's passed explicitly.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"
docker compose --env-file .env.local up --build
