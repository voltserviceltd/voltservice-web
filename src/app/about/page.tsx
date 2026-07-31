import type { Metadata } from "next";
import { PageSection } from "@/components/primitives/page-section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Card } from "@/components/primitives/card";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { CTASection } from "@/components/marketing/cta-section";
import { aboutContent } from "@/lib/content/service/about-content";
import { aboutPrinciples } from "@/lib/content/service/about-principles";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata(aboutContent.seo);

export default function AboutPage() {
  return (
    <>
      <PageSection>
        <SectionHeader {...aboutContent.header} />
        <div className="mt-8">
          <FeatureGrid items={aboutPrinciples} />
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-6 sm:grid-cols-3">
          {aboutContent.operatingModel.map((point) => (
            <Card key={point}>
              <p className="text-lg font-medium text-text-primary">{point}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <CTASection {...aboutContent.cta} />
      </PageSection>
    </>
  );
}
