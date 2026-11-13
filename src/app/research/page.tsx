import type { Metadata } from "next";

import { StudioResearchPage } from "@/features/studio/components/research/studio-research-page";

export const metadata: Metadata = {
  title: "Contractor research",
  description: "Why VoltService is talking to small contractors about subcontractor insurance and RAMS, and what happens to your details.",
  alternates: { canonical: "/research/" },
};

export default function Page() {
  return <StudioResearchPage />;
}
