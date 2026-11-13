/**
 * Retention and contact rules used by the privacy notice and /research.
 * OWNER TO CONFIRM before merge — merging to main deploys to production.
 * These are proposals, chosen to be short and easy to honour.
 */
export const legalPolicy = {
  lastUpdated: "13 November 2026",
  enquiryRetention: "24 months after our last contact, unless the enquiry leads to a contract",
  contractRetention: "6 years after the contract ends, to meet UK tax and accounting rules",
  researchRetention: "12 months after our last contact",
  researchFollowUps: "one first email and, at most, one follow-up about a week later",
} as const;
