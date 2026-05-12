
import type { Route } from "next";

export type NavItem = {
  label: string;
  href: Route;
};

export type SiteNavbarProps = {
  contactEmail: string;
  domain: string;
  items: NavItem[];
};
