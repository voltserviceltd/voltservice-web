// Copy for the homepage "Right now" strip and the /research page. Backs up the
// contractor research emails: research only, no pitch, no prices.
export const researchContent = {
  seo: {
    title: "Contractor research | VoltService",
    description:
      "Why VoltService is talking to small contractors about how they collect insurance and RAMS from subcontractors, and what happens to your details.",
    path: "/research",
  },
  strip: {
    eyebrow: "What we're working on now",
    title: "Listening to small contractors.",
    description:
      "We're talking to fit-out and building firms about how they collect insurance and RAMS from subcontractors before a job starts. There's no pitch — we're learning. If that's your world, we'd value 20 minutes of your experience.",
    actionLabel: "Share how you do it",
    actionHref: "/research",
  },
  header: {
    eyebrow: "Contractor research",
    title: "Listening to small contractors.",
    description:
      "If we emailed you about subcontractor paperwork, here's what we're doing, what we'd ask and what happens to your details.",
  },
  replySubject: "Contractor research: happy to talk",
  optOutSubject: "No thanks: please remove me",
} as const;
