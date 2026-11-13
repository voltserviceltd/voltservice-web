import type { Metadata } from "next";
import { PageSection } from "@/components/primitives/page-section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Tag } from "@/components/primitives/tag";
import { TextLink } from "@/components/primitives/text-link";
import { reveal } from "@/components/primitives/reveal";
import { CTASection } from "@/components/marketing/cta-section";
import { FounderCard } from "@/components/marketing/founder-card";
import { aboutContent } from "@/lib/content/service/about-content";
import { companyContent } from "@/lib/content/service/company-content";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata(aboutContent.seo);

const companyDetails = [
  ["Company name", companyContent.legalName],
  ["Company number", companyContent.companyNumber],
  ["Registered in", companyContent.jurisdiction],
  ["Registered office", companyContent.registeredOffice],
  ["Email", companyContent.email],
] as const;

export default function AboutPage() {
  return (
    <>
      <PageSection>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)]">
          <div className="flex max-w-2xl flex-col items-start gap-4">
            <Tag tone="volt">{aboutContent.header.eyebrow}</Tag>
            <h1 className="font-display text-[clamp(2.75rem,1.9rem+3.5vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-text-primary">
              {aboutContent.header.title}
            </h1>
            <p className="text-lg leading-relaxed text-text-muted md:text-xl">
              {aboutContent.header.description}
            </p>
            <p className="text-lg leading-relaxed text-text-muted md:text-xl">
              {aboutContent.header.secondaryDescription}
            </p>
          </div>

          <FounderCard />
        </div>
      </PageSection>

      <PageSection subtle bordered>
        <SectionHeader
          eyebrow="Company details"
          eyebrowTone="ink"
          title="A registered UK company."
          description="The details you'd expect from a company you're about to work with."
        />
        <dl
          className="mt-12 overflow-hidden rounded-3xl border-2 border-line bg-surface shadow-hard"
          {...reveal(0)}
        >
          {companyDetails.map(([term, value]) => (
            <div
              key={term}
              className="grid gap-1 border-line px-6 py-4 not-first:border-t-[1.5px] sm:grid-cols-[minmax(10rem,16rem)_1fr] sm:gap-4"
            >
              <dt className="pt-0.5 font-mono text-[0.8125rem] font-medium tracking-[0.08em] text-text-muted uppercase">
                {term}
              </dt>
              <dd className="font-semibold break-words text-text-primary">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8">
          <TextLink href={companyContent.companiesHouseUrl}>Check our Companies House record</TextLink>
        </p>
      </PageSection>

      <PageSection>
        <CTASection {...aboutContent.cta} />
      </PageSection>
    </>
  );
}
