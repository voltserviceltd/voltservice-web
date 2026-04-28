# Contributing to Voltservice Web

## Branching Strategy

- `main` -> production
- `develop` -> integration
- `feature/*` -> new features
- `fix/*` -> bug fixes
- `hotfix/*` -> urgent fixes

## Local Setup

```bash
npm ci
npm run git:hooks
npm run ci
```

## Workflow

1. Create a branch:
   `git checkout -b feature/your-feature`
2. Commit with a clear message:
   `git commit -m "feat: improve studio homepage"`
3. Push:
   `git push -u origin feature/your-feature`
4. Open a pull request.

## Rules

- No direct commits to `main`.
- Keep PRs small and focused.
- Preserve the boundaries described in `CONTRIBUTING.md` and `VOLTSERVICE.md`.
- Ensure CI passes before requesting review.
- Add collaborators through teams, not broad repo admin access.

## Repository Governance

This repository is designed for least-privilege collaboration.

- Mirror GitHub teams to [CODEOWNERS](./CODEOWNERS).
- Keep `.github/`, deployment config, lockfiles, and build tooling under
  maintainer review.
- Enable branch protection on `main` and `develop`.
- Require code owner review before merge.

Suggested team split:

- `maintainers`
- `frontend`
- `platform`
- `design`

## Testing

- Add tests for visible behavior, content contracts, and shared UI logic.
- Run `npm run ci` before pushing.
- Include screenshots for UI changes.
