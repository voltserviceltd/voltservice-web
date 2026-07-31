import type { MetadataRoute } from "next";
import { clientEnv } from "@/lib/env/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${clientEnv.siteUrl}/sitemap.xml`,
  };
}
