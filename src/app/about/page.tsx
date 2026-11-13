import type { Metadata } from "next";

import { StudioAboutPage } from "@/features/studio/components/about/studio-about-page";

export const metadata: Metadata = {
  title: "About",
  description: "VoltService is a founder-led software studio, VOLTSERVICE LTD, registered in England and Wales (company number 16613560). Meet the founder, Babatunde Kalejaiye.",
  alternates: { canonical: "/about/" },
};

export default function Page() {
  return <StudioAboutPage />;
}
