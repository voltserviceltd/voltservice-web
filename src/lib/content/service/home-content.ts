// Page-specific copy for "/". Shared cross-page facts (services, work) live in their own files.
export const homeContent = {
  seo: {
    title: "VoltService Ltd | Software services built around your business",
    description:
      "VoltService Ltd designs and develops reliable websites, applications, and digital systems that help businesses improve operations, serve customers, and grow with confidence.",
    path: "/",
  },
  hero: {
    title: "Software services built around your business.",
    subtitle:
      "VoltService Ltd designs and develops reliable websites, applications, and digital systems that help businesses improve operations, serve customers, and grow with confidence.",
    primaryLabel: "Start a project",
    primaryHref: "/contact",
    secondaryLabel: "View our work",
    secondaryHref: "/work",
    badges: ["Business websites", "Web applications", "Digital systems", "Ongoing support"],
  },
  valueSection: {
    eyebrow: "Why VoltService",
    title: "A practical software partner for growing businesses.",
    description:
      "VoltService works with businesses that need more than a template website or off-the-shelf tool. We help define the problem, design the right solution, build reliable software, and support it as the business changes.",
  },
  servicesSection: {
    eyebrow: "Key services",
    title: "Services that support real business operations.",
    description:
      "VoltService provides software services across the full delivery cycle, from planning and design through development, deployment, and improvement.",
    actionLabel: "View All Services",
    actionHref: "/services",
  },
  workSection: {
    eyebrow: "Featured work",
    title: "Examples of systems built by VoltService.",
    description:
      "These are examples of the kind of digital systems VoltService can design and develop for businesses with similar needs.",
    actionLabel: "View Our Work",
    actionHref: "/work",
  },
  approachSection: {
    eyebrow: "How we work",
    title: "How we work.",
    description:
      "Good software starts with understanding the business. VoltService focuses on practical discovery, clear delivery, and maintainable systems.",
  },
  reliabilitySection: {
    eyebrow: "Reliability",
    title: "Built to be useful beyond launch.",
    description:
      "VoltService focuses on software that businesses can depend on. That means clear structure, maintainable implementation, sensible technology choices, and support for future improvement.",
    bullets: [
      "Clear project scope and communication.",
      "Practical technical decisions based on the business need.",
      "Maintainable code and systems that can grow over time.",
      "Support for launch, fixes, and future improvements.",
      "A focus on software that helps people do real work.",
    ],
  },
  whoWeHelpSection: {
    eyebrow: "Who we help",
    title: "Who we work with.",
    description:
      "VoltService works with businesses that need reliable digital capability, whether that means a better website, a custom application, an internal system, or support improving existing software.",
    bullets: [
      "Small and growing businesses that need a stronger digital presence.",
      "Service businesses that need better customer journeys and enquiry flows.",
      "Teams relying on manual processes that could be simplified through software.",
      "Organisations that need internal tools, dashboards, or workflow systems.",
      "Founders and operators building new digital products.",
    ],
  },
  cta: {
    title: "Have a website, application, or system to build?",
    description:
      "Tell us what you are trying to improve. VoltService can help shape the idea, plan the right solution, and build software that supports your business properly.",
    primaryLabel: "Start a conversation",
    primaryHref: "/contact",
    secondaryLabel: "View work examples",
    secondaryHref: "/work",
  },
} as const;
