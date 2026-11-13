# VoltService website redesign: UI/UX implementation plan

**13 November 2026 · Status: design done in Figma; phases 0–5 built on branch `redesign/bright-site` (see §9)**

## 1. Why this exists

Cold research emails are about to go to 13 small fit-out and building firms in London and the South East
(see `~/development/project/saas/research-and-product-decision/leads-and-outreach.md`). Every recipient who
replies or wonders "who is this?" will open the website first. Today the site (screenshot:
[image.png](image.png)) is dark, grey-blue and generic. It reads as a template, and does nothing to show
that VOLTSERVICE LTD is a real UK company with real products.

The redesign has three jobs, in this order:

1. **Look like a real, trustworthy UK company.** Show the legal details, a founder, products that exist,
   and a privacy notice. The research handoff requires these before any email is sent.
2. **Feel bright and hand-made, not AI-generated.** Use warm colour, chunky outlines, sticker-like
   motion and specific copy. Avoid purple gradients, glassmorphism and stock phrases.
3. **Back up the research email.** A contractor who lands here should see that we are genuinely
   researching their problem, with no pitch, and be able to reply easily.

## 2. The design

**Figma file:** [VOLTSERVICE website redesign](https://www.figma.com/design/ypueAnmfmimUh7INXn0rpy)

| Figma page | What's on it |
| --- | --- |
| Foundations & Components | Colour, type, spacing, radius and shadow foundations, plus the full component library: icons, coloured icon tiles, buttons (all states), tags, form controls, navbar, cards, marquee and footer |
| Website – Desktop | Homepage at 1440px |
| Website – Mobile web | Homepage at 390px. The responsive website only; app designs are kept out of this file |
| Motion spec | Motion tokens, easing curves, the "sticker" interaction, the full animation inventory and reduced-motion rules |

Everything in Figma is editable layers built from components, styles and variables, with no flattened
screenshots. The variable names below match the CSS tokens one to one.

### 2.1 Direction in one paragraph

A warm cream "paper" page with ink-black outlines and **hard offset shadows** (no blur), so every card,
button and tile looks like a sticker on a desk. Bright accents (volt yellow, coral, blue, mint, lilac and
pink) are used in blocks rather than gradients. Headlines use **Bricolage Grotesque** (characterful, not
the default Inter look), body text uses **Instrument Sans**, and labels use **JetBrains Mono**. Motion is
playful but bounded: things pop, tilt and float in decorative areas, and never next to text someone is
reading.

### 2.2 Tokens (Figma variable → CSS custom property)

Replace the contents of `src/shared/ui/tokens/colors.css`, `typography.css` and `primitives.css` with
these values. Keep the existing semantic alias layer in `src/app/globals.css` and point it at the new
tokens, so shadcn primitives keep working.

| Figma variable | CSS variable | Value | Use |
| --- | --- | --- | --- |
| color/paper | `--color-paper` | `#FFF7E8` | Page background |
| color/paper-deep | `--color-paper-deep` | `#FFEBC7` | Alternate sections, disabled fills |
| color/white | `--color-white` | `#FFFFFF` | Cards, inputs |
| color/ink | `--color-ink` | `#15120E` | Text, outlines, shadows |
| color/ink-soft | `--color-ink-soft` | `#4A4339` | Body copy |
| color/ink-muted | `--color-ink-muted` | `#7A7063` | Meta text, 18px and above only |
| color/volt | `--color-volt` | `#FFD60A` | Primary action, highlights |
| color/coral | `--color-coral` | `#FF5B2E` | Energy, error outlines |
| color/blue | `--color-blue` | `#2F5BFF` | Trust bands, focus ring (white text on it) |
| color/mint | `--color-mint` | `#18C29C` | Success, live status |
| color/lilac | `--color-lilac` | `#C9B6FF` | Soft surfaces |
| color/pink | `--color-pink` | `#FF9ED8` | Playful accents |

**Contrast rule:** text on volt, coral, mint, lilac, pink, paper and white is **ink**. Text on blue and
ink is **white or paper**. Never put coral text on paper; it fails AA, so errors use an icon plus ink
text.

| Token group | Values |
| --- | --- |
| Spacing (4pt grid) | 4, 8, 12, 16, 24, 32, 48, 64, 96, 120 |
| Radius | sm 10 · md 16 · lg 24 · xl 36 · pill 999 |
| Stroke | 2px ink on every outlined element; 3px on hero pill, CTA card and founder photo |
| Shadow (hard, 0 blur) | SM `3px 3px 0 ink` · MD `6px 6px 0 ink` · LG `10px 10px 0 ink` |
| Motion durations | instant 80 · fast 120 · base 200 · slow 320 · reveal 600 · stagger 80 (ms) |
| Easing | out-expo `cubic-bezier(0.16,1,0.3,1)` · in-out `cubic-bezier(0.65,0,0.35,1)` · spring via CSS `linear()` |

| Text style | Font | Size / line height / tracking |
| --- | --- | --- |
| Display/XL | Bricolage Grotesque ExtraBold | 80 / 95% / −3% (hero, desktop) |
| Display/L | Bricolage Grotesque ExtraBold | 72 / 100% / −2.5% (CTA title, page titles) |
| Heading/H2 | Bricolage Grotesque ExtraBold | 52 / 105% / −1.5% |
| Heading/H3 | Bricolage Grotesque Bold | 30 / 115% |
| Heading/H4 | Bricolage Grotesque Bold | 22 / 120% |
| Body/L · M · S | Instrument Sans Regular | 20/150% · 17/155% · 15/150% |
| Body/M Strong, UI/Button | Instrument Sans SemiBold | 17 · 16 |
| Label/Mono | JetBrains Mono Medium | 13 / +8% / uppercase |
| Mobile/Display · Mobile/H2 · Mobile/Body L | as above | 50 · 36 · 18 (≤ 640px) |

Use `clamp()` so desktop and mobile sizes interpolate instead of jumping, for example
`font-size: clamp(3.125rem, 2rem + 4vw, 5rem)` for Display/XL.

## 3. Before launch: content the owner must supply or confirm

The design uses placeholders and a few claims that only the owner can confirm. **Nothing goes live with a
placeholder or an unconfirmed claim.** Where a claim can't be confirmed, remove it rather than soften it.

| Item | Where it appears | Action |
| --- | --- | --- |
| Company name and number | Footer, About | ✅ **VOLTSERVICE LTD, company number 16613560**, registered in England and Wales. Active, incorporated 29 July 2025, SIC 62012 (checked on Companies House, 13 November 2026). Held in `siteConfig.legal` |
| Registered office address | Footer, privacy notice | ✅ **165 Gleneagle Road, Ground Floor, Lambeth, London, England, SW16 6AZ**, exactly as on the register. Use the register's wording, not "Office 165 … Streatham", so the site matches Companies House |
| ICO registration number | Footer | ⏳ Add it if the data protection fee is paid; otherwise leave the line out and pay the fee (research handoff §4.7) |
| Contact email | Footer, contact, every `mailto:` | ✅ **`voltservice@metalbrain.net`** (already `siteConfig.contactEmail`). Check SPF, DKIM and DMARC on metalbrain.net before sending (handoff step 1) |
| Privacy notice | `/privacy`, footer, email signature | ⏳ Must cover **research contacts**: where details came from, purpose, lawful basis, retention, how to object (leads-and-outreach §1.3) |
| Founder photo and name | About section | ✅ **Babatunde Kalejaiye, Founder & Software Engineer.** Photo taken from the live About page and saved as `public/brand/founder-babatunde-kalejaiye.png`; name, role and LinkedIn are in `founderProfile` in `content.ts`. The file is 480×611px: fine at 1× in the 440px frame, slightly soft on retina screens. Swap in the original if you have a larger one (≥ 880×1120). Replaces the pink placeholder frame in Figma |
| "PaySmart: Live on Google Play" | Work section | Confirm it's live; add the real Play Store link |
| "VoltConnects: In development" | Work section | Confirm the status and the voltconnects.io URL |
| "Reply within one working day" | CTA band | Keep only if it will be honoured |
| "UK business-hours support", "Monthly improvement time" | Support card | Keep only if they are real offers |
| "Clear quote before any work", "Support after launch" | Hero trust points | Confirm these match how projects are actually run |
| "Built in the UK" sticker | Hero | True if all build work is done in the UK; otherwise change it to "UK company" |
| BuildersHub and VoltPay | Removed from the homepage | The current repo shows them; the live hub (metalbrain.net) lists only PaySmart and VoltConnects. Decide whether either returns on `/work` |

Do not add testimonials, client logos, project counts or years in business unless they are real and
attributable. The research rules ("never invent figures") apply to the website too.

## 4. Open decision: which codebase serves the live site

The screenshot shows **voltserviceltd.metalbrain.net** ("Software services built around your
business", with Home / Services / Work / About / Contact and a theme toggle). This repository renders
something different ("Build the product moments that matter", with Products / Services / Approach /
About / Contact). The live site also uses Next.js on-demand image optimisation (`/_next/image?url=…`),
which a static export like this repo (`output: "export"`, `images.unoptimized`) can't produce. So the
live site is almost certainly built from **a different repository**. Before building, confirm one of these:

- **A (assumed in this plan):** this repo replaces whatever serves voltserviceltd.metalbrain.net, and the
  redesign is built here.
- **B:** the live site lives in another repo. Port this plan there; the tokens and components are
  framework-agnostic CSS and React.

## 5. Information architecture

| Route | Status | Content |
| --- | --- | --- |
| `/` | Rebuild | Homepage, exactly as in Figma (section order in §7) |
| `/services` | Restyle | Four service cards, expanded: what you get, how it's priced, FAQs |
| `/work` | **New**, replaces `/products` | PaySmart and VoltConnects product cards, expanded. Redirect `/products/` → `/work/` |
| `/how-we-work` | Rename of `/approach` | The four steps in detail. Redirect `/approach/` |
| `/about` | Restyle | Founder, company facts, legal entity |
| `/contact` | Rebuild | Enquiry form (§6.4), email and "book a call" |
| `/research` | **New** | A short page for contractors reached by the research email: what we're learning, what happens to their details, and a reply route. Linked from the "Right now" strip |
| `/privacy` | **New**, blocker | Privacy notice (§3) |
| `/terms` | **New** | Website terms of use |

Navigation: Services · Work · How we work · About, with Contact and "Start a project" on the right.
Update `navigation` in `content.ts` and the route list in `content.test.ts` to match.

Because the site uses `output: "export"` (static, served by nginx), redirects go in `nginx.conf`
(`rewrite ^/products/?$ /work/ permanent;`), not in `next.config.ts`.

## 6. Build plan

Each phase leaves the site releasable and passes `npm run check`. Follow the boundaries in
`VOLTSERVICE.md`: route entry points in `src/app`, page sections in `src/features`, and reusable
primitives in `src/shared/ui`.

### Phase 0: foundations

1. **Fonts.** In `src/app/layout.tsx`, replace Inter and Playfair Display with `Bricolage_Grotesque`
   (weights 700, 800), `Instrument_Sans` (400, 500, 600) and `JetBrains_Mono` (500) from
   `next/font/google`. Expose them as `--font-display`, `--font-body` and `--font-mono`.
2. **Tokens.** Rewrite the three token files from §2.2. Remove the
   `@media (prefers-color-scheme: dark)` block: **v1 ships light only.** The brand depends on the cream
   and colour, and a dark theme would double QA before launch. Revisit after launch.
3. **Tailwind bridge.** In `globals.css`, map `@theme inline` to the new tokens (`--color-primary` →
   volt, `--color-ring` → blue, and so on) and add the `--shadow-hard-*`, `--ease-*` and `--duration-*`
   tokens so utilities like `shadow-hard` and `ease-out-expo` exist.
4. **Global motion guard.** Add one `@media (prefers-reduced-motion: reduce)` block that stops loops
   and shortens transitions (§8).

### Phase 1: shared primitives (`src/shared/ui`)

| Figma component | Code | Notes |
| --- | --- | --- |
| Button (Primary / Secondary / Dark × 5 states) | Restyle `src/components/ui/button.tsx` (cva) with variants `primary`, `secondary`, `dark` | Pill shape, 2px ink border, `shadow-hard-sm`; hover `translate(-2px,-2px)` + `shadow-hard`; active `translate(3px,3px)` + no shadow; `focus-visible` 4px blue ring. Minimum height 52px |
| Tag (8 tones, optional dot) | `shared/ui/tag.tsx` | Mono uppercase; `dot` prop renders the pulsing live dot |
| Icon tile (7 colours, swappable icon) | `shared/ui/icon-tile.tsx` | Takes a `lucide-react` icon and a `color` prop. Hover rotates −6° |
| Icon library | `lucide-react` (already installed) | 2px stroke, ink. Icons in Figma: Monitor, Smartphone, Plug, LifeBuoy, ShieldCheck, Zap, MessageCircle, Calendar, Check, ArrowRight, ArrowUpRight, Code, ClipboardCheck, Search, PenTool, Rocket, Mail, Menu, X, ChevronDown, Building, HardHat, Receipt, Users, CircleAlert |
| Text link | `shared/ui/text-link.tsx` | 4px volt underline that grows into a highlight on hover |
| Text field, Text area, Select, Choice chip, Checkbox, Radio, Toggle | `shared/ui/form/*` | Use the `radix-ui` package already installed for Checkbox, RadioGroup, Switch and Select. Visible labels always. Errors use a CircleAlert icon plus text, linked with `aria-describedby` |
| Marquee band | `shared/ui/marquee.tsx` | Duplicate the item list for a seamless loop; include a pause button (WCAG 2.2.2) |
| Reveal | `shared/ui/reveal.tsx` (client) | A single IntersectionObserver hook that adds `data-inview`; CSS does the animation |
| Section heading | Update `shared/ui/section-heading.tsx` | Tag eyebrow + H2 + optional lead |

Delete `GlassCard` and `Card.module.css` once nothing imports them; glass is off-brand.

### Phase 2: shell

- **Navbar** (`features/studio/components/navbar`): a floating white pill with an ink border, sticky
  16px from the top, shrinking 72 → 60px after 80px of scroll. On mobile, keep the existing shadcn
  `Sheet` but restyle it as a full-screen volt panel with staggered links.
- **Footer** (`shared/studio-shell.tsx`): an ink background with four columns, and a legal line built
  from `siteConfig.legal` (already added: name, number, jurisdiction, registered office). It reads:
  "© 2026 VOLTSERVICE LTD. Registered in England and Wales, company number 16613560. Registered
  office: 165 Gleneagle Road, Ground Floor, Lambeth, London, England, SW16 6AZ." Add `icoNumber` and
  `privacyUrl` when they exist, and render nothing for a missing field rather than a placeholder.
- **Skip link:** keep it, restyled as a volt pill.

### Phase 3: homepage (`features/studio/components/home`)

Split `studio-home.tsx` into one component per section, with copy in `content.ts` (typed, as today):

`hero.tsx` · `hero-collage.tsx` · `services-grid.tsx` · `product-proof.tsx` · `process.tsx` ·
`research-strip.tsx` · `about-founder.tsx` · `cta-band.tsx`

The hero collage is decorative: build it from real elements (cards, tiles, a CSS star sticker) with
`aria-hidden="true"`, not an image. This keeps it sharp and animatable.

### Phase 4: inner pages and contact

1. Restyle `/services`, `/about` and `/how-we-work`, and build `/work`, `/research`, `/privacy` and
   `/terms` from the same section components.
2. **Contact form.** The site is a static export, so there's no server to post to. Options:
   - **Recommended:** post to a hosted form endpoint that stores and forwards submissions, after
     checking its data-processing terms and listing it as a subprocessor in the privacy notice.
   - **Minimal:** keep `mailto:` buttons only, with no form. This is the fastest path to launch.
   - **Later:** drop `output: "export"` and use a Next.js server action on Firebase App Hosting
     (`VOLTSERVICE.md`).

   Fields: name, work email, company, "What do you need?" (choice chips), message, and an optional
   "Email me a copy" checkbox. No phone number field, and no data collected beyond what's needed to
   reply.

### Phase 5: motion pass

Implement the inventory on the Figma "Motion spec" page with CSS transitions and keyframes
(`tw-animate-css` is already installed) and the Reveal hook. The core patterns:

```css
/* The sticker interaction: buttons, cards, chips, tiles */
.sticker { box-shadow: var(--shadow-hard-sm); transition: transform var(--duration-fast) var(--ease-out-expo), box-shadow var(--duration-fast) var(--ease-out-expo); }
.sticker:hover { transform: translate(-2px, -2px); box-shadow: var(--shadow-hard); }
.sticker:active { transform: translate(3px, 3px); box-shadow: none; transition-duration: var(--duration-instant); }

/* Scroll reveal */
[data-reveal] { opacity: 0; transform: translateY(32px); transition: opacity var(--duration-reveal) var(--ease-out-expo), transform var(--duration-reveal) var(--ease-out-expo); transition-delay: calc(var(--i, 0) * var(--duration-stagger)); }
[data-reveal][data-inview] { opacity: 1; transform: none; }

/* Ambient float for collage cards */
@keyframes float { 50% { transform: translateY(-6px) rotate(var(--tilt, 0deg)); } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 150ms !important; }
  [data-reveal] { transform: none; }
}
```

Only add the Motion library if CSS `linear()` springs don't look right for the "busywork" pill and the
step blobs.

### Phase 6: quality

- **Tests.** Rewrite `studio-home.test.tsx` and `content.test.ts` for the new copy, routes and footer
  legal line. Keep them structural (headings, links, landmarks), not class-name checks.
- **Accessibility.** Add `jest-axe` to the component tests. Target WCAG 2.2 AA: 24px minimum targets
  (52px buttons), reflow at 320px, 200% zoom, keyboard-only pass, VoiceOver pass on iOS.
- **Performance.** Lighthouse mobile: Performance ≥ 90, Accessibility 100, Best Practices 100,
  SEO 100. Fonts are subset via `next/font`; the hero has no raster images.
- **Metadata.** Update `siteConfig` descriptions, the Open Graph image (a 1200×630 export of the
  hero), the sitemap with all routes, and `metadataBase` for the real domain.
- **Cross-browser.** Safari iOS 17+, Chrome, Firefox, Edge. Check that `linear()` easing falls back
  gracefully.

### Phase 7: launch

1. Replace every §3 placeholder and confirm every claim.
2. Run `npm run ci`.
3. Deploy (nginx container or Firebase App Hosting, per `VOLTSERVICE.md`) and check the live URL on a
   phone.
4. Only then put the privacy notice URL in the email signature and send cohort A.

## 7. Homepage section order (desktop and mobile)

| # | Section | Purpose for a cold-email visitor |
| --- | --- | --- |
| 1 | Nav + hero: "Software that takes the busywork off your plate." | Says what we do in five seconds; registered UK company tag |
| 2 | Marquee: Websites · Web apps · Mobile apps · Internal tools · Integrations · Ongoing support | Energy, and the scope at a glance |
| 3 | What we do: four service cards | What we can be hired for |
| 4 | Our own products: PaySmart, VoltConnects | Proof we ship and run real software |
| 5 | How we work: Listen → Shape → Build → Look after | Lowers risk: written scope, fixed price, weekly demos |
| 6 | Right now: "Listening to small contractors." | Matches the research email; makes the outreach look legitimate, with no pitch |
| 7 | Who you'll work with: founder, company facts | A real person and a real legal entity |
| 8 | CTA: "Got a process that eats your week?" | One clear next step |
| 9 | Footer: legal line, privacy notice | The disclosures UK business emails and websites need |

## 8. Definition of done

- [ ] Homepage matches Figma at 1440, 1024, 768, 390 and 320px widths.
- [ ] Every §3 item is resolved, with no placeholder text in the build.
- [ ] `/privacy`, `/terms` and `/research` are live and linked from the footer.
- [ ] `npm run ci` passes; axe reports zero violations; Lighthouse targets are met.
- [ ] With reduced motion on, nothing loops and nothing moves more than a fade.
- [ ] Keyboard-only: every interactive element is reachable, with a visible focus ring.
- [ ] Old routes (`/products/`, `/approach/`) redirect.
- [ ] The owner has read the site on a phone and signed off on the copy.

## 9. Implementation status (13 November 2026)

Built on branch `redesign/bright-site` (not committed). `npm run ci` passes: lint, typecheck,
14 tests and a static build of all routes.

**Done**

- **Phase 0:** new tokens (`src/shared/ui/tokens/*`, including `motion.css`), Bricolage Grotesque,
  Instrument Sans and JetBrains Mono via `next/font`, light-only theme, and a reduced-motion guard.
- **Phase 1:** `Button`/`ButtonLink`, `Tag`, `IconTile`, `TextLink`, `Section`/`Container`,
  `SectionHeading`, `Marquee` (with pause button), `RevealObserver` + `reveal()`, and form controls
  (`TextField`, `TextArea`, `ChoiceChips`) in `src/shared/ui`. Glass and card primitives removed.
- **Phase 2:** floating pill navbar (shrinks on scroll, full-screen volt menu on mobile) and a footer
  with the legal line from `siteConfig.legal`.
- **Phase 3:** homepage in the Figma section order, with the hero collage built from live elements.
- **Phase 4:** `/services`, `/work` (with real PaySmart screenshots), `/how-we-work`, `/about` (photo
  plus a company-details table linking to Companies House), `/contact`, `/research`, `/privacy` and
  `/terms`. `/products` and `/approach` are removed, with 301 redirects in `nginx.conf`.
- **Phase 5:** the motion inventory in CSS: hero rise and pill pop, floating collage, spinning
  sticker, progress fill, marquee, step-blob pop, card lift and tile tilt, link highlight, live-dot
  pulse and form-error shake.
- **Contact form:** validates input with an error summary and inline errors, then opens the
  visitor's own email app with the message filled in. No data goes to a server or third party.

**Content changed from the Figma file** (update Figma when the connector is back)

- **PaySmart** is described as invoicing for shift workers and freelancers (nurses, door staff,
  zero-hours workers), which is what the app does, not "for small businesses".
- **Removed claims:** "Book a 20-minute call" became "Email us", because there's no booking link.
  "Reply within one working day", "UK business-hours support" and "Monthly improvement time" were
  removed because they're unconfirmed.
- **Founder:** the placeholder frame is replaced by the real photo with a name and role caption.

**Still needs owner sign-off before launch**

| Item | Where |
| --- | --- |
| Retention periods (enquiries 24 months, research contacts 12 months, contracts 6 years) | `src/features/studio/components/legal/policy.ts` |
| Privacy notice and terms wording (drafted; not legal advice) | `/privacy`, `/terms` |
| Process claims: written scope and fixed price, weekly demo link | `/how-we-work`, services, hero trust points |
| "Built in the UK" sticker, "Live on Google Play" | Hero, Work |
| ICO registration number (add to `siteConfig.legal` and the footer once paid) | Footer |
| Open Graph image (1200×630) | Not yet made |
| Which repo serves voltserviceltd.metalbrain.net (§4) | Deployment |
