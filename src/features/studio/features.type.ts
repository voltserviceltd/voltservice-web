import type { Route } from "next";

export type NavItem = {
  label: string;
  href: Route;
}; 

export type PortfolioItem = {
  name: string;
  category: string;
  summary: string;
  detail: string;
  image: string;
  imageAlt: string;
  screenshots?: {
    image: string;
    imageAlt: string;
  }[];
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

export type FounderProfile = {
  eyebrow: string;
  title: string;
  name: string;
  role: string;
  summary: string;
  details: string[];
};
