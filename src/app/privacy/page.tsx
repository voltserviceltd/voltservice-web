import type { Metadata } from "next";

import { StudioPrivacyPage } from "@/features/studio/components/legal/studio-privacy-page";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How VOLTSERVICE LTD collects, uses and protects personal data, including research contacts.",
  alternates: { canonical: "/privacy/" },
};

export default function Page() {
  return <StudioPrivacyPage />;
}
