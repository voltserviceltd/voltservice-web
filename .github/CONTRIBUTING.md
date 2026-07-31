# Contributing to VoltService Website

## Branching Strategy

- `main` -> production
- `develop` -> integration
- `feature/*` -> new features
- `fix/*` -> bug fixes
- `hotfix/*` -> urgent fixes

## Local Setup

```bash
npm ci
bash Scripts/setup_git_hooks.sh
npm run lint && npm test && npm run build
```

## Workflow

1. Create a branch:
   `git checkout -b feature/your-feature`
2. Commit with a clear message:
   `git commit -m "feat: improve services page copy"`
3. Push:
   `git push -u origin feature/your-feature`
4. Open a pull request.

## Rules

- No direct commits to `main`.
- Keep PRs small and focused.
- Preserve the boundaries described in `doc/nextjs-migration-plan.md` (in the
  `voltserviceltd` docs repo) — one theme system, per-domain `src/lib`
  grouping, presentational-only components.
- Ensure CI passes before requesting review.
- Add collaborators through teams, not broad repo admin access.

## Repository Governance

This repository is designed for least-privilege collaboration.

- Keep [CODEOWNERS](./CODEOWNERS) assigned to `@MetalHuman38`.
- Keep `.github/`, deployment config, lockfiles, and build tooling under
  maintainer review.
- Enable branch protection on `main` and `develop`.
- Require code owner review before merge.

## Testing

- Add tests for visible behavior, content contracts, and shared UI logic.
- Run `npm run lint && npm test && npm run build` before pushing (the
  `pre-push` git hook — see `Scripts/setup_git_hooks.sh` — runs this
  automatically, plus a Linux/Node 22 Docker parity check when Docker is
  available).
- Include screenshots for UI changes.
