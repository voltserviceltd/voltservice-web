import type { Metadata } from "next";

export const siteConfig = {
  companyName: "VOLTSERVICE LTD",
  brandName: "VoltService",
  domain: "metalbrain.net",
  siteUrl: "https://www.metalbrain.net",
  contactEmail: "voltservice@metalbrain.net",
  // Must match the Companies House register exactly (checked 13 Nov 2026).
  legal: {
    name: "VOLTSERVICE LTD",
    companyNumber: "16613560",
    jurisdiction: "England and Wales",
    registeredOffice:
      "165 Gleneagle Road, Ground Floor, Lambeth, London, England, SW16 6AZ",
    companiesHouseUrl:
      "https://find-and-update.company-information.service.gov.uk/company/16613560",
  },
  defaultTitle: "VoltService | Websites, apps and internal tools for UK businesses",
  defaultDescription:
    "VoltService (VOLTSERVICE LTD) is a small, founder-led software studio. We design, build and look after websites, web apps and internal tools for UK businesses, and run our own products too.",
  openGraphDescription:
    "Software that takes the busywork off your plate. Websites, web apps and internal tools from a founder-led UK studio.",
} as const;

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.openGraphDescription,
    url: siteConfig.siteUrl,
    siteName: siteConfig.companyName,
    locale: "en_GB",
    type: "website",
  },
};

export function legalLine(year = new Date().getFullYear()) {
  const { name, jurisdiction, companyNumber, registeredOffice } = siteConfig.legal;
  return `© ${year} ${name}. Registered in ${jurisdiction}, company number ${companyNumber}. Registered office: ${registeredOffice}.`;
}
