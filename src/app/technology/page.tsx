import type { Metadata } from "next";
import { PageSection } from "@/components/primitives/page-section";
import { SectionHeader } from "@/components/primitives/section-header";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { ProductPreview } from "@/components/marketing/product-preview";
import { CTASection } from "@/components/marketing/cta-section";
import { technologyContent } from "@/lib/content/service/technology-content";
import { technologyFeatures } from "@/lib/content/service/technology-features";
import { demoScenarios } from "@/lib/content/service/demo-scenarios";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata(technologyContent.seo);

export default function TechnologyPage() {
  const apiScenario = demoScenarios[demoScenarios.length - 1];

  return (
    <>
      <PageSection>
        <SectionHeader {...technologyContent.header} />
        <div className="mt-8">
          <FeatureGrid items={technologyFeatures} />
        </div>
      </PageSection>

      <PageSection>
        <ProductPreview scenario={apiScenario} />
      </PageSection>

      <PageSection>
        <CTASection {...technologyContent.cta} />
      </PageSection>
    </>
  );
}
