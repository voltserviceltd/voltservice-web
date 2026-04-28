# VOLTSERVICE LTD

Voltservice now has a Next.js App Router baseline for redesigning the company
image around a more standard React stack. The current site is repositioned as a
product studio rather than a generic services brochure, while the repo structure
borrows the maintainability discipline used in `buildershub`.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- ESLint
- Vitest + React Testing Library

## Project Structure

- `src/app`: route entrypoints, metadata, sitemap, robots, and page composition
- `src/features/studio`: homepage feature content, section UI, and tests
- `src/shared/config`: site-wide identity, metadata, and canonical URL config
- `src/shared/ui`: reusable display primitives shared across page sections
- `public/brand`: local raster assets used by the redesign

## Local Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run test:run
npm run check
npm run ci
```

`npm run ci` is the full local gate used by the GitHub Actions workflow.

## Git Setup

Install the tracked hooks after cloning:

```bash
npm run git:hooks
```

Use `docs/git-cli.md` for the first push and Windows-to-macOS handoff commands.

## Testing

Test suites are intentionally small and focused:

- `src/features/studio/content.test.ts` checks structural content invariants
- `src/features/studio/studio-home.test.tsx` checks the rendered homepage story

This keeps the company page easy to evolve without tying the tests to every
style change.

## Docs

- `CONTRIBUTING.md`: repo boundaries and contribution rules
- `VOLTSERVICE.md`: implementation guide, page map, deployment setup, and narrative guardrails
