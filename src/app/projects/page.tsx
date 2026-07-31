import type { Metadata } from "next";
import { PageSection } from "@/components/primitives/page-section";
import { SectionHeader } from "@/components/primitives/section-header";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { ProjectCard } from "@/components/marketing/project-card";
import { CTASection } from "@/components/marketing/cta-section";
import { projectsContent } from "@/lib/content/service/projects-content";
import { projectItems } from "@/lib/content/service/project-items";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata(projectsContent.seo);

export default function ProjectsPage() {
  return (
    <>
      <PageSection>
        <SectionHeader {...projectsContent.header} />
      </PageSection>

      <PageSection subtle>
        <div className="grid gap-6 sm:grid-cols-2">
          {projectItems.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </PageSection>

      <PageSection>
        <SectionHeader {...projectsContent.signalsSection} />
        <div className="mt-8">
          <FeatureGrid items={projectsContent.projectSignals} />
        </div>
      </PageSection>

      <PageSection>
        <CTASection {...projectsContent.cta} />
      </PageSection>
    </>
  );
}
