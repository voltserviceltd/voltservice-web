import {
  Building2,
  Code,
  LifeBuoy,
  Monitor,
  Plug,
  Rocket,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import { siteConfig } from "@/shared/config/site";

import type {
  CompanyFact,
  FooterGroup,
  FounderProfile,
  NavItem,
  ProcessStep,
  ProductItem,
  ServiceItem,
} from "../../features.type";

export const navigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "How we work", href: "/how-we-work" },
  { label: "About", href: "/about" },
];

export const contactHref = "/contact" as const;
export const mailtoHref = `mailto:${siteConfig.contactEmail}`;

export const heroTrustPoints = [
  "Clear quote before any work",
  "You talk to the person building it",
  "Support after launch",
] as const;

export const marqueeItems = [
  "Websites",
  "Web apps",
  "Mobile apps",
  "Internal tools",
  "Integrations",
  "Ongoing support",
] as const;

export const services: ServiceItem[] = [
  {
    slug: "websites",
    title: "Websites that bring in enquiries",
    summary: "Clear, fast sites that explain what you do and make it easy to get in touch.",
    points: ["Design, copy and build", "Mobile-first and fast", "Easy for you to update"],
    examples: [
      "A new company website, or a rebuild of one that no longer reflects the business",
      "Service and location pages that answer what customers actually search for",
      "Enquiry and quote forms that land in your inbox with the details you need",
    ],
    color: "volt",
    icon: Monitor,
  },
  {
    slug: "apps",
    title: "Web & mobile apps",
    summary: "Customer portals, booking flows and apps your customers actually enjoy using.",
    points: ["React, Next.js, React Native", "Accounts, payments, uploads", "Built to grow with you"],
    examples: [
      "Customer portals where clients log in, upload documents and track progress",
      "Booking and scheduling flows",
      "Android and iOS apps, from a first version to a store release",
    ],
    color: "coral",
    icon: Smartphone,
  },
  {
    slug: "internal-tools",
    title: "Internal tools & integrations",
    summary: "Replace the spreadsheet-and-email shuffle with one tool your team trusts.",
    points: ["Connect the tools you use", "Automate the chasing", "Reports you can rely on"],
    examples: [
      "Trackers that replace shared spreadsheets and long email threads",
      "Automatic reminders for things people forget to send",
      "Connections between the systems you already pay for",
    ],
    color: "blue",
    icon: Plug,
  },
  {
    slug: "support",
    title: "Support & care",
    summary: "Hosting, fixes, updates and small improvements — after launch, not just until it.",
    points: ["Hosting and monitoring", "Security updates & backups", "Small improvements as you grow"],
    examples: [
      "Looking after software we built, or taking over something someone else built",
      "Security patches, backups and uptime monitoring",
      "A steady stream of small improvements instead of one big rebuild",
    ],
    color: "mint",
    icon: LifeBuoy,
  },
];

export const products: ProductItem[] = [
  {
    name: "PaySmart",
    status: "Live on Google Play",
    statusTone: "mint",
    summary:
      "Invoicing for shift workers and freelancers — nurses, door staff, zero-hours workers — so they can create, send and track invoices from their phone.",
    detail:
      "Designed, built and run by us: onboarding, account security, invoice templates for different kinds of shift work, and the day-to-day support that comes with a live app.",
    url: "https://pay-smart.net",
    urlLabel: "Visit pay-smart.net",
    stack: ["Android", "Fintech", "Invoicing"],
    visual: "paysmart",
    screenshots: [
      { image: "/brand/paysmart/web/home.png", imageAlt: "PaySmart home screen." },
      {
        image: "/brand/paysmart/web/invoice.png",
        imageAlt: "PaySmart invoice setup, choosing a work type such as nurse, door staff or freelancer.",
      },
      { image: "/brand/paysmart/web/security.png", imageAlt: "PaySmart account security screen." },
    ],
  },
  {
    name: "VoltConnects",
    status: "In development",
    statusTone: "lilac",
    summary:
      "A place for builders and trades to form groups, share projects and collaborate — from first message to finished job.",
    detail:
      "Our second product, currently in development. Follow progress at voltconnects.io.",
    url: "https://voltconnects.io",
    urlLabel: "Visit voltconnects.io",
    stack: ["Web", "Groups", "Collaboration"],
    visual: "voltconnects",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Listen",
    summary: "A short call about how things work today — the messy version, not the tidy one.",
    detail:
      "We ask about the last time the process went wrong, who was involved and what it cost you in time. No pitch, and no obligation.",
    color: "coral",
  },
  {
    number: "02",
    title: "Shape",
    summary: "A written scope, a fixed price and a plan you can say yes or no to. No obligation.",
    detail:
      "You get a plain-English document: what we'll build, what we won't, the price for each stage and when you'll see it working.",
    color: "volt",
  },
  {
    number: "03",
    title: "Build",
    summary: "Weekly demos on a real link, so you see progress and steer it as we go.",
    detail:
      "Every week you can click through the latest version. If something isn't right, we change course early, not at the end.",
    color: "lilac",
  },
  {
    number: "04",
    title: "Look after",
    summary: "Launch, then hosting, fixes and improvements — with the same people who built it.",
    detail:
      "After launch we keep it secure, backed up and running, and make small improvements as your business changes.",
    color: "mint",
  },
];

export const founderProfile: FounderProfile = {
  name: "Babatunde Kalejaiye",
  role: "Founder & Software Engineer",
  summary:
    "The person you speak to on the first call is the person who scopes, designs and writes your software — no account managers, no hand-offs.",
  bio: [
    "VOLTSERVICE LTD is a software services company focused on practical digital delivery. We design, build and support websites, applications and business systems that help organisations run more smoothly.",
    "Clients work directly with the person responsible for shaping and delivering their software, which means clearer communication, real accountability, and software that stays maintainable after launch.",
  ],
  image: "/brand/founder-babatunde-kalejaiye.jpg",
  imageAlt: "Babatunde Kalejaiye, founder of VOLTSERVICE LTD, in a blue suit.",
  imageWidth: 1000,
  imageHeight: 1272,
  linkedinUrl: "https://www.linkedin.com/in/babatunde-kalejaiye-729248125/",
};

export const companyFacts: CompanyFact[] = [
  {
    text: `${siteConfig.legal.name} — registered in ${siteConfig.legal.jurisdiction}, company number ${siteConfig.legal.companyNumber}`,
    icon: Building2,
    color: "mint",
  },
  { text: "Products in the wild: PaySmart and VoltConnects", icon: Rocket, color: "coral" },
  { text: "React, Next.js, Ruby on Rails, Google Cloud and AWS", icon: Code, color: "blue" },
  {
    text: "Security and accessibility (WCAG 2.2 AA) built in from day one",
    icon: ShieldCheck,
    color: "volt",
  },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "Company",
    links: [
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "How we work", href: "/how-we-work" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: siteConfig.contactEmail, href: mailtoHref },
      { label: "Start a project", href: "/contact" },
      { label: "Contractor research", href: "/research" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy notice", href: "/privacy" },
      { label: "Terms of use", href: "/terms" },
      { label: "Companies House record", href: siteConfig.legal.companiesHouseUrl },
    ],
  },
];

export const contactDetails = {
  email: siteConfig.contactEmail,
  domain: siteConfig.domain,
};
