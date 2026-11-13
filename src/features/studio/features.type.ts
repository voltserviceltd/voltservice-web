import type { Route } from "next";

import type { Accent, IconComponent, TagTone } from "@/shared/ui/ui.type";

export type NavItem = {
  label: string;
  href: Route;
};

export type ServiceItem = {
  slug: string;
  title: string;
  summary: string;
  points: [string, string, string];
  /** Longer copy for the Services page. */
  examples: string[];
  color: Accent;
  icon: IconComponent;
};

export type ProductItem = {
  name: string;
  status: string;
  statusTone: TagTone;
  summary: string;
  detail: string;
  url: string;
  urlLabel: string;
  stack: string[];
  visual: "paysmart" | "voltconnects";
  screenshots?: { image: string; imageAlt: string }[];
};

export type ProcessStep = {
  number: string;
  title: string;
  summary: string;
  detail: string;
  color: Accent;
};

export type CompanyFact = {
  text: string;
  icon: IconComponent;
  color: Accent;
};

export type FounderProfile = {
  name: string;
  role: string;
  summary: string;
  bio: string[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  linkedinUrl: string;
};

export type FooterGroup = {
  title: string;
  links: { label: string; href: string }[];
};
