import type { Metadata } from "next";
import { PageSection } from "@/components/primitives/page-section";
import { SectionHeader } from "@/components/primitives/section-header";
import { ButtonLink } from "@/components/primitives/button-link";
import { Marquee } from "@/components/primitives/marquee";
import { HeroSection } from "@/components/marketing/hero-section";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { ServiceCard } from "@/components/marketing/service-card";
import { ProjectCard } from "@/components/marketing/project-card";
import { ProcessSteps } from "@/components/marketing/process-steps";
import { ResearchStrip } from "@/components/marketing/research-strip";
import { ChecklistPanel } from "@/components/marketing/checklist-panel";
import { FounderBlock } from "@/components/marketing/founder-block";
import { CTASection } from "@/components/marketing/cta-section";
import { homeContent } from "@/lib/content/service/home-content";
import { homeValueFeatures } from "@/lib/content/service/home-value-features";
import { approachSteps } from "@/lib/content/service/approach-steps";
import { serviceItems } from "@/lib/content/service/service-items";
import { projectItems } from "@/lib/content/service/project-items";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata(homeContent.seo);

export default function HomePage() {
  const { reliabilitySection, whoWeHelpSection } = homeContent;

  return (
    <>
      <PageSection className="[&>div]:pt-12 md:[&>div]:pt-16">
        <HeroSection {...homeContent.hero} />
      </PageSection>

      <Marquee label={homeContent.marquee.label} items={homeContent.marquee.items} />

      <PageSection>
        <SectionHeader {...homeContent.valueSection} eyebrowTone="pink" />
        <div className="mt-12">
          <FeatureGrid items={homeValueFeatures} />
        </div>
      </PageSection>

      <PageSection subtle bordered>
        <SectionHeader
          eyebrow={homeContent.servicesSection.eyebrow}
          eyebrowTone="coral"
          title={homeContent.servicesSection.title}
          description={homeContent.servicesSection.description}
          action={
            <ButtonLink href={homeContent.servicesSection.actionHref} variant="secondary">
              {homeContent.servicesSection.actionLabel}
            </ButtonLink>
          }
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceItems.slice(0, 4).map((item, index) => (
            <ServiceCard key={item.title} item={item} index={index} maxDeliverables={3} />
          ))}
        </div>
      </PageSection>

      <PageSection>
        <SectionHeader
          eyebrow={homeContent.workSection.eyebrow}
          eyebrowTone="blue"
          title={homeContent.workSection.title}
          description={homeContent.workSection.description}
          action={
            <ButtonLink href={homeContent.workSection.actionHref} variant="secondary">
              {homeContent.workSection.actionLabel}
            </ButtonLink>
          }
        />
        <div className="mt-12 flex flex-col gap-8">
          {projectItems.slice(0, 2).map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </PageSection>

      <PageSection subtle bordered>
        <SectionHeader {...homeContent.approachSection} eyebrowTone="mint" />
        <div className="mt-12">
          <ProcessSteps steps={approachSteps} />
        </div>
      </PageSection>

      <PageSection aria-label="What we're working on now">
        <ResearchStrip />
      </PageSection>

      <PageSection flushTop>
        <div className="grid gap-8 lg:grid-cols-2">
          <ChecklistPanel {...reliabilitySection} eyebrowTone="volt" index={0} />
          <ChecklistPanel {...whoWeHelpSection} eyebrowTone="lilac" index={1} />
        </div>
      </PageSection>

      <PageSection surface bordered aria-label={homeContent.founderSection.eyebrow}>
        <FounderBlock {...homeContent.founderSection} />
      </PageSection>

      <PageSection>
        <CTASection {...homeContent.cta} />
      </PageSection>
    </>
  );
}
