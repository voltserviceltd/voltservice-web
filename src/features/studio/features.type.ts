export type NavItem = {
  label: string;
  href: `#${string}`;
}; 

export type PortfolioItem = {
  name: string;
  category: string;
  summary: string;
  detail: string;
  image: string;
  imageAlt: string;
};

export type CapabilityItem = {
  title: string;
  summary: string;
};

export type PrincipleItem = {
  title: string;
  summary: string;
};

export type ProcessStep = {
  title: string;
  summary: string;
};

export type ProofItem = {
  label: string;
  value: string;
};