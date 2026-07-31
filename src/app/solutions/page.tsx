import type { Metadata } from "next";
import { PageSection } from "@/components/primitives/page-section";
import { SectionHeader } from "@/components/primitives/section-header";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { ProductPreview } from "@/components/marketing/product-preview";
import { CTASection } from "@/components/marketing/cta-section";
import { solutionsContent } from "@/lib/content/service/solutions-content";
import { solutionFeatures } from "@/lib/content/service/solution-features";
import { demoScenarios } from "@/lib/content/service/demo-scenarios";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata(solutionsContent.seo);

export default function SolutionsPage() {
  return (
    <>
      <PageSection>
        <SectionHeader {...solutionsContent.header} />
        <div className="mt-8">
          <FeatureGrid items={solutionFeatures} />
        </div>
      </PageSection>

      {demoScenarios.slice(0, 3).map((scenario) => (
        <PageSection key={scenario.title}>
          <ProductPreview scenario={scenario} />
        </PageSection>
      ))}

      <PageSection>
        <CTASection {...solutionsContent.cta} />
      </PageSection>
    </>
  );
}
