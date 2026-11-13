import { siteConfig } from "@/shared/config/site";
import { Section } from "@/shared/ui/section";

import { PageHero } from "../blocks/page-hero";
import { mailtoHref } from "../content/content";
import { StudioShell } from "../shared/studio-shell";
import { policy } from "./policy";
import styles from "./prose.module.css";

const { legal, contactEmail } = siteConfig;

const sections = [
  ["who", "Who we are"],
  ["website", "Visiting this website"],
  ["enquiries", "When you contact us"],
  ["research", "Research contacts"],
  ["sharing", "Who we share data with"],
  ["rights", "Your rights"],
  ["complaints", "Complaints"],
] as const;

export function StudioPrivacyPage() {
  return (
    <StudioShell>
      <PageHero
        eyebrow="Legal"
        eyebrowTone="ink"
        summary="What personal data we collect, why, how long we keep it and how to ask us to stop. Written to be read, not skimmed past."
        title="Privacy notice."
      />

      <Section style={{ paddingTop: 0 }}>
        <div className={styles.wrap}>
          <nav aria-label="On this page" className={styles.toc}>
            <p className={styles.tocTitle}>On this page</p>
            {sections.map(([id, label]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </nav>

          <div className={styles.prose}>
            <p className={styles.updated}>Last updated: {policy.lastUpdated}</p>

            <h2 id="who">Who we are</h2>
            <p>
              {legal.name} (&ldquo;VoltService&rdquo;, &ldquo;we&rdquo;) is the controller of the personal data
              described here. We are registered in {legal.jurisdiction}, company number {legal.companyNumber}. Our
              registered office is {legal.registeredOffice}. Contact us about anything in this notice at{" "}
              <a href={mailtoHref}>{contactEmail}</a>.
            </p>

            <h2 id="website">Visiting this website</h2>
            <p>
              This website does not use cookies, analytics or advertising trackers, and it doesn&apos;t ask you to
              log in. Fonts are served from our own site, not a third party. Our hosting provider processes
              technical information such as your IP address to deliver pages and protect the service.
            </p>

            <h2 id="enquiries">When you contact us</h2>
            <p>
              If you email us or use the contact form (which opens your own email app), we receive what you choose
              to send: usually your name, email address, company and message.
            </p>
            <ul>
              <li>
                <strong>Why:</strong> to reply to you and, if you want, to prepare a scope and quote.
              </li>
              <li>
                <strong>Lawful basis:</strong> our legitimate interest in responding to enquiries, or steps you ask
                us to take before entering into a contract.
              </li>
              <li>
                <strong>How long:</strong> {policy.enquiryRetention}. If you become a client, we keep contract and
                invoice records for {policy.contractRetention}.
              </li>
            </ul>

            <h2 id="research">Research contacts</h2>
            <div className={styles.callout}>
              <p>
                If we emailed you about how your firm collects insurance and RAMS from subcontractors, this section
                is for you. More about the research is on our <a href="/research/">research page</a>.
              </p>
            </div>
            <ul>
              <li>
                <strong>Where your details came from:</strong> your company&apos;s own website and the public
                Companies House register.
              </li>
              <li>
                <strong>What we hold:</strong> your name, role, business email address and company name, plus
                anything you tell us if you reply.
              </li>
              <li>
                <strong>Why:</strong> research into how small contractors handle subcontractor paperwork. We are not
                selling anything in these emails.
              </li>
              <li>
                <strong>Lawful basis:</strong> our legitimate interest in understanding a business problem before
                building anything. We only contact business addresses of limited companies.
              </li>
              <li>
                <strong>How often:</strong> {policy.researchFollowUps}. Then we stop.
              </li>
              <li>
                <strong>How long:</strong> {policy.researchRetention}, then deleted. Notes from a conversation are
                kept without your name if we use them in our research.
              </li>
              <li>
                <strong>To stop:</strong> reply &ldquo;no thanks&rdquo; or email{" "}
                <a href={`${mailtoHref}?subject=${encodeURIComponent("No thanks: please remove me")}`}>
                  {contactEmail}
                </a>
                . We&apos;ll delete your details and keep only a note of your email address so we never contact you
                again.
              </li>
            </ul>

            <h2 id="sharing">Who we share data with</h2>
            <p>
              We don&apos;t sell or rent personal data. We share it only with the service providers we need to run
              the business — our email provider and our website hosting provider — who act on our instructions.
              Where a provider processes data outside the UK, we rely on UK adequacy regulations or approved
              contract clauses to protect it.
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
              Email <a href={mailtoHref}>{contactEmail}</a>. We&apos;ll respond within one month.
            </p>

            <h2 id="complaints">Complaints</h2>
            <p>
              Please tell us first so we can put it right. You can also complain to the Information
              Commissioner&apos;s Office at{" "}
              <a href="https://ico.org.uk/make-a-complaint/" rel="noopener noreferrer" target="_blank">
                ico.org.uk/make-a-complaint
              </a>{" "}
              or on 0303 123 1113.
            </p>
          </div>
        </div>
      </Section>
    </StudioShell>
  );
}
