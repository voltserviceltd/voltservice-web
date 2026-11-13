import { Section } from "@/shared/ui/section";
import { SectionHeading } from "@/shared/ui/section-heading";

import blocks from "../blocks/blocks.module.css";
import { CtaBand } from "../blocks/cta-band";
import { PageHero } from "../blocks/page-hero";
import { ServiceCard } from "../blocks/service-card";
import { StepCard } from "../blocks/step-card";
import { processSteps, services } from "../content/content";
import { StudioShell } from "../shared/studio-shell";

export function StudioServicesPage() {
  return (
    <StudioShell>
      <PageHero
        eyebrow="Services"
        eyebrowTone="coral"
        summary="Websites, apps, internal tools and the care that keeps them running. Start with one, add the others when they're worth it."
        title="Four ways we take work off your plate."
      />

      <Section style={{ paddingTop: 0 }}>
        <div className={`${blocks.cardGrid} ${blocks.cardGridWide}`} style={{ marginTop: 0 }}>
          {services.map((item, index) => (
            <ServiceCard index={index % 2} item={item} key={item.slug} showExamples />
          ))}
        </div>
      </Section>

      <Section bordered tone="deep">
        <SectionHeading
          description="Each stage has a written scope and a fixed price you agree before work starts. If the scope changes, we agree the change in writing first."
          eyebrow="How pricing works"
          eyebrowTone="blue"
          title="Fixed-price stages, not open-ended hours."
        />
        <ol className={blocks.steps}>
          {processSteps.map((step, index) => (
            <StepCard index={index} key={step.number} step={step} />
          ))}
        </ol>
      </Section>

      <CtaBand />
    </StudioShell>
  );
}
