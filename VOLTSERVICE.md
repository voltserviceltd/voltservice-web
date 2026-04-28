# Voltservice Implementation Guide

This document is the implementation anchor for the public-facing Voltservice
site. It combines the brand guardrails, repo boundaries, page map, and Firebase
App Hosting deployment path into one place.

## Objective

Voltservice should read as a **product-focused software studio**.

The site exists to do four jobs well:

1. explain what Voltservice is
2. prove the company builds real products
3. give each product a clean place to live
4. ship on a frontend stack that can grow without a rewrite

This is not a BuildersHub clone. It is the public face for the company behind
BuildersHub and any future product line.

## Narrative Guardrails

New copy and new pages should reinforce these points:

1. Voltservice builds real products, not only pitch material.
2. The studio values architecture, testing, and maintainability.
3. The public face should communicate substance, not generic services language.
4. Product proof should lead the page hierarchy before capability claims.

If a new section weakens those points, it is drifting.

## Current Starter Baseline

The current repo already has a usable first slice:

- Next.js 16 App Router
- React 19
- typed homepage content in `src/features/studio/content.ts`
- homepage UI in `src/features/studio/studio-home.tsx`
- reusable section heading in `src/shared/ui`
- site-wide identity and metadata in `src/shared/config/site.ts`
- metadata web files in `src/app/layout.tsx`, `src/app/sitemap.ts`, and `src/app/robots.ts`

That is the right baseline. The next step is not adding more random folders. It
is growing the public site with the same discipline.

## Page Map

The site should expand in this order:

- `/`: company homepage and high-level product proof
- `/products`: overview of active products and experiments
- `/products/buildershub`: primary product page
- `/products/paysmart`: product or concept page
- `/about`: company positioning, approach, and credibility
- `/contact`: direct contact path, lead capture, or enquiry flow
- `/legal/privacy`: privacy policy
- `/legal/terms`: terms of use
- `/journal` or `/insights`: optional after the product pages are established

Do not build a blog or careers area before the product and legal pages exist.

## Module Boundaries

Use these boundaries consistently:

- `src/app`: route entrypoints, metadata, robots, sitemap, and route composition
- `src/features`: route-owned UI, content, and tests
- `src/shared/config`: company identity, canonical URL, metadata, and deployment-facing config
- `src/shared/ui`: reusable presentational primitives with no feature story inside them
- `public/brand`: static brand and product imagery

Do not reintroduce catch-all folders such as `src/components`, `src/constants`,
or `src/core`. Those folders blur ownership and make the repo harder to evolve.

## Target Folder Layout

The current repo is intentionally small. As soon as the second route family is
added, grow it into this structure:

```text
src/
  app/
    layout.tsx
    page.tsx
    robots.ts
    sitemap.ts
    (marketing)/
      products/
        page.tsx
        [slug]/
          page.tsx
      about/
        page.tsx
      contact/
        page.tsx
      legal/
        privacy/
          page.tsx
        terms/
          page.tsx
  features/
    studio/
    products/
    about/
    contact/
    legal/
  shared/
    config/
    ui/
  content/
    products/
    pages/
    legal/
public/
  brand/
```

Use `src/content` only when there are multiple page families or repeatable page
records. Until then, keep feature content with the feature.

## Implementation Slices

Build the site in these slices:

### Slice 1: baseline cleanup

- keep the current homepage feature
- centralize company identity in `src/shared/config/site.ts`
- keep `src/app` thin
- remove dead folders that do not belong to the chosen boundaries

### Slice 2: product architecture

- add `/products`
- add `src/features/products`
- move the product card records into typed product content
- create a reusable product page section pattern

### Slice 3: trust and conversion

- add `/about`
- add `/contact`
- add `/legal/privacy`
- add `/legal/terms`
- wire the contact path to an email provider, CRM, or webhook

### Slice 4: publishing

- add `/journal` only if there is real publishing cadence
- keep content typed and route-owned
- add preview or MDX only when editing frequency justifies it

## Firebase App Hosting Setup

Use **Firebase App Hosting** as the primary deployment path for this repo.
Firebase's official guidance currently recommends App Hosting for full-stack
Next.js apps rather than the older framework-aware Hosting preview.

Recommended setup:

1. Put the repo on GitHub.
2. In Firebase console, open **App Hosting** and create a backend.
3. Connect the GitHub repository.
4. Set the app root directory to `.`.
5. Set the live branch to `main`.
6. Enable automatic rollouts.
7. Add the custom domain after the first healthy rollout.

App Hosting handles builds with Cloud Build, serves the app on Cloud Run, and
puts Cloud CDN in front of it. That fits the Google-based workflow already used
elsewhere.

## `apphosting.yaml` Starter

Add `apphosting.yaml` when you need runtime tuning, environment variables, or
Cloud Secret Manager references.

A safe starting point looks like this:

```yaml
runConfig:
  minInstances: 0
  maxInstances: 2
  concurrency: 50

env:
  - variable: NEXT_PUBLIC_SITE_URL
    value: https://www.metalbrain.net
    availability:
      - BUILD
      - RUNTIME

  - variable: FORM_WEBHOOK_URL
    secret: voltservice-form-webhook-url
```

Use normal values for non-sensitive settings. Use Secret Manager-backed `secret`
references for webhook URLs, API keys, or provider credentials.

## Deployment Notes

- Keep public metadata aligned with the real canonical domain.
- Let `src/shared/config/site.ts` own the production URL until a broader env
  system is necessary.
- Use `npm run check` before shipping changes.
- Prefer GitHub-connected rollouts over ad hoc manual deploys for this repo.
- Add a preview workflow only after the first few route families are in place.

## Quality Bar

Every visible change should keep these checks healthy:

```bash
npm run lint
npm run typecheck
npm run test:run
npm run check
```

Testing does not need to be broad. It does need to protect page structure,
content invariants, and the core public narrative.

## Immediate Next Work

1. Add `/products` and split the current product proof into reusable product data.
2. Add `/about`, `/contact`, and the two legal routes.
3. Introduce `apphosting.yaml` when the domain or contact flow needs runtime config.
4. Connect the repo to Firebase App Hosting once GitHub is ready.

## References

- Firebase App Hosting overview: https://firebase.google.com/docs/app-hosting
- Firebase App Hosting getting started: https://firebase.google.com/docs/app-hosting/get-started
- Firebase App Hosting configuration: https://firebase.google.com/docs/app-hosting/configure
- Next.js App Router: https://nextjs.org/docs/app
- Next.js public pages guide: https://nextjs.org/docs/app/guides/public-static-pages
