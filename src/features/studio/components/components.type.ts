
export type NavItem = {
  label: string;
  href: `#${string}`;
}; 

export type SiteNavbarProps = {
  contactEmail: string;
  domain: string;
  items: NavItem[];
};

