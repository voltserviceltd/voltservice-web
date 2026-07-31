// Page-specific copy for "/" — ported from lib/pages/home_page.dart.
// Shared cross-page facts (services, projects) live in their own files.
export const homeContent = {
  seo: {
    title: "VoltService | SaaS Marketing Systems for Product and Platform Teams",
    description:
      "VoltService designs route-first SaaS websites, product demos, payment workflows, and scalable web experiences for fintech and software teams.",
    path: "/",
  },
  hero: {
    title: "A modern SaaS website that sells the product before the call.",
    subtitle:
      "VoltService turns company marketing into a structured demand engine with sharp positioning, premium interaction, and product-aware messaging that helps serious buyers understand the offer fast.",
    primaryLabel: "Start a Project",
    primaryHref: "/contact",
    secondaryLabel: "See Projects",
    secondaryHref: "/projects",
    badges: [
      "SaaS acquisition systems",
      "Payment workflow design",
      "Product surfaces",
      "SEO-aware routing",
    ],
  },
  valueSection: {
    eyebrow: "Value proposition",
    title: "Lead with one clear promise and move buyers toward the next step.",
    description:
      "Keep the message focused, show why it matters, and make the next action obvious.",
  },
  servicesSection: {
    eyebrow: "Key services",
    title: "Show the offer fast, then back it up with the right depth.",
    description:
      "Lead with the highest-value capabilities and make deeper detail available when buyers need it.",
    actionLabel: "View All Services",
    actionHref: "/services",
  },
  projectsSection: {
    eyebrow: "Featured projects",
    title: "Use proof points to move the reader toward deeper trust.",
    description:
      "Selected work should prove credibility quickly, with richer case-study detail available when buyers want more context.",
    actionLabel: "View Projects",
    actionHref: "/projects",
  },
  cta: {
    title: "Need marketing, product, and operations to feel like one system?",
    description:
      "Scope the demos, proof points, and conversion paths that match your product stage.",
    primaryLabel: "Start a Project",
    primaryHref: "/contact",
    secondaryLabel: "Explore Solutions",
    secondaryHref: "/solutions",
  },
} as const;
