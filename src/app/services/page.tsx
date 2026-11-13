import type { Metadata } from "next";

import { StudioServicesPage } from "@/features/studio/components/services/studio-services-page";

export const metadata: Metadata = {
  title: "Services",
  description: "Websites, web and mobile apps, internal tools and ongoing support for UK businesses, delivered in fixed-price stages.",
  alternates: { canonical: "/services/" },
};

export default function Page() {
  return <StudioServicesPage />;
}
