import type { ProjectItem } from "@/lib/content/domain/project-item";

// Ported/adapted from the Flutter site's marketing_content.dart (projectItems).
// Shared by the Home (top 2) and Projects (all) pages.
export const projectItems: ProjectItem[] = [
  {
    eyebrow: "Featured product",
    title: "PaySmart growth and merchant control plane",
    description:
      "A unified product system spanning acquisition flows, merchant onboarding, dashboard surfaces, and payment-state visibility for a live fintech product on Google Play.",
    metrics: ["3 launch surfaces", "1 shared design system", "Realtime ops patterns"],
    tags: ["Fintech", "Merchant ops", "Payments"],
  },
  {
    eyebrow: "Featured product",
    title: "VoltConnect",
    description:
      "A connection and collaboration product shipped on the App Store, built and operated end-to-end by VoltService.",
    metrics: ["Shipped to App Store", "Operated in production"],
    tags: ["Mobile", "iOS", "Backend"],
  },
  {
    eyebrow: "Platform delivery",
    title: "VoltService website relaunch foundation",
    description:
      "Repositioned the brand with reusable content modules, SEO-aware metadata, and conversion paths built for future launches.",
    metrics: ["6 launch-ready surfaces", "Reusable component library", "SEO-aware routing"],
    tags: ["Marketing", "Next.js", "SEO"],
  },
];
