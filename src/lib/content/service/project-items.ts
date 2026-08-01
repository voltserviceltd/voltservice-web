import type { ProjectItem } from "@/lib/content/domain/project-item";

// Shared by the Home (top 2) and Work (all) pages.
// Framed per the product-mentioning rules: each entry is presented as an
// example of VoltService's work, not as the company's core identity.
export const projectItems: ProjectItem[] = [
  {
    eyebrow: "Example of our work",
    title: "PaySmart",
    description:
      "A VoltService-built system for merchant payments, covering onboarding, transaction visibility, and day-to-day account management. This project demonstrates our work in operations, payments, and customer-facing product design.",
    metrics: ["Merchant onboarding", "Payment tracking", "Live on Google Play"],
    tags: ["Business application", "Digital systems", "Product development"],
  },
  {
    eyebrow: "Example of our work",
    title: "VoltConnect",
    description:
      "A VoltService-built connection and collaboration application for individuals and teams, designed, built, and supported end-to-end. This project demonstrates our work in mobile product delivery and ongoing support.",
    metrics: ["Live on the App Store", "Supported in production"],
    tags: ["Mobile application", "Product development", "Support and improvement"],
  },
];
