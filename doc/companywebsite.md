# VoltService Company Website Reframing Report

## Purpose

Reframe the VoltService website so the company is positioned as a practical software partner, not as a single SaaS product.

VoltService products should be presented as examples of systems built by VoltService and references to the company’s work. They should not be presented as the whole business model or as the only thing VoltService sells.

## Core Positioning

### Title

Software services built around your business.

### Subtitle

VoltService Ltd designs and develops reliable websites, applications, and digital systems that help businesses improve operations, serve customers, and grow with confidence.

### Short Positioning Statement

VoltService is a software services company that helps businesses plan, build, improve, and maintain practical digital systems. We work across websites, web applications, internal tools, automation, integrations, and product development.

### One-Sentence Version

VoltService helps businesses turn operational needs into reliable websites, applications, and digital systems.

## Navigation (Confirmed)

- Home — logo/brand mark links here; not repeated as a nav label (matches existing header pattern of a wordmark link plus a separate Contact button).
- Services
- Work — replaces the former "Projects" label; same section, business-facing name.
- About
- Contact — kept out of the primary nav list and rendered as the header's standalone action button, consistent with the existing site pattern.

The former "Solutions" and "Technology" pages are retired as standalone nav items. Their generically useful ideas (practical delivery approach, reliability, technical credibility) are folded into Home/About; their PaySmart-demo-simulator content (API request/response mockups, code snippets) is removed entirely as self-referential/technical content that does not belong on a company portfolio site.

Optional later additions:

- Insights
- Support
- Careers

## Adaptive Navbar Specification

### Purpose

The navbar should make VoltService feel like a clear software services company from the first interaction. It should be simple, responsive, and easy to use on mobile without relying on cramped desktop links or inconsistent spacing.

### Navbar Content

#### Brand

VoltService

#### Primary Links

- Home
- Services
- Work
- About
- Contact

#### Primary CTA

Start a project

### Desktop Navbar

#### Layout

Use a horizontal navbar with the VoltService wordmark on the left, primary links in the centre or right, and a clear CTA button on the far right.

#### Desktop Behavior

- Keep the navbar visually lightweight.
- Use one row only.
- Keep link labels short.
- Highlight the current page with a subtle active state.
- Keep the CTA visually distinct from normal links.
- Avoid dropdowns unless the services section grows beyond five major service categories.

### Tablet Navbar

#### Layout

Tablet layouts can keep the desktop structure if links fit comfortably. If the links begin to crowd the CTA or brand, switch to the mobile menu pattern earlier.

#### Breakpoint Guidance

Switch to the mobile navbar at the point where the full navbar no longer has comfortable spacing. Do not wait until the layout breaks.

Recommended breakpoint:

```css
@media (max-width: 860px) {
  /* mobile navbar mode */
}
```

### Mobile Navbar

#### Layout

Mobile should use a compact top bar with:

- VoltService brand on the left.
- Menu button on the right.
- Full-width menu panel when opened.
- CTA included inside the opened menu.

#### Mobile Menu Button Text

Menu

Alternative if using an icon:

- Use a standard menu icon.
- Include an accessible label: `Open navigation menu`.

#### Mobile Menu Links

- Home
- Services
- Work
- About
- Contact
- Start a project

#### Mobile Behavior

- The menu should open and close cleanly.
- The page should not horizontally scroll.
- Menu items should be large enough to tap comfortably.
- The CTA should appear as the final item in the mobile menu.
- The menu should close after a navigation link is selected.
- The menu should close when the user presses Escape.
- The menu button should clearly show whether the menu is open.

### Clean Mobile CSS Configuration

Use a mobile-first structure with a single source of truth for spacing, height, and breakpoints.

```css
:root {
  --nav-height: 72px;
  --nav-inline-padding: clamp(1rem, 4vw, 2rem);
  --nav-link-gap: 1.5rem;
  --nav-mobile-breakpoint: 860px;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(12px);
}

.site-nav {
  min-height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-inline: var(--nav-inline-padding);
}

.nav-brand {
  flex: 0 0 auto;
  font-weight: 700;
  color: #0f172a;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--nav-link-gap);
}

.nav-link {
  color: #334155;
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover,
.nav-link:focus-visible {
  color: #0f172a;
}

.nav-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding-inline: 1rem;
  border-radius: 0.5rem;
  background: #0f172a;
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
}

.nav-toggle {
  display: none;
}

@media (max-width: 860px) {
  .site-nav {
    min-height: 64px;
  }

  .nav-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.75rem;
    min-height: 2.75rem;
    border: 1px solid rgba(15, 23, 42, 0.12);
    border-radius: 0.5rem;
    background: #ffffff;
    color: #0f172a;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0.75rem var(--nav-inline-padding) 1rem;
    background: #ffffff;
    border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  }

  .nav-links[data-open='true'] {
    display: flex;
  }

  .nav-link,
  .nav-cta {
    width: 100%;
    min-height: 3rem;
    justify-content: flex-start;
  }

  .nav-cta {
    margin-top: 0.5rem;
    justify-content: center;
  }
}
```

