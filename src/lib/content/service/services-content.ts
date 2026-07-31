import type { FeatureItem } from "@/lib/content/domain/feature-item";

// Page-specific copy for "/services" — ported from lib/pages/services_page.dart.
// The service catalog itself is shared (see service-items.ts).
const deliveryWorkflow: FeatureItem[] = [
  {
    eyebrow: "Plan",
    title: "Set the commercial hierarchy before the visuals sprawl",
    description:
      "The first move is deciding what buyers need first, where proof belongs, and how navigation supports conversion.",
  },
  {
    eyebrow: "Systemize",
    title: "Turn recurring UI patterns into reusable components",
    description:
      "Reusable building blocks keep launches faster, cleaner, and more consistent across campaigns and product surfaces.",
  },
  {
    eyebrow: "Launch",
    title: "Ship a structure that can support future campaigns and product work",
    description:
      "The architecture is built so new campaigns, releases, and proof points do not require a redesign.",
  },
];

export const servicesContent = {
  seo: {
    title: "Services | VoltService",
    description:
      "Explore VoltService services across SaaS marketing websites, product experiences, payment workflows, platform APIs, and launch optimization.",
    path: "/services",
  },
  header: {
    eyebrow: "Services",
    title: "A clear delivery stack for modern SaaS, fintech, and platform marketing.",
    description:
      "Services are organized around growth surfaces, product interaction, payments, architecture, and launch iteration. Each one supports the same commercial system.",
  },
  deliverySection: {
    eyebrow: "Delivery model",
    title: "The delivery model is built to scale without diluting clarity.",
    description:
      "The system can expand into campaigns, demos, and technical proof while keeping the message focused.",
  },
  deliveryWorkflow,
  cta: {
    title: "Need a scoped delivery plan across marketing, product, and platform surfaces?",
    description: "Use Contact to define scope, priorities, and the flows that need to move first.",
    primaryLabel: "Start a Project",
    primaryHref: "/contact",
    secondaryLabel: "See Technology",
    secondaryHref: "/technology",
  },
} as const;
