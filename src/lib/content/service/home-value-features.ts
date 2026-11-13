import type { FeatureItem } from "@/lib/content/domain/feature-item";

// Condensed from the Partner Positioning bullet list — used on the homepage.
export const homeValueFeatures: FeatureItem[] = [
  {
    eyebrow: "Websites",
    accent: "volt",
    icon: "monitor",
    title: "Websites that present your business clearly",
    description:
      "Clear, professional websites that explain what your business does and help visitors take the next step.",
  },
  {
    eyebrow: "Applications",
    accent: "coral",
    icon: "app-window",
    title: "Applications that support your workflows",
    description:
      "Applications that support customers, staff, and the day-to-day workflows your business relies on.",
  },
  {
    eyebrow: "Systems and integrations",
    accent: "blue",
    icon: "plug",
    title: "Systems that reduce manual work",
    description:
      "Internal systems and integrations that reduce manual work, connect your tools and data, and improve visibility.",
  },
];
