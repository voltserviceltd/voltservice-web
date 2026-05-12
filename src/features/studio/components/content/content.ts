import { siteConfig } from "@/shared/config/site";
import {
  CapabilityItem,
  FounderProfile,
  NavItem,
  PortfolioItem,
  PrincipleItem,
  ProcessStep,
  ProofItem
} from "../../features.type";



export const navigation: NavItem[] = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Approach", href: "/approach" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const signals = [
  "PaySmart is live on Playstore.",
  "Fintech onboarding, security, invoices, and account flows.",
  "Real shipped product work, presented clearly.",
] as const;

export const proofItems: ProofItem[] = [
  {
    label: "Featured product",
    value: "PaySmart, a live fintech app by Voltservice.",
  },
  {
    label: "Product depth",
    value: "Identity, payments, invoices, notifications, and trust flows.",
  },
  {
    label: "Studio signal",
    value: "A site built around proof of work, not generic claims.",
  },
];

export const portfolio: PortfolioItem[] = [
  {
    name: "PaySmart",
    category: "Live fintech product",
    summary:
      "A Playstore fintech app for secure accounts, invoices, identity, and payments.",
    detail:
      "Voltservice shaped the product around trust: onboarding, account security, invoice setup, address checks, and practical money flows.",
    image: "/brand/paysmart/home.png",
    imageAlt: "PaySmart mobile app home screen.",
  },
  {
    name: "BuildersHub",
    category: "Founder collaboration product",
    summary:
      "A collaboration platform for solo founders and developers who need aligned teammates, not more noise.",
    detail:
      "The product discipline behind BuildersHub is the model for how Voltservice structures delivery work: clear boundaries, visible proof of work, and a path from MVP to repeatable growth.",
    image: "/brand/projectlist.png",
    imageAlt: "BuildersHub project list screen.",
    screenshots: [
      {
        image: "/brand/projectlist.png",
        imageAlt: "BuildersHub project list screen.",
      },
      {
        image: "/brand/collaborate.png",
        imageAlt: "BuildersHub collaboration screen.",
      },
      {
        image: "/brand/inbox.png",
        imageAlt: "BuildersHub inbox screen.",
      },
      {
        image: "/brand/connect.png",
        imageAlt: "BuildersHub connect feature icon.",
      },
    ],
  },
  {
    name: "VoltPay",
    category: "Payments experience concept",
    summary:
      "Fast, secure, borderless payment flows with a cleaner user journey and strong trust signals.",
    detail:
      "VoltPay shows how the studio combines interaction design, product framing, and engineering constraints to make complex flows feel simpler to customers.",
    image: "/brand/voltpay.png",
    imageAlt: "VoltPay payment experience screens.",
  },
];

export const capabilities: CapabilityItem[] = [
  {
    title: "Product websites with proof",
    summary:
      "Studio sites and case studies that show shipped products, screenshots, and credible delivery detail.",
  },
  {
    title: "Fintech and trust flows",
    summary:
      "Account setup, verification, payments, invoices, notifications, and user journeys that need clarity.",
  },
  {
    title: "Web, mobile, and cloud systems",
    summary:
      "React, Next.js, app product thinking, APIs, and cloud-backed workflows built as one product surface.",
  },
  {
    title: "Release confidence",
    summary:
      "Code structure, testing, review, and QA discipline treated as part of delivery.",
  },
];

export const principles: PrincipleItem[] = [
  {
    title: "Architecture before acceleration",
    summary:
      "Modern product surfaces stay useful when the underlying structure is clear, typed, and easy to extend.",
  },
  {
    title: "Feature boundaries that stay readable",
    summary:
      "Routing, content, features, and shared UI stay separate so future product pages or case studies can grow without a rewrite.",
  },
  {
    title: "Small scopes, real release slices",
    summary:
      "Delivery stays incremental, inspectable, and easy to evolve.",
  },
  {
    title: "Testing as a first-class product task",
    summary:
      "Quality checks protect the story, the interface, and the delivery discipline behind the work.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Clarify the company signal",
    summary:
      "Identify the product truth, the audience, and the proof points worth showing before touching the UI surface.",
  },
  {
    title: "Shape the public face around proof",
    summary:
      "Rework content, navigation, and hierarchy so the company reads as a product studio with clear capability, not generic services copy.",
  },
  {
    title: "Build the platform surface cleanly",
    summary:
      "Use a stable Next.js structure, shared primitives, and typed content so the site remains easy to extend.",
  },
  {
    title: "Keep release discipline visible",
    summary:
      "Ship with linting, type-checking, and clean test suites so design work does not lower the engineering bar.",
  },
];

export const founderProfile: FounderProfile = {
  eyebrow: "About",
  title: "Founder-led product work.",
  name: "Voltservice Founder",
  role: "Founder and product builder, VOLTSERVICE LTD",
  summary:
    "Hands-on product direction and engineering delivery for public product sites, fintech flows, and high-trust web systems.",
  details: [
    "Product strategy, interface structure, and build decisions kept close together.",
    "Experience across fintech journeys, app surfaces, cloud-backed workflows, and product launches.",
    "Direct project conversations for teams that need a sharper public product presence.",
  ],
};

export const contactDetails = {
  email: siteConfig.contactEmail,
  domain: siteConfig.domain,
  strapline: siteConfig.strapline,
};
