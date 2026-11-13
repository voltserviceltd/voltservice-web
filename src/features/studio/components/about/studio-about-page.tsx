import { siteConfig } from "@/shared/config/site";
import { Section } from "@/shared/ui/section";
import { SectionHeading } from "@/shared/ui/section-heading";
import { TextLink } from "@/shared/ui/text-link";

import { CtaBand } from "../blocks/cta-band";
import { FounderBlock } from "../blocks/founder-block";
import { PageHero } from "../blocks/page-hero";
import { StudioShell } from "../shared/studio-shell";
import styles from "./about.module.css";

const { legal } = siteConfig;

const details = [
  ["Company name", legal.name],
  ["Company number", legal.companyNumber],
  ["Registered in", legal.jurisdiction],
  ["Registered office", legal.registeredOffice],
  ["Contact", siteConfig.contactEmail],
] as const;

export function StudioAboutPage() {
  return (
    <StudioShell>
      <PageHero
        eyebrow="About"
        summary="A software services company focused on practical digital delivery — founded and led by Babatunde Kalejaiye."
        title="About VoltService."
      />

      <Section style={{ paddingTop: 0 }}>
        <FounderBlock />
      </Section>

      <Section bordered tone="deep">
        <SectionHeading
          description="The details you'd expect from a company you're about to work with."
          eyebrow="Company details"
          eyebrowTone="ink"
          title="A registered UK company."
        />
        <dl className={styles.details}>
          {details.map(([term, value]) => (
            <div className={styles.detail} key={term}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.verify}>
          <TextLink href={legal.companiesHouseUrl}>Check our Companies House record</TextLink>
        </p>
      </Section>

      <CtaBand />
    </StudioShell>
  );
}
