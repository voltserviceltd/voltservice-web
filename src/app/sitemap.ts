import type { MetadataRoute } from "next";
import { clientEnv } from "@/lib/env/env";

// Deliberately lists only routes that actually exist. The nav (src/lib/router/routes.ts)
// includes pages not yet built (Phase 1) — add each one here as it ships,
// don't derive this from the nav wholesale, or Google gets a sitemap full of 404s.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: clientEnv.siteUrl,
      lastModified: new Date(),
    },
  ];
}
