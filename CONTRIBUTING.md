# Contributing to Voltservice

Thanks for contributing.

This repo is the public-facing Next.js site for **VOLTSERVICE LTD**. The goal
is to keep the company image sharp while preserving the engineering discipline
used in the studio's product repos.

## Before You Start

- Read [README.md](./README.md) for the current structure and scripts.
- Read [VOLTSERVICE.md](./VOLTSERVICE.md) before changing public-facing copy.
- Keep changes scoped to one section, one feature, or one architectural cut.
- Do not commit secrets, local environment files, or unrelated asset churn.

## Project Boundaries

Use these boundaries consistently:

- `src/app`: routing, metadata, sitemap, robots, and route composition
- `src/features`: feature-owned UI, content, and tests
- `src/shared/config`: site-wide identity, metadata, canonical URLs, and deployment-facing config
- `src/shared/ui`: reusable presentation primitives that are not feature-specific
- `public/brand`: local static assets used by the site

Do not:

- put feature content directly into `src/app` when it belongs in a feature
- park site-wide constants in feature files when they belong in `src/shared/config`
- reintroduce catch-all folders like `src/components`, `src/constants`, or `src/core`
- mix page-specific layout code into shared UI primitives
- hide product-story decisions in CSS or anonymous constants
- add test coverage only after a behavior change has already escaped review

## Quality Expectations

- keep content typed and easy to inspect
- prefer small, readable components over broad page files
- add or update tests when visible behavior or content contracts change
- keep scripts runnable through `npm run check`

## Local Checks

```powershell
npm run lint
npm run typecheck
npm run test:run
npm run build
```

For the same gate used by CI and the pre-push hook:

```powershell
npm run ci
```

Install tracked Git hooks once per clone:

```powershell
npm run git:hooks
```

## Pull Request Notes

When opening a PR:

- explain the visible change
- explain why the structure fits the current boundaries
- list commands run
- include screenshots for UI changes
