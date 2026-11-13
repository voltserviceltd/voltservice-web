import type { Metadata } from "next";
import { PageSection } from "@/components/primitives/page-section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Prose } from "@/components/primitives/prose";
import { companyContent } from "@/lib/content/service/company-content";
import { legalPolicy } from "@/lib/content/service/legal-policy";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy policy | VoltService",
  description:
    "How VOLTSERVICE LTD collects, uses and protects personal data, including people we contact for research.",
  path: "/privacy",
});

const { legalName, jurisdiction, companyNumber, registeredOffice, email } = companyContent;
const mailtoHref = `mailto:${email}`;

export default function PrivacyPage() {
  return (
    <>
      <PageSection>
        <SectionHeader
          eyebrow="Legal"
          eyebrowTone="ink"
          title="Privacy policy."
          description="What personal data we collect, why, how long we keep it and how to ask us to stop."
          as="h1"
        />
      </PageSection>

      <PageSection flushTop>
        <Prose>
          <p className="text-base text-text-muted">Last updated: {legalPolicy.lastUpdated}</p>

          <h2 id="who">Who we are</h2>
          <p>
            {legalName} (&ldquo;VoltService&rdquo;, &ldquo;we&rdquo;) is the controller of the
            personal data described here. We are registered in {jurisdiction}, company number{" "}
            {companyNumber}. Our registered office is {registeredOffice}. Contact us about anything
            in this policy at <a href={mailtoHref}>{email}</a>.
          </p>

          <h2 id="website">Visiting this website</h2>
          <p>
            This website does not use advertising or analytics cookies, and doesn&apos;t ask you to
            log in. If you choose a light or dark theme, your browser remembers that choice locally.
            Our hosting provider processes technical information such as your IP address to deliver
            pages and keep the service secure.
          </p>

          <h2 id="enquiries">When you contact us</h2>
          <p>
            If you email us, we receive what you choose to send: usually your name, email address,
            company and message.
          </p>
          <ul>
            <li>
              <strong>Why:</strong> to reply to you and, if you want, to prepare a proposal.
            </li>
            <li>
              <strong>Lawful basis:</strong> our legitimate interest in responding to enquiries, or
              steps you ask us to take before entering into a contract.
            </li>
            <li>
              <strong>How long:</strong> {legalPolicy.enquiryRetention}. If you become a client, we
              keep contract and invoice records for {legalPolicy.contractRetention}.
            </li>
          </ul>

          <h2 id="research">Research contacts</h2>
          <p>
            If we emailed you about how your firm collects insurance and RAMS from subcontractors,
            this section is for you. More about the research is on our{" "}
            <a href="/research">research page</a>.
          </p>
          <ul>
            <li>
              <strong>Where your details came from:</strong> your company&apos;s own website and the
              public Companies House register.
            </li>
            <li>
              <strong>What we hold:</strong> your name, role, business email address and company
              name, plus anything you tell us if you reply.
            </li>
            <li>
              <strong>Why:</strong> research into how small contractors handle subcontractor
              paperwork. We are not selling anything in these emails.
            </li>
            <li>
              <strong>Lawful basis:</strong> our legitimate interest in understanding a business
              problem before building anything. We only contact business addresses of limited
              companies.
            </li>
            <li>
              <strong>How often:</strong> {legalPolicy.researchFollowUps}. Then we stop.
            </li>
            <li>
              <strong>How long:</strong> {legalPolicy.researchRetention}, then deleted.
            </li>
            <li>
              <strong>To stop:</strong> reply &ldquo;no thanks&rdquo; or email{" "}
              <a href={`${mailtoHref}?subject=${encodeURIComponent("No thanks: please remove me")}`}>
                {email}
              </a>
              . We&apos;ll delete your details and keep only a note of your email address so we never
              contact you again.
            </li>
          </ul>

          <h2 id="sharing">Who we share data with</h2>
          <p>
            We don&apos;t sell or rent personal data. We share it only with the service providers we
            need to run the business — our email provider and our hosting provider (Google Cloud) —
            who act on our instructions. Where a provider processes data outside the UK, we rely on
            UK adequacy regulations or approved contract clauses to protect it.
          </p>

          <h2 id="rights">Your rights</h2>
          <p>Under UK data protection law you can ask us to:</p>
          <ul>
            <li>give you a copy of the personal data we hold about you;</li>
            <li>correct it if it&apos;s wrong;</li>
            <li>delete it;</li>
            <li>restrict how we use it, or object to us using it (including for research contact);</li>
            <li>move it to another organisation, where that applies.</li>
          </ul>
          <p>
            Email <a href={mailtoHref}>{email}</a>. We&apos;ll respond within one month.
          </p>

          <h2 id="complaints">Complaints</h2>
          <p>
            Please tell us first so we can put it right. You can also complain to the Information
            Commissioner&apos;s Office at{" "}
            <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">
              ico.org.uk/make-a-complaint
            </a>{" "}
            or on 0303 123 1113.
          </p>
        </Prose>
      </PageSection>
    </>
  );
}
