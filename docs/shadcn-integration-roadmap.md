# Shadcn Integration Roadmap

This document covers the work that should follow the initial Tailwind and
shadcn bootstrap.

## What Is Already Done

- Tailwind CSS v4 is installed and wired through `src/app/globals.css`.
- `components.json` is configured for the existing `src/`-based Next.js app.
- shadcn primitives are installed only for the navbar slice:
  - `button`
  - `navigation-menu`
  - `sheet`
- The studio header now uses a shadcn `NavigationMenu` on desktop and `Sheet`
  on mobile.

## Why The Rollout Should Stay Narrow

The current site already has a functioning token layer and CSS-module-based page
structure. Replacing the whole styling system in one pass would create churn
without improving the product story.

The right goal is to let shadcn handle interactive primitives while Voltservice
keeps ownership of:

- brand tokens
- page composition
- narrative structure
- feature boundaries

## Recommended Next Phases

### Phase 2: Token Consolidation

Reduce overlap between the existing custom semantic variables and the shadcn
theme bridge in `src/app/globals.css`.

Target outcomes:

- define one clear source of truth for surfaces, text, borders, and actions
- remove aliases that are only left over from the pre-shadcn header
- document which variables are safe for page CSS vs. shadcn utilities

### Phase 3: Shared Primitive Expansion

Add shadcn only where it replaces repeated UI behavior cleanly.

Good next candidates:

- `card`
- `badge`
- `separator`
- `dialog`
- `dropdown-menu`

Avoid adding components just because they exist in the registry.

### Phase 4: Studio Feature Migration

If the studio page keeps evolving, migrate repeated feature-level UI from CSS
modules into small composition components under `src/features/studio/components`.

Examples:

- product proof cards
- service cards
- contact CTA band

Keep layout ownership in the feature, not in `src/components/ui`.

### Phase 5: Theme Strategy

Decide whether the project should remain system-theme driven or move to an
explicit class-based theme toggle.

If a theme toggle is added later:

- add `next-themes`
- switch Tailwind dark mode to class-based activation
- keep shadcn semantic tokens mapped to Voltservice brand tokens

Do not add a theme toggle unless it supports the brand and product posture.

## File Ownership Guidance

- `src/components/ui`: generated or lightly edited shadcn primitives
- `src/lib`: shadcn support utilities such as `cn`
- `src/features/studio/components`: company-site compositions such as navbar,
  product cards, and CTA sections
- `src/shared/ui/tokens`: brand token source of truth

## Guardrails

- Do not move product copy into generic UI components.
- Do not replace CSS modules for layout-heavy sections unless there is repeated
  reuse.
- Do not let Tailwind utility strings become the only documentation of the
  design system.
- Keep test coverage focused on behavior and structure, not utility-class exact
  matches.

## Verification Standard

For each shadcn expansion:

1. run `npm run lint`
2. run `npm run typecheck`
3. run `npm run test:run`
4. run `npm run build`

Each component slice should leave the site in a releasable state.
