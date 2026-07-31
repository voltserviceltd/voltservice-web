export type Route = {
  href: string;
  label: string;
};

/** Single source of truth for primary navigation — used by header and footer. */
export const primaryNavRoutes: Route[] = [
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/projects", label: "Projects" },
  { href: "/technology", label: "Technology" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export const contactRoute: Route = { href: "/contact", label: "Contact" };
