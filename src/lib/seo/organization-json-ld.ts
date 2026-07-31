import { clientEnv } from "@/lib/env/env";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VoltService Ltd",
    url: clientEnv.siteUrl,
    description:
      "VoltService Ltd is a B2B custom software development company, building and operating products including PaySmart and VoltConnect.",
  };
}
