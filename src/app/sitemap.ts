import type { MetadataRoute } from "next";

import { siteConfig } from "@/shared/config/site";

export const dynamic = "force-static";

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/services/", priority: 0.9 },
  { path: "/work/", priority: 0.9 },
  { path: "/how-we-work/", priority: 0.7 },
  { path: "/about/", priority: 0.8 },
  { path: "/contact/", priority: 0.8 },
  { path: "/research/", priority: 0.5 },
  { path: "/privacy/", priority: 0.3 },
  { path: "/terms/", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
