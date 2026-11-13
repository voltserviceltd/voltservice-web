import type { Metadata } from "next";

import { StudioContactPage } from "@/features/studio/components/contact/studio-contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with VoltService. Tell us what's slowing you down and we'll reply with honest next steps.",
  alternates: { canonical: "/contact/" },
};

export default function Page() {
  return <StudioContactPage />;
}
