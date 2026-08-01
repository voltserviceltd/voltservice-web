import type { ServiceItem } from "@/lib/content/domain/service-item";

// Shared by the Home (top 3) and Services (all) pages.
export const serviceItems: ServiceItem[] = [
  {
    title: "Business websites",
    description:
      "We design and build clear, reliable websites that explain what your business does, help customers take action, and give your company a stronger digital presence.",
    deliverables: [
      "Company websites",
      "Service pages and landing pages",
      "Booking and enquiry flows",
      "Content-managed pages",
      "Performance and accessibility improvements",
    ],
  },
  {
    title: "Web applications",
    description:
      "We build web applications that help businesses manage customers, data, content, workflows, and specialist processes.",
    deliverables: [
      "Customer portals",
      "Dashboards and reporting tools",
      "Booking systems",
      "Workflow applications",
      "Admin panels",
    ],
  },
  {
    title: "Digital systems",
    description:
      "We help businesses replace scattered spreadsheets, manual processes, and disconnected tools with systems that are easier to operate and maintain.",
    deliverables: [
      "Internal business tools",
      "Automation workflows",
      "Data capture systems",
      "Operational dashboards",
      "Role-based access systems",
    ],
  },
  {
    title: "Product development",
    description:
      "For teams building a digital product, VoltService can support planning, prototyping, development, release, and iteration.",
    deliverables: [
      "MVP planning",
      "Prototype development",
      "Application development",
      "Feature delivery",
      "Technical roadmaps",
    ],
  },
  {
    title: "Support and improvement",
    description:
      "Software needs to stay useful after launch. We support existing websites and applications with fixes, improvements, maintenance, and technical guidance.",
    deliverables: [
      "Bug fixes",
      "Feature updates",
      "Performance improvements",
      "Hosting and deployment support",
      "Ongoing support retainers",
    ],
  },
];
