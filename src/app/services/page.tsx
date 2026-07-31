import type { Metadata } from "next";
import { PageSection } from "@/components/primitives/page-section";
import { SectionHeader } from "@/components/primitives/section-header";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { ServiceCard } from "@/components/marketing/service-card";
import { CTASection } from "@/components/marketing/cta-section";
import { servicesContent } from "@/lib/content/service/services-content";
import { serviceItems } from "@/lib/content/service/service-items";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata(servicesContent.seo);

export default function ServicesPage() {
  return (
    <>
      <PageSection>
        <SectionHeader {...servicesContent.header} />
      </PageSection>

      <PageSection subtle>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceItems.map((item) => (
            <ServiceCard key={item.title} item={item} />
          ))}
        </div>
      </PageSection>

      <PageSection>
        <SectionHeader {...servicesContent.deliverySection} />
        <div className="mt-8">
          <FeatureGrid items={servicesContent.deliveryWorkflow} />
        </div>
      </PageSection>

      <PageSection>
        <CTASection {...servicesContent.cta} />
      </PageSection>
    </>
  );
}
