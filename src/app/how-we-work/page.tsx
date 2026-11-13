import type { Metadata } from "next";

import { StudioHowWeWorkPage } from "@/features/studio/components/how-we-work/studio-how-we-work-page";

export const metadata: Metadata = {
  title: "How we work",
  description: "Listen, shape, build, look after: four steps with a written scope and fixed price before any code is written.",
  alternates: { canonical: "/how-we-work/" },
};

export default function Page() {
  return <StudioHowWeWorkPage />;
}
