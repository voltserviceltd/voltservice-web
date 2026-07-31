export type Route = {
  href: string;
  label: string;
};

/** Single source of truth for primary navigation — used by header and footer. */
// "Blog" is deliberately excluded until Phase 3 decides whether to write real
// posts or drop the route entirely (see doc/nextjs-migration-plan.md) — no
// nav entry should link to a page that doesn't exist yet.
export const primaryNavRoutes: Route[] = [
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/projects", label: "Projects" },
  { href: "/technology", label: "Technology" },
  { href: "/about", label: "About" },
];

export const contactRoute: Route = { href: "/contact", label: "Contact" };
