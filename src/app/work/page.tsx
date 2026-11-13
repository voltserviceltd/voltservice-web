import type { Metadata } from "next";

import { StudioWorkPage } from "@/features/studio/components/work/studio-work-page";

export const metadata: Metadata = {
  title: "Our work",
  description: "PaySmart and VoltConnects: products designed, built and run by VoltService.",
  alternates: { canonical: "/work/" },
};

export default function Page() {
  return <StudioWorkPage />;
}