### Mobile Implementation Rules

- Do not use desktop nav links squeezed into a mobile row.
- Do not allow horizontal scrolling.
- Do not hide the CTA on mobile.
- Do not use tiny tap targets.
- Do not rely on hover-only interactions.
- Keep the mobile menu background solid enough for readable text.
- Keep the header height stable between open and closed states.

### Accessibility Rules

- The menu button must use `aria-expanded`.
- The menu button must use `aria-controls`.
- The menu panel must have a stable `id`.
- Keyboard users must be able to tab through links in order.
- Focus states must be visible.
- Escape should close the mobile menu.

### Suggested Navbar HTML Structure

```html
<header class="site-header">
  <nav class="site-nav" aria-label="Primary navigation">
    <a class="nav-brand" href="/">VoltService</a>
    <button
      class="nav-toggle"
      type="button"
      aria-controls="primary-navigation"
      aria-expanded="false"
    >
      Menu
    </button>
    <div class="nav-links" id="primary-navigation" data-open="false">
      <a class="nav-link" href="/">Home</a>
      <a class="nav-link" href="/services">Services</a>
      <a class="nav-link" href="/work">Work</a>
      <a class="nav-link" href="/about">About</a>
      <a class="nav-link" href="/contact">Contact</a>
      <a class="nav-cta" href="/contact">Start a project</a>
    </div>
  </nav>
</header>
```

## Homepage Content

### Hero Section

#### Heading

Software services built around your business.

#### Supporting Copy

VoltService Ltd designs and develops reliable websites, applications, and digital systems that help businesses improve operations, serve customers, and grow with confidence.

#### Primary Button

Start a project

#### Secondary Button

View our work

#### Supporting Note

From business websites to custom applications and operational systems, we build practical software that fits the way your organisation works.

## Partner Positioning Section

### Section Heading

A practical software partner for growing businesses.

### Section Copy

VoltService works with businesses that need more than a template website or off-the-shelf tool. We help define the problem, design the right solution, build reliable software, and support it as the business changes.

Our role is to understand how your business operates, then create digital systems that make daily work clearer, faster, and easier to manage.

### Editable Bullet Points

- Websites that present your business clearly and professionally.
- Applications that support customers, staff, and business workflows.
- Internal systems that reduce manual work and improve visibility.
- Integrations that connect tools, data, and processes.
- Ongoing support for software that needs to stay reliable.

## Services Section

### Section Heading

Services that support real business operations.

### Intro Copy

VoltService provides software services across the full delivery cycle, from planning and design through development, deployment, and improvement.

### Service 1: Business Websites

#### Heading

Business websites

#### Copy

We design and build clear, reliable websites that explain what your business does, help customers take action, and give your company a stronger digital presence.

#### Example Deliverables

- Company websites
- Service pages
- Landing pages
- Booking and enquiry flows
- Content-managed pages
- Performance and accessibility improvements

### Service 2: Web Applications

#### Heading

Web applications

#### Copy

We build web applications that help businesses manage customers, data, content, workflows, and specialist processes.

#### Example Deliverables

- Customer portals
- Dashboards
- Booking systems
- Workflow applications
- Admin panels
- Reporting tools

### Service 3: Digital Systems

#### Heading

Digital systems

#### Copy

We help businesses replace scattered spreadsheets, manual processes, and disconnected tools with systems that are easier to operate and maintain.

#### Example Deliverables

- Internal business tools
- Automation workflows
- Data capture systems
- Operational dashboards
- Role-based access systems
- Process management tools

### Service 4: Product Development

#### Heading

Product development

#### Copy

For teams building a digital product, VoltService can support planning, prototyping, development, release, and iteration.

#### Example Deliverables

- MVP planning
- Prototype development
- SaaS application development
- Feature delivery
- Technical roadmaps
- Product improvement cycles

### Service 5: Support And Improvement

#### Heading

Support and improvement

#### Copy

Software needs to stay useful after launch. We support existing websites and applications with fixes, improvements, maintenance, and technical guidance.

#### Example Deliverables

