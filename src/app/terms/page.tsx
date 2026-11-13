import type { Metadata } from "next";
import { PageSection } from "@/components/primitives/page-section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Prose } from "@/components/primitives/prose";
import { companyContent } from "@/lib/content/service/company-content";
import { legalPolicy } from "@/lib/content/service/legal-policy";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of use | VoltService",
  description: "Terms for using the VoltService website.",
  path: "/terms",
});

const { legalName, jurisdiction, companyNumber, registeredOffice, email } = companyContent;

export default function TermsPage() {
  return (
    <>
      <PageSection>
        <SectionHeader
          eyebrow="Legal"
          eyebrowTone="ink"
          title="Terms of use."
          description="The terms for using this website. Work we do for clients is covered by a separate written agreement."
          as="h1"
        />
      </PageSection>

      <PageSection flushTop>
        <Prose>
          <p className="text-base text-text-muted">Last updated: {legalPolicy.lastUpdated}</p>

          <h2>About us</h2>
          <p>
            This website is run by {legalName}, registered in {jurisdiction} (company number{" "}
            {companyNumber}), registered office {registeredOffice}.
          </p>

          <h2>Using this website</h2>
          <p>
            You may browse and share pages from this website for your own information. Please
            don&apos;t copy our content, design or code for commercial use without asking first.
          </p>

          <h2>Information on this website</h2>
          <p>
            We keep the information here accurate and up to date, but it&apos;s general information,
            not advice or an offer. Prices, scope and timings for any project are only set out in a
            written proposal agreed with you.
          </p>

          <h2>Links to other websites</h2>
          <p>
            We link to other websites, such as our work examples and Companies House. We aren&apos;t
            responsible for their content or how they handle your data.
          </p>

          <h2>Liability</h2>
          <p>
            Nothing in these terms limits liability that can&apos;t be limited by law. Otherwise, we
            aren&apos;t liable for any loss arising from use of this website or reliance on its
            content.
          </p>

          <h2>Privacy</h2>
          <p>
            How we handle personal data is explained in our <a href="/privacy">privacy policy</a>.
          </p>

          <h2>Law</h2>
          <p>These terms are governed by the law of England and Wales, and its courts have jurisdiction.</p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${email}`}>{email}</a>.
          </p>
        </Prose>
      </PageSection>
    </>
  );
}
