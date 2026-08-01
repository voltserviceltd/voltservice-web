import type { Metadata } from "next";
import { PageSection } from "@/components/primitives/page-section";
import { CTASection } from "@/components/marketing/cta-section";
import { FounderCard } from "@/components/marketing/founder-card";
import { aboutContent } from "@/lib/content/service/about-content";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata(aboutContent.seo);

export default function AboutPage() {
  return (
    <>
      <PageSection>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-primary">
              {aboutContent.header.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
              {aboutContent.header.title}
            </h2>
            <p className="mt-3 text-lg text-text-muted">{aboutContent.header.description}</p>
            <p className="mt-3 text-lg text-text-muted">
              {aboutContent.header.secondaryDescription}
            </p>
          </div>

          <FounderCard />
        </div>
      </PageSection>

      <PageSection>
        <CTASection {...aboutContent.cta} />
      </PageSection>
    </>
  );
}
