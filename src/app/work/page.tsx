import type { Metadata } from "next";
import { PageSection } from "@/components/primitives/page-section";
import { SectionHeader } from "@/components/primitives/section-header";
import { ProjectCard } from "@/components/marketing/project-card";
import { CTASection } from "@/components/marketing/cta-section";
import { workContent } from "@/lib/content/service/work-content";
import { projectItems } from "@/lib/content/service/project-items";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata(workContent.seo);

export default function WorkPage() {
  return (
    <>
      <PageSection>
        <SectionHeader {...workContent.header} eyebrowTone="blue" as="h1" />
      </PageSection>

      <PageSection flushTop>
        <div className="flex flex-col gap-10">
          {projectItems.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} withScreenshots />
          ))}
        </div>
      </PageSection>

      <PageSection>
        <CTASection {...workContent.cta} />
      </PageSection>
    </>
  );
}
