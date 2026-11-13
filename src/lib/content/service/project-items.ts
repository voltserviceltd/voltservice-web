import type { StaticImageData } from "next/image";
import type { ProjectItem } from "@/lib/content/domain/project-item";
import paysmartHome from "@/assets/work/paysmart-home.png";
import paysmartInvoice from "@/assets/work/paysmart-invoice.png";
import paysmartSecurity from "@/assets/work/paysmart-security.png";

// Shared by the Home (top 2) and Work (all) pages.
// Framed per the product-mentioning rules: each entry is presented as an
// example of VoltService's work, not as the company's core identity.
export const projectItems: ProjectItem[] = [
  {
    eyebrow: "Example of our work",
    title: "PaySmart",
    description:
      "A VoltService-built invoicing app for shift workers and freelancers — nurses, door staff, zero-hours workers — to create, send and track invoices from their phone. This project demonstrates our work in onboarding, account security, and customer-facing product design.",
    metrics: ["Invoice templates for shift work", "Account security", "Live on Google Play"],
    tags: ["Business application", "Digital systems", "Product development"],
    status: "Live on Google Play",
    statusTone: "mint",
    url: "https://pay-smart.net",
    urlLabel: "Visit pay-smart.net",
    visual: "paysmart",
    screenshots: [
      { src: paysmartHome as StaticImageData, alt: "PaySmart home screen." },
      {
        src: paysmartInvoice as StaticImageData,
        alt: "PaySmart invoice setup, choosing a type of work such as nurse, door staff or freelancer.",
      },
      { src: paysmartSecurity as StaticImageData, alt: "PaySmart account security screen." },
    ],
  },
  {
    eyebrow: "Example of our work",
    title: "VoltConnect",
    description:
      "A VoltService-built connection and collaboration application for individuals and teams, designed, built, and supported end-to-end. This project demonstrates our work in mobile product delivery and ongoing support.",
    metrics: ["Live on the App Store", "Supported in production"],
    tags: ["Mobile application", "Product development", "Support and improvement"],
    status: "Live on the App Store",
    statusTone: "lilac",
    url: "https://voltconnects.io",
    urlLabel: "Visit voltconnects.io",
    visual: "voltconnect",
  },
];