- Bug fixes
- Feature updates
- Performance improvements
- Hosting and deployment support
- Technical audits
- Ongoing development retainers

## Work / Product Reference Section

### Section Heading

Examples of systems built by VoltService.

### Important Positioning Note

The products currently mentioned on the website should be framed as examples of VoltService-built systems and references to our work. They should not be framed as the full scope of VoltService or as the only service offering.

### Section Copy

Our product work shows how we approach software: identify a real operational need, design a practical system, and build software that can be used, improved, and supported over time.

These projects are examples of the kind of digital systems VoltService can design and develop for businesses with similar needs.

### Editable Product Reference Format

Use this structure for each product or internal platform mentioned on the site.

#### Product / System Name

[Product name]

#### What It Shows

A VoltService-built example of [type of system], designed to help with [business problem or workflow].

#### Why It Matters

This project demonstrates our ability to design and build software that handles [operations, customer interaction, automation, reporting, data management, or another specific value].

#### Related Services

- Web application development
- Digital systems development
- Product development
- Support and improvement

### Suggested Intro For Product Cards

These are examples of systems designed and built by VoltService. Each one reflects our practical approach to solving business problems with reliable software.

### Product Card Template

#### Card Title

[Product or system name]

#### Card Copy

A VoltService-built system for [audience or business function]. This project demonstrates our work in [software type], [workflow], and [business value].

#### Card Link Text

View work example

## Approach Section

### Section Heading

How we work.

### Intro Copy

Good software starts with understanding the business. VoltService focuses on practical discovery, clear delivery, and maintainable systems.

### Step 1: Understand

We learn how your business works, what problems need solving, and what outcomes matter most.

### Step 2: Plan

We define the right shape of solution, including scope, features, user flows, data needs, and technical requirements.

### Step 3: Build

We design and develop the website, application, or system using reliable tools and maintainable code.

### Step 4: Launch

We help deploy the system, test the experience, and support the transition into real use.

### Step 5: Improve

We continue improving the software as your business needs change.

## Reliability Section

### Section Heading

Built to be useful beyond launch.

### Section Copy

VoltService focuses on software that businesses can depend on. That means clear structure, maintainable implementation, sensible technology choices, and support for future improvement.

### Editable Bullet Points

- Clear project scope and communication.
- Practical technical decisions based on the business need.
- Maintainable code and systems that can grow over time.
- Support for launch, fixes, and future improvements.
- A focus on software that helps people do real work.

## Who We Help Section

### Section Heading

Who we work with.

### Section Copy

VoltService works with businesses that need reliable digital capability, whether that means a better website, a custom application, an internal system, or support improving existing software.

### Editable Audience List

- Small and growing businesses that need a stronger digital presence.
- Service businesses that need better customer journeys and enquiry flows.
- Teams relying on manual processes that could be simplified through software.
- Organisations that need internal tools, dashboards, or workflow systems.
- Founders and operators building new digital products.

## About Section

### Current Site State

The current `/about` route is intentionally lean.

- Page file: `src/app/about/page.tsx`
- Current layout: first `PageSection` renders `SectionHeader {...aboutContent.header}`, then a second `PageSection` renders the blue `CTASection`.
- Current content source: `src/lib/content/service/about-content.ts`
- Current shared primitives: `PageSection`, `SectionHeader`, `Card`, `Button`, and `CTASection`
- Current theme source: `src/styles/globals.css`, using semantic tokens such as `bg-surface`, `text-text-primary`, `text-text-muted`, `border-border-subtle`, and `accent-primary`
- Existing UI dependency: `radix-ui` is already present and can be used for an accessible dialog without adding a new UI library.
- Current runtime packaging: the `Dockerfile` does not copy a `public/` directory. The founder avatar should therefore be added as an imported static asset under `src`, or the Dockerfile should be updated deliberately if the project later adopts `public/`.

### Section Heading

About VoltService Ltd.

### Updated Introduction Copy

VoltService Ltd is a software services company focused on practical digital delivery. Founded and led by Babatunde Kalejaiye, we design, build, and support websites, applications, and business systems that help organisations operate more effectively.

Clients work directly with the person responsible for shaping and delivering their software, creating clearer communication, stronger accountability, and solutions that remain maintainable after launch.

### Founder Presence Change

Add a compact founder card to the existing About introduction. This should increase trust by showing that there is a real person responsible for the company and its delivery, while keeping the page about VoltService rather than turning it into a personal portfolio.

The change should stay inside the existing About page structure:

