import type { Metadata } from "next";

export const siteConfig = {
  companyName: "VOLTSERVICE LTD",
  domain: "metalbrain.net",
  siteUrl: "https://www.metalbrain.net",
  contactEmail: "voltservice@metalbrain.net",
  defaultTitle: "VOLTSERVICE LTD | Product Studio",
  defaultDescription:
    "VOLTSERVICE LTD is the product studio behind BuildersHub, PaySmart, and VoltPay. React and Next.js redesigns, cloud systems, and disciplined delivery.",
  openGraphDescription:
    "A product-focused software studio building and redesigning modern digital products, web platforms, and cloud-backed systems.",
  strapline:
    "A focused product partner for companies that need a clearer image and a stronger engineering base.",
} as const;

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.openGraphDescription,
    url: siteConfig.siteUrl,
    siteName: siteConfig.companyName,
    type: "website",
  },
};
