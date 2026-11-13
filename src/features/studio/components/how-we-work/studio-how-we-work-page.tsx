import { Check } from "lucide-react";

import { Section } from "@/shared/ui/section";
import { SectionHeading } from "@/shared/ui/section-heading";

import blocks from "../blocks/blocks.module.css";
import { CtaBand } from "../blocks/cta-band";
import { PageHero } from "../blocks/page-hero";
import { StepCard } from "../blocks/step-card";
import { processSteps } from "../content/content";
import { StudioShell } from "../shared/studio-shell";

const commitments = [
  "A written scope and fixed price agreed before any work starts",
  "A working link to click through every week",
  "Plain English — no jargon in proposals, demos or invoices",
  "Security and accessibility (WCAG 2.2 AA) built in, not bolted on",
];

export function StudioHowWeWorkPage() {
  return (
    <StudioShell>
      <PageHero
        eyebrow="How we work"
        eyebrowTone="mint"
        summary="Every project follows the same four steps. You always know what's being built, what it costs and when you'll see it."
        title="Small steps. No surprises."
      />

      <Section style={{ paddingTop: 0 }}>
        <ol className={blocks.steps} style={{ marginTop: 0 }}>
          {processSteps.map((step, index) => (
            <StepCard detailed index={index} key={step.number} step={step} />
          ))}
        </ol>
      </Section>

      <Section bordered tone="white">
        <SectionHeading eyebrow="What you can count on" eyebrowTone="volt" title="Our commitments on every project." />
        <ul className={blocks.cardGrid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))" }}>
          {commitments.map((item, index) => (
            <li className={blocks.serviceCard} key={item} data-reveal="" style={{ ["--reveal-index" as string]: index }}>
              <Check aria-hidden="true" style={{ width: "1.75rem", height: "1.75rem" }} />
              <p className={blocks.cardTitle} style={{ fontSize: "1.25rem" }}>
                {item}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </StudioShell>
  );
}
