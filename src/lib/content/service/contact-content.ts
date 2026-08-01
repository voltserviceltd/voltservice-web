// Page-specific copy for "/contact". Direct-email approach — no submission
// form, API route, or third-party mail provider yet (see doc/companywebsite.md,
// "Current Contact Approach"). Revisit only when the upgrade triggers there are met.
export const contactContent = {
  seo: {
    title: "Contact | VoltService",
    description:
      "Email VoltService directly to start a project — a new website, application, digital system, or support for existing software.",
    path: "/contact",
  },
  header: {
    eyebrow: "Contact",
    title: "Start a project with VoltService.",
    description:
      "Whether you need a new website, a custom application, an internal system, or support improving existing software, we can help you understand the best next step.",
  },
  email: "voltservice@metalbrain.net",
  mailtoSubject: "Project enquiry for VoltService",
  introLine:
    "Email VoltService directly with a short outline of what you need built, improved, or supported.",
  fallbackLine: "If your email app doesn't open automatically, copy the address above.",
  ctaLabel: "Email VoltService",
  prompts: [
    "What kind of software do you need help with?",
    "What business problem are you trying to solve?",
    "Is this a new build, an improvement, or support for an existing system?",
    "What is the best way to reply?",
  ],
} as const;