- Keep the first `PageSection` as the About introduction area.
- Replace the single `SectionHeader` usage with a small two-column About intro composition.
- Left column: existing eyebrow, heading, and updated company introduction copy.
- Right column: compact `FounderCard`.
- Keep the existing blue `CTASection` as the next section.
- Do not add a dedicated founder page at this stage.
- Do not add extra images beyond the founder avatar.

Desktop layout:

- Use the empty right side of the About introduction.
- Use a grid such as `grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)]`.
- Align the card to the top of the introduction, not centered like a testimonial.
- Keep the introduction max width close to the current `SectionHeader` width.
- Keep the card compact, visually secondary, and restrained.

Mobile layout:

- Collapse to one column.
- Render the founder card below the introductory text.
- Keep it above the existing blue call-to-action section.
- Do not let the card or modal create horizontal overflow.

### Founder Card Content

The visible card should include:

- Avatar: 64-72px square image, using the supplied source image `G:\BuildersHub\original.png`
- Name: Babatunde Kalejaiye
- Role: Founder & Software Engineer
- Action text: About the founder
- Supporting line: Clients work directly with the person responsible for shaping and delivering their software.

Recommended asset handling for the current project:

- Copy the source image into a repo-managed asset path such as `src/assets/founder/original.png`.
- Import that image into the founder content or card module and render it with the Next.js `Image` component.
- Preserve the image aspect ratio with a fixed square container and `object-cover`.
- Use descriptive alt text: `Portrait of Babatunde Kalejaiye, Founder and Software Engineer at VoltService Ltd.`
- If no avatar is configured, render a stable 64-72px initials fallback using `BK`.
- Do not reference the `G:\BuildersHub\original.png` source path at runtime.

### Founder Details Interaction

Clicking the avatar, card, or visible `About the founder` action should open a small accessible dialog, popover, or side panel. Because `radix-ui` is already installed, the preferred implementation is a lightweight Radix Dialog wrapper rather than a custom focus manager or a new dependency.

Founder details content:

```text
Babatunde Kalejaiye
Founder, VoltService Ltd.

"I founded VoltService to help businesses turn operational problems and product ideas into dependable software. I work across product planning, software development, deployment, and long-term technical support.

Clients work directly with me throughout the project, with additional specialists brought in when the work requires them."
```

Optional links:

- LinkedIn
- GitHub
- Contact

Only render optional links when a configured URL is valid. Treat internal paths such as `/contact` as valid site links, and external links as valid only when they are absolute `https://` URLs.

### Component And Content Shape

Keep founder content and URLs out of the presentation component.

Recommended files:

- `src/lib/content/service/founder-content.ts`: founder name, role, details, avatar import, alt text, and optional links
- `src/components/marketing/founder-card.tsx`: compact visible founder card
- `src/components/marketing/founder-details-dialog.tsx`: accessible founder details dialog
- `src/app/about/page.tsx`: about page composition only

The founder card should be a client component if it owns open/close state. Use one interactive trigger for the whole card surface to avoid nested button issues. The visible `About the founder` label can be styled as inline action text inside that trigger.

Accessibility requirements:

- Use a semantic button trigger or Radix `Dialog.Trigger`.
- Keep the founder name and role visible without interaction.
- Support keyboard activation with Enter and Space.
- Support Escape to close.
- Return focus to the trigger after closing.
- Include a labelled dialog title.
- Keep the modal or panel mounted through a portal/fixed overlay so it does not shift the page layout.
- Ensure the close button has a clear accessible name.

Visual requirements:

- Reuse the current dark/light theme tokens instead of introducing a separate palette.
- Match existing rounded-lg radius, border, surface, muted text, and accent conventions.
- Keep the card smaller than service/work cards, with restrained padding and no large profile treatment.
- Avoid testimonial styling, oversized portrait treatment, decorative backgrounds, or a separate team section.
- Use stable dimensions for the avatar and card content so image loading does not resize the section.

Acceptance checks:

- `/about` keeps the same overall order: About introduction, founder card, blue CTA.
- The founder card appears to the right of the introduction on desktop.
- The founder card appears below the introduction and above the CTA on mobile.
- The page works in light and dark themes.
- The dialog opens from the card, closes with Escape, closes from an explicit close control, and returns focus to the card trigger.
- `npm run lint`, `npm test`, and `npm run build` remain clean.

## Call To Action Section

### Section Heading

Have a website, application, or system to build?

### Copy

Tell us what you are trying to improve. VoltService can help shape the idea, plan the right solution, and build software that supports your business properly.

### Primary Button

Start a conversation

### Secondary Button

View work examples

## Contact Page Content

