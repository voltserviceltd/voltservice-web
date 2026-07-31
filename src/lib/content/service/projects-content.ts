import type { FeatureItem } from "@/lib/content/domain/feature-item";

// Page-specific copy for "/projects" — ported from lib/pages/projects_page.dart.
// The project list itself is shared (see project-items.ts).
const projectSignals: FeatureItem[] = [
  {
    eyebrow: "Proof",
    title: "Projects explain outcomes, not just deliverables",
    description:
      "Each case ties visual work back to launch structure, operational clarity, or product communication.",
  },
  {
    eyebrow: "Systems",
    title: "Design and engineering stay tied together",
    description:
      "Positioning, interaction, and proof are all treated as pieces of the same delivery system.",
  },
  {
    eyebrow: "Momentum",
    title: "Every featured project should make the next step obvious",
    description:
      "Once the work earns trust, the next step toward solutions, technology, or contact should feel immediate.",
  },
];

export const projectsContent = {
  seo: {
    title: "Projects | VoltService",
    description:
      "Review selected VoltService projects across fintech growth systems, product storytelling, and operational interface design.",
    path: "/projects",
  },
  header: {
    eyebrow: "Projects",
    title: "Selected work that proves the structure, not just the styling.",
    description:
      "Selected work shows how product direction, execution, and launch readiness connect in real delivery.",
  },
  signalsSection: {
    eyebrow: "Why it matters",
    title: "Proof works best when it sharpens trust instead of adding noise.",
    description: "Strong case studies answer the hard questions buyers ask before they reach out.",
  },
  projectSignals,
  cta: {
    title: "Need stronger proof and cleaner structure around a relaunch or product offer?",
    description:
      "Define the proof points, demos, and commercial priorities that support your specific sales motion.",
    primaryLabel: "Start a Project",
    primaryHref: "/contact",
    secondaryLabel: "Explore Solutions",
    secondaryHref: "/solutions",
  },
} as const;
