#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"

# --- Cleanup Scripts ---------------------------------------------------------------
# Single top-level cleanup shared by EXIT/INT/TERM. Temp state is tracked in
# variables initialized to empty/zero so cleanup is safe no matter how early
# the script dies.
old_package=""
new_package=""
pushed_root=0

cleanup() {
  local status=$?
  case "${1:-}" in
    INT) status=130 ;;
    TERM) status=143 ;;
  esac
  trap - EXIT INT TERM
  if [[ -n "$old_package" ]]; then
    rm -f "$old_package"
  fi
  if [[ -n "$new_package" ]]; then
    rm -f "$new_package"
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

# 1) Auto-fix staged JS/TS files, re-stage them, then lint + typecheck.
staged_js_files=()
while IFS= read -r file; do
  staged_js_files+=("$file")
done < <(
  git diff --cached --name-only --diff-filter=ACMR \
    | grep -E '\.(ts|tsx|js|jsx|mjs|cjs)$' || true
)

if [[ "${#staged_js_files[@]}" -eq 0 ]]; then
  echo "No staged JS/TS files; skipping lint/typecheck."
else
  echo "🔍 Linting staged files (auto-fix)..."
  run npx eslint --fix "${staged_js_files[@]}"
  git add "${staged_js_files[@]}"

  echo "🔍 Type-checking project..."
  run npx tsc --noEmit
fi

# 2) Guard against dependency metadata edits without a lock file update
# (this is exactly what caused the last broken CI run). Script-only package.json
# edits do not need package-lock.json churn.
staged_files="$(git diff --cached --name-only --diff-filter=ACMR)"
if grep -qx "package.json" <<<"$staged_files" && ! grep -qx "package-lock.json" <<<"$staged_files"; then
  old_package="$(mktemp)"
  new_package="$(mktemp)"

  git show HEAD:package.json >"$old_package"
  git show :package.json >"$new_package"

  if node -e '
const fs = require("fs");
const before = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
const after = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const lockRelevantKeys = [
  "name",
  "version",
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
  "bundledDependencies",
  "bundleDependencies",
  "overrides",
  "packageManager",
  "engines",
  "os",
  "cpu",
  "workspaces",
];
const normalize = value => JSON.stringify(value ?? null);
const changed = lockRelevantKeys.some(key => normalize(before[key]) !== normalize(after[key]));
process.exit(changed ? 0 : 1);
' "$old_package" "$new_package"; then
    echo "❌ package.json dependency metadata changed but package-lock.json is not staged."
    echo "   Run 'npm install' and stage the updated package-lock.json."
    exit 1
  fi
fi

echo ""
echo "✅ Pre-commit checks passed."
