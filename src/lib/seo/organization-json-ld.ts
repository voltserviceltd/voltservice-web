import { clientEnv } from "@/lib/env/env";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VoltService Ltd",
    url: clientEnv.siteUrl,
    description:
      "VoltService Ltd designs and develops reliable websites, applications, and digital systems that help businesses improve operations, serve customers, and grow with confidence.",
  };
}
