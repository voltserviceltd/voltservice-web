export type Route = {
  href: string;
  label: string;
};

/** Single source of truth for primary navigation — used by header and footer. */
export const primaryNavRoutes: Route[] = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export const contactRoute: Route = { href: "/contact", label: "Contact" };

/** The site-wide "Start a project" action, shown as the header/nav CTA. */
export const primaryCta: Route = { href: "/contact", label: "Start a project" };

/** Legal pages linked from the footer (not part of the primary nav). */
export const legalRoutes: Route[] = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of use" },
];
