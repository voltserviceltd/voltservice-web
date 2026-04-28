import { siteConfig } from "@/shared/config/site";
import { 
  CapabilityItem, 
  NavItem, 
  PortfolioItem, 
  PrincipleItem, 
  ProcessStep, 
  ProofItem 
} from "./features.type";



export const navigation: NavItem[] = [
  { label: "Work", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

export const signals = [
  "Product studio behind BuildersHub, PaySmart, and VoltPay.",
  "React and Next.js for the public face. Clean engineering underneath.",
  "Testing, QA, and platform thinking included from the first release.",
] as const;

export const proofItems: ProofItem[] = [
  {
    label: "Public posture",
    value: "A clearer studio story shaped around products, not filler.",
  },
  {
    label: "Framework baseline",
    value: "Next.js App Router and React for a more standard, extensible web stack.",
  },
  {
    label: "Delivery discipline",
    value: "Linting, type checks, and test suites included with the redesign.",
  },
];

export const portfolio: PortfolioItem[] = [
  {
    name: "BuildersHub",
    category: "Founder collaboration product",
    summary:
      "A collaboration platform for solo founders and developers who need aligned teammates, not more noise.",
    detail:
      "The product discipline behind BuildersHub is the model for how Voltservice structures delivery work: clear boundaries, visible proof of work, and a path from MVP to repeatable growth.",
    image: "/brand/buildershub-card.png",
    imageAlt: "BuildersHub product card artwork.",
  },
  {
    name: "PaySmart",
    category: "Security-first payments product",
    summary:
      "Trusted onboarding, policy-driven access, secure identity verification, and FX-ready transfer flows.",
    detail:
      "PaySmart reflects the kind of regulated-product thinking Voltservice brings to high-trust systems: security, clarity, and operational reliability before polish-only delivery.",
    image: "/brand/partner-image.png",
    imageAlt: "Illustration of a software delivery partnership.",
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
    title: "Next.js redesigns with product substance",
    summary:
      "Sharper company sites and web experiences built on React and Next.js, with content, structure, and performance treated as product work.",
  },
  {
    title: "Product delivery for lean teams",
    summary:
      "Focused engineering and design support for teams that need a working partner, not a large delivery layer between ideas and execution.",
  },
  {
    title: "Backend and cloud systems",
    summary:
      "APIs, background jobs, platform integrations, and cloud-backed workflows designed for reliability, security, and operational clarity.",
  },
  {
    title: "Testing and release confidence",
    summary:
      "Unit, component, and integration-oriented thinking built into the workflow so public-facing changes can ship without guesswork.",
  },
];

export const principles: PrincipleItem[] = [
  {
    title: "Architecture before acceleration",
    summary:
      "The public site can look modern without becoming a pile of tightly coupled decisions that break under the next change request.",
  },
  {
    title: "Feature boundaries that stay readable",
    summary:
      "Routing, content, features, and shared UI stay separate so future product pages or case studies can grow without a rewrite.",
  },
  {
    title: "Small scopes, real release slices",
    summary:
      "Delivery stays incremental. Each change should be inspectable, testable, and safe to evolve.",
  },
  {
    title: "Testing as a first-class product task",
    summary:
      "Tests are not cleanup work. They protect the story, the UI, and the repo discipline that make the site maintainable.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Clarify what the company should signal",
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

export const contactDetails = {
  email: siteConfig.contactEmail,
  domain: siteConfig.domain,
  strapline: siteConfig.strapline,
};
