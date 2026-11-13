import { Section } from "@/shared/ui/section";

import blocks from "../blocks/blocks.module.css";
import { CtaBand } from "../blocks/cta-band";
import { PageHero } from "../blocks/page-hero";
import { ProductCard } from "../blocks/product-card";
import { products } from "../content/content";
import { StudioShell } from "../shared/studio-shell";

export function StudioWorkPage() {
  return (
    <StudioShell>
      <PageHero
        eyebrow="Our own products"
        eyebrowTone="blue"
        summary="Running live products keeps us honest: real users, real payments, real support. It's the same ground your project will cover."
        title="We don't just build for clients. We run our own."
      />

      <Section style={{ paddingTop: 0 }}>
        <div className={blocks.productList} style={{ marginTop: 0 }}>
          {products.map((item, index) => (
            <ProductCard headingLevel={2} index={index} item={item} key={item.name} withScreenshots />
          ))}
        </div>
      </Section>

      <CtaBand title="Want something like this for your business?" />
    </StudioShell>
  );
}
