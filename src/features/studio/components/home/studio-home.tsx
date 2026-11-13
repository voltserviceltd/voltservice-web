import { Marquee } from "@/shared/ui/marquee";
import { Section } from "@/shared/ui/section";
import { SectionHeading } from "@/shared/ui/section-heading";
import { TextLink } from "@/shared/ui/text-link";

import blocks from "../blocks/blocks.module.css";
import { CtaBand } from "../blocks/cta-band";
import { FounderBlock } from "../blocks/founder-block";
import { ProductCard } from "../blocks/product-card";
import { ResearchStrip } from "../blocks/research-strip";
import { ServiceCard } from "../blocks/service-card";
import { StepCard } from "../blocks/step-card";
import { marqueeItems, processSteps, products, services } from "../content/content";
import { StudioShell } from "../shared/studio-shell";
import { Hero } from "./hero";

export function StudioHome() {
  return (
    <StudioShell>
      <Hero />

      <Marquee items={marqueeItems} label="What we build" />

      <Section aria-labelledby="services-title">
        <SectionHeading
          aside="Most projects start small — one fiddly process, one tired website — and grow from there. We work in clear, fixed-price stages so you always know what's next."
          eyebrow="What we do"
          eyebrowTone="coral"
          title={<span id="services-title">Four ways we take work off your plate.</span>}
        />
        <div className={blocks.cardGrid}>
          {services.map((item, index) => (
            <ServiceCard index={index} item={item} key={item.slug} />
          ))}
        </div>
      </Section>

      <Section aria-labelledby="work-title" bordered tone="deep">
        <SectionHeading
          description="Running live products keeps us honest: we deal with real users, real payments and real support — the same things your project will face."
          eyebrow="Our own products"
          eyebrowTone="blue"
          title={<span id="work-title">We don&apos;t just build for clients. We run our own.</span>}
        />
        <div className={blocks.productList}>
          {products.map((item, index) => (
            <ProductCard index={index} item={item} key={item.name} />
          ))}
        </div>
      </Section>

      <Section aria-labelledby="process-title">
        <SectionHeading
          description="Every project follows the same four steps, with a written scope and price agreed before we write any code."
          eyebrow="How we work"
          eyebrowTone="mint"
          title={<span id="process-title">Small steps. No surprises.</span>}
        />
        <ol className={blocks.steps}>
          {processSteps.map((step, index) => (
            <StepCard index={index} key={step.number} step={step} />
          ))}
        </ol>
        <p style={{ marginTop: "var(--space-48)" }}>
          <TextLink href="/how-we-work">More on how we work</TextLink>
        </p>
      </Section>

      <Section aria-label="What we're working on now" style={{ paddingTop: 0 }}>
        <ResearchStrip />
      </Section>

      <Section aria-label="Who you'll work with" bordered tone="white">
        <FounderBlock />
      </Section>

      <CtaBand />
    </StudioShell>
  );
}
