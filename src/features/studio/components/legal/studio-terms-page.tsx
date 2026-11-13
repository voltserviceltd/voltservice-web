import { siteConfig } from "@/shared/config/site";
import { Section } from "@/shared/ui/section";

import { PageHero } from "../blocks/page-hero";
import { mailtoHref } from "../content/content";
import { StudioShell } from "../shared/studio-shell";
import { policy } from "./policy";
import styles from "./prose.module.css";

const { legal, contactEmail } = siteConfig;

export function StudioTermsPage() {
  return (
    <StudioShell>
      <PageHero
        eyebrow="Legal"
        eyebrowTone="ink"
        summary="The terms for using this website. Work we do for clients is covered by a separate written agreement."
        title="Terms of use."
      />

      <Section style={{ paddingTop: 0 }}>
        <div className={styles.prose} style={{ maxWidth: "46rem" }}>
          <p className={styles.updated}>Last updated: {policy.lastUpdated}</p>

          <h2>About us</h2>
          <p>
            This website is run by {legal.name}, registered in {legal.jurisdiction} (company number{" "}
            {legal.companyNumber}), registered office {legal.registeredOffice}.
          </p>

          <h2>Using this website</h2>
          <p>
            You may browse and share pages from this website for your own information. Please don&apos;t copy our
            content, design or code for commercial use without asking first.
          </p>

          <h2>Information on this website</h2>
          <p>
            We keep the information here accurate and up to date, but it&apos;s general information, not advice or
            an offer. Prices, scope and timings for any project are only set out in a written proposal agreed with
            you.
          </p>

          <h2>Links to other websites</h2>
          <p>
            We link to other websites, such as our products and Companies House. We aren&apos;t responsible for their
            content or how they handle your data.
          </p>

          <h2>Liability</h2>
          <p>
            Nothing in these terms limits liability that can&apos;t be limited by law. Otherwise, we aren&apos;t
            liable for any loss arising from use of this website or reliance on its content.
          </p>

          <h2>Privacy</h2>
          <p>
            How we handle personal data is explained in our <a href="/privacy/">privacy notice</a>.
          </p>

          <h2>Law</h2>
          <p>These terms are governed by the law of England and Wales, and its courts have jurisdiction.</p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={mailtoHref}>{contactEmail}</a>.
          </p>
        </div>
      </Section>
    </StudioShell>
  );
}
