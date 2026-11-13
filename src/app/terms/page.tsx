import type { Metadata } from "next";

import { StudioTermsPage } from "@/features/studio/components/legal/studio-terms-page";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms for using the VoltService website.",
  alternates: { canonical: "/terms/" },
};

export default function Page() {
  return <StudioTermsPage />;
}
