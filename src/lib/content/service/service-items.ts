import type { ServiceItem } from "@/lib/content/domain/service-item";

// Ported from the Flutter site's marketing_content.dart (serviceItems).
// Shared by the Home (top 3) and Services (all) pages.
export const serviceItems: ServiceItem[] = [
  {
    title: "Marketing and conversion surfaces",
    description:
      "Structured SaaS websites, conversion pages, and launch surfaces that support product credibility and pipeline generation.",
    deliverables: [
      "Homepage and landing page systems",
      "Structured navigation and page hierarchy",
      "Conversion-focused content architecture",
    ],
  },
  {
    title: "Cross-platform product experiences",
    description:
      "Web and mobile products with shared components, consistent motion, and responsive product-grade interaction.",
    deliverables: [
      "Web marketing experiences",
      "Client and admin application UI systems",
      "Reusable component systems for future product modules",
    ],
  },
  {
    title: "Payment and merchant workflows",
    description:
      "Operational journeys for onboarding, transaction visibility, settlements, and finance-ready merchant interfaces.",
    deliverables: [
      "Payment flow orchestration",
      "Merchant onboarding states and tooling",
      "Risk and operations visibility patterns",
    ],
  },
  {
    title: "Platform architecture and APIs",
    description:
      "Backend contract design, integration surfaces, and delivery systems that keep web, mobile, and admin products coherent.",
    deliverables: [
      "API request and response models",
      "Platform integration strategies",
      "Observability and service boundary planning",
    ],
  },
  {
    title: "Android, Kotlin, and native systems",
    description:
      "Performance-sensitive client systems and native integrations for teams that need platform control beyond a pure web experience.",
    deliverables: [
      "Native Android feature delivery",
      "Kotlin integration design",
      "System bridge planning",
    ],
  },
  {
    title: "Launch optimization and iteration",
    description:
      "Measurement, release readiness, and follow-on improvements once the initial marketing or product surface is live.",
    deliverables: [
      "Launch checklists and QA",
      "Performance and UX refinement",
      "Roadmap-ready component systems",
    ],
  },
];
