import type { Metadata } from "next";
import Link from "next/link";
import { PageSection } from "@/components/primitives/page-section";
import { SectionHeader } from "@/components/primitives/section-header";
import { HeroSection } from "@/components/marketing/hero-section";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { ServiceCard } from "@/components/marketing/service-card";
import { ProjectCard } from "@/components/marketing/project-card";
import { CTASection } from "@/components/marketing/cta-section";
import { homeContent } from "@/lib/content/service/home-content";
import { homeValueFeatures } from "@/lib/content/service/home-value-features";
import { serviceItems } from "@/lib/content/service/service-items";
import { projectItems } from "@/lib/content/service/project-items";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata(homeContent.seo);

export default function HomePage() {
  return (
    <>
      <PageSection>
        <HeroSection {...homeContent.hero} />
      </PageSection>

      <PageSection>
        <SectionHeader {...homeContent.valueSection} />
        <div className="mt-8">
          <FeatureGrid items={homeValueFeatures} />
        </div>
      </PageSection>

      <PageSection subtle>
        <SectionHeader
          eyebrow={homeContent.servicesSection.eyebrow}
          title={homeContent.servicesSection.title}
          description={homeContent.servicesSection.description}
          action={
            <Link
              href={homeContent.servicesSection.actionHref}
              className="rounded-lg border border-border-subtle px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface"
            >
              {homeContent.servicesSection.actionLabel}
            </Link>
          }
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceItems.slice(0, 3).map((item) => (
            <ServiceCard key={item.title} item={item} />
          ))}
        </div>
      </PageSection>

      <PageSection>
        <SectionHeader
          eyebrow={homeContent.projectsSection.eyebrow}
          title={homeContent.projectsSection.title}
          description={homeContent.projectsSection.description}
          action={
            <Link
              href={homeContent.projectsSection.actionHref}
              className="rounded-lg border border-border-subtle px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-background-subtle"
            >
              {homeContent.projectsSection.actionLabel}
            </Link>
          }
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {projectItems.slice(0, 2).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </PageSection>

      <PageSection>
        <CTASection {...homeContent.cta} />
      </PageSection>
    </>
  );
}
