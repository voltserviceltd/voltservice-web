import type { Metadata } from "next";
import { PageSection } from "@/components/primitives/page-section";
import { SectionHeader } from "@/components/primitives/section-header";
import { ServiceCard } from "@/components/marketing/service-card";
import { ProcessSteps } from "@/components/marketing/process-steps";
import { CTASection } from "@/components/marketing/cta-section";
import { servicesContent } from "@/lib/content/service/services-content";
import { serviceItems } from "@/lib/content/service/service-items";
import { approachSteps } from "@/lib/content/service/approach-steps";
import { homeContent } from "@/lib/content/service/home-content";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata(servicesContent.seo);

export default function ServicesPage() {
  return (
    <>
      <PageSection>
        <SectionHeader {...servicesContent.header} eyebrowTone="coral" as="h1" />
      </PageSection>

      <PageSection flushTop>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceItems.map((item, index) => (
            <ServiceCard key={item.title} item={item} index={index % 3} />
          ))}
        </div>
      </PageSection>

      <PageSection subtle bordered>
        <SectionHeader {...homeContent.approachSection} eyebrowTone="mint" />
        <div className="mt-12">
          <ProcessSteps steps={approachSteps} />
        </div>
      </PageSection>

      <PageSection>
        <CTASection {...servicesContent.cta} />
      </PageSection>
    </>
  );
}