### Page Heading

Start a project with VoltService.

### Intro Copy

Whether you need a new website, a custom application, an internal system, or support improving existing software, we can help you understand the best next step.

### Current Contact Approach

For the current stage of the company, do not build a contact form yet. Expose a clear direct email contact route and let enquiries arrive in the company inbox.

This is the right first step because enquiry volume is expected to be manageable, the company can respond personally, and the site does not yet need a submission API, database, queue, CRM, or transactional email provider.

### Direct Email Content

Show the email address as visible text and as a `mailto:` link. Do not hide the only contact route behind an icon or button.

Suggested page copy:

```text
Email VoltService directly with a short outline of what you need built, improved, or supported.
```

Suggested enquiry prompts below the email link:

- What kind of software do you need help with?
- What business problem are you trying to solve?
- Is this a new build, an improvement, or support for an existing system?
- What is the best way to reply?

Keep the prompts lightweight. They should help the visitor write a useful first email, not behave like a form.

### Storage Map

Current storage should be the company email inbox only.

- Website: displays the contact email and suggested enquiry prompts.
- Browser: opens the visitor's own email client when `mailto:` works.
- Email inbox: stores the enquiry under normal mailbox retention.
- Website application: stores nothing.
- GCP: no Firestore, Cloud SQL, Cloud Storage bucket, queue, or contact API is required for enquiries at this stage.
- Logs: no contact payload exists in the app logs because no form is submitted through the app.

### Direct Email Implementation Notes

Use direct email intentionally, with a simple fallback:

- Render the email address visibly in plain text.
- Make the primary action a `mailto:` link.
- Include a short line advising users to copy the address if their email app does not open.
- Keep the email address configurable in content, not hard-coded across multiple components.
- Do not add SMTP credentials, provider API keys, reCAPTCHA, or contact-form environment variables yet.

Recommended content file when implemented:

- `src/lib/content/service/contact-content.ts`

Suggested content shape:

```ts
export const contactContent = {
  email: "configured-company-email@example.com",
  mailtoSubject: "Project enquiry for VoltService",
  prompts: [
    "What kind of software do you need help with?",
    "What business problem are you trying to solve?",
    "Is this a new build, an improvement, or support for an existing system?",
    "What is the best way to reply?",
  ],
} as const;
```

Replace the placeholder email with the actual company inbox before publishing.

### Future Upgrade Path

Fast-track a contact form only when direct email becomes a bottleneck.

Upgrade triggers:

- Enquiries become frequent enough that manual triage is slowing response time.
- Spam to the public email address becomes a real operational issue.
- The company needs structured lead tracking, consent records, or CRM handoff.
- Multiple people need to handle enquiries with clear status and ownership.

Future form phases:

1. Add a minimal `/contact` form with name, email, enquiry type, message, and consent.
2. Submit to a server-side `POST /api/contact` route.
3. Send enquiries to the company inbox through an authenticated email provider.
4. Add reCAPTCHA or another anti-spam control only if spam justifies it.
5. Add CRM or database storage only when enquiry management needs outgrow the inbox.

### Contact CTA

Email VoltService

## Footer Content

### Footer Statement

VoltService Ltd designs and develops reliable websites, applications, and digital systems for businesses that need practical software support.

### Footer Links

- Services
- Work
- About
- Contact
- Privacy Policy

## Language Rules For The Website

### Use This Language

- Software services
- Practical software partner
- Websites, applications, and digital systems
- Built around your business
- Work examples
- Systems built by VoltService
- Reliable digital systems
- Improve operations
- Serve customers
- Grow with confidence

### Avoid This Language

- All-in-one SaaS platform
- The VoltService product
- One product for every business
- Buy now
- Subscribe to our platform
- Product-only positioning
- Generic innovation claims without practical detail

## Product Mentioning Rules

When mentioning existing VoltService-built products, use this framing:

- This is an example of our work.
- This system was built by VoltService.
- This shows the kind of software we can design and develop.
- This project demonstrates our capability in a specific business area.

Do not imply:

- VoltService is only that product.
- Every customer must use that product.
- The company is limited to SaaS subscriptions.
- The product catalogue is the primary service offering.

## Recommended Homepage Order

1. Hero: Software services built around your business.
2. Practical partner positioning.
3. Services overview.
4. Work examples / VoltService-built systems.
5. How we work.
6. Reliability and support.
7. Who we help.
8. Final call to action.

## Final Website Message

VoltService should feel like a capable, practical software partner: a company that can understand a business problem, design the right digital solution, build it reliably, and support it as the business grows.
