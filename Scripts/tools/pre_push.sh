#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"

# --- Cleanup Scripts ---------------------------------------------------------------
# Single top-level cleanup shared by EXIT/INT/TERM. Temp state is tracked in
# variables initialized to empty/zero so cleanup is safe no matter how early
# the script dies.
TMP_DIR=""
pushed_root=0

cleanup() {
  local status=$?
  case "${1:-}" in
    INT) status=130 ;;
    TERM) status=143 ;;
  esac
  trap - EXIT INT TERM
  if [[ -n "$TMP_DIR" && -d "$TMP_DIR" ]]; then
    rm -rf "$TMP_DIR"
  fi
  if [[ "$pushed_root" -eq 1 ]]; then
    popd >/dev/null 2>&1 || true
  fi
  exit "$status"
}
trap cleanup EXIT
trap 'cleanup INT' INT
trap 'cleanup TERM' TERM

pushd "$ROOT" >/dev/null
pushed_root=1

run() {
  echo ""
  echo "▶ $*"
  "$@"
}

# --- Docker availability ----------------------------------------------------
# 0 = Docker healthy, 1 = CLI not installed, 2 = CLI present but the daemon
# (Docker Desktop) is not reachable. `command -v docker` alone is not enough:
# the CLI can exist while Docker Desktop is stopped.
docker_status() {
  if ! command -v docker >/dev/null 2>&1; then
    return 1
  fi
  if ! docker info >/dev/null 2>&1; then
    return 2
  fi
  return 0
}

# 1) Verify package-lock.json is actually in sync with package.json, the
# same check `npm ci` runs in CI. Done in a scratch dir so it never touches
# the working tree's node_modules. --ignore-scripts because lifecycle scripts
# may depend on project sources that are intentionally not copied here; the
# full-project build below still validates the complete application.
echo "🔄 Verifying package-lock.json matches CI's 'npm ci'..."
TMP_DIR="$(mktemp -d)"
cp package.json package-lock.json "$TMP_DIR"/

if ! (cd "$TMP_DIR" && npm ci --ignore-scripts --no-audit --no-fund --loglevel=error) >"$TMP_DIR/npm-ci.log" 2>&1; then
  echo "❌ npm ci failed — package-lock.json is out of sync with package.json."
  echo "   Run 'npm install' locally, then commit the updated package-lock.json."
  tail -n 40 "$TMP_DIR/npm-ci.log"
  exit 1
fi

# CI runs on Linux (ubuntu-latest); a lockfile can pass npm ci on macOS/Windows
# while still failing on Linux (e.g. platform-specific optional-dependency
# resolution). If Docker is healthy, re-run the same check in the exact CI
# image for full parity. Otherwise skip gracefully — unless
# REQUIRE_DOCKER_CI_CHECK=1, which makes Docker mandatory.
docker_parity_ran=0
docker_state=0
docker_status || docker_state=$?

if [[ "$docker_state" -eq 0 ]]; then
  echo "🐳 Re-verifying npm ci under Linux/Node 22 (matches GitHub Actions runner)..."
  # Docker Desktop's volume mount needs a real Windows path for the host
  # side on Git Bash for Windows — the raw MSYS "/tmp/..." path mounts as
  # empty. `cygpath -w` gives Docker the path it can actually resolve;
  # elsewhere (Linux/macOS, plain Linux CI) cygpath doesn't exist and
  # TMP_DIR is already a real path, so it's used as-is.
  if command -v cygpath >/dev/null 2>&1; then
    DOCKER_MOUNT_SRC="$(cygpath -w "$TMP_DIR")"
  else
    DOCKER_MOUNT_SRC="$TMP_DIR"
  fi
  # The echoed marker tells us the container actually started; without it, a
  # `docker run` failure is a Docker problem, not an npm problem.
  # "//work" (doubled leading slash): on Git Bash for Windows, MSYS rewrites
  # bare leading-slash args like "/work" into a Windows path (e.g. "C:/Program
  # Files/Git/work") before Docker ever sees them. A doubled slash is left
  # alone by MSYS's path conversion but is still just "/work" to Linux/Docker,
  # so this is a no-op everywhere except Git Bash, where it's required.
  if docker run --rm -v "${DOCKER_MOUNT_SRC}"://work -w //work node:22 \
    sh -c 'echo "__DOCKER_CONTAINER_STARTED__"; npm ci --ignore-scripts --no-audit --no-fund --loglevel=error' \
    >"$TMP_DIR/npm-ci-linux.log" 2>&1; then
    docker_parity_ran=1
  else
    echo "❌ Linux/Node 22 verification failed after Docker became available."
    if grep -q "__DOCKER_CONTAINER_STARTED__" "$TMP_DIR/npm-ci-linux.log"; then
      if grep -qE 'ERESOLVE|ELOCKVERIFY|Missing:|Invalid:|npm ERR! code' "$TMP_DIR/npm-ci-linux.log"; then
        echo "   package-lock.json may be incompatible with Linux/Node 22."
        echo "   Run npm install, review package-lock.json, and commit the result."
      fi
    else
      echo "   The container never started — this looks like a Docker image,"
      echo "   volume mount, daemon, or container launch failure, not an npm failure."
    fi
    tail -n 40 "$TMP_DIR/npm-ci-linux.log"
    exit 1
  fi
else
  if [[ "$docker_state" -eq 1 ]]; then
    echo "⚠️  Docker is not installed."
    echo "   Linux/Node 22 parity verification will be skipped."
    echo "   Install Docker Desktop to run the same environment used by CI."
  else
    echo "⚠️  Docker Desktop is not running, or Docker's daemon/socket is unavailable."
    echo "   Linux/Node 22 parity verification will be skipped."
    echo "   Start Docker Desktop to run the same environment used by CI."
  fi
  if [[ "${REQUIRE_DOCKER_CI_CHECK:-0}" == "1" ]]; then
    echo "❌ REQUIRE_DOCKER_CI_CHECK=1 is set, so Docker is required for this push."
    if [[ "$docker_state" -eq 1 ]]; then
      echo "   Install Docker Desktop, then push again."
    else
      echo "   Start Docker Desktop, then push again."
    fi
    exit 1
  fi
fi

# 2) Lint (full project, same as CI).
echo "🔍 Linting..."
run npm run lint

# 3) Build (same as CI's quality gate).
echo "🏗️  Building..."
run npm run build

# 4) Tests (same as CI's quality gate).
if node -e "process.exit(require('./package.json').scripts?.test ? 0 : 1)" 2>/dev/null; then
  echo "🧪 Running tests..."
  run npm test
else
  echo "ℹ️  No test script defined; skipping tests."
fi

echo ""
if [[ "$docker_parity_ran" -eq 1 ]]; then
  echo "✅ Pre-push checks passed, including Linux/Node 22 parity."
else
  echo "✅ Pre-push checks passed."
  echo "⚠️  Linux/Node 22 parity was not checked because Docker was unavailable."
fi
