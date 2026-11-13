import type { Metadata } from "next";
import { Mail, X } from "lucide-react";
import { PageSection } from "@/components/primitives/page-section";
import { SectionHeader } from "@/components/primitives/section-header";
import { ButtonLink } from "@/components/primitives/button-link";
import { IconTile } from "@/components/primitives/icon-tile";
import { Prose } from "@/components/primitives/prose";
import { researchContent } from "@/lib/content/service/research-content";
import { companyContent } from "@/lib/content/service/company-content";
import { legalPolicy } from "@/lib/content/service/legal-policy";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata(researchContent.seo);

const mailto = (subject: string) =>
  `mailto:${companyContent.email}?subject=${encodeURIComponent(subject)}`;

export default function ResearchPage() {
  return (
    <>
      <PageSection>
        <div className="flex flex-col gap-8">
          <IconTile icon="hard-hat" accent="volt" size="lg" tilt={-6} />
          <SectionHeader {...researchContent.header} eyebrowTone="lilac" as="h1" />
        </div>
      </PageSection>

      <PageSection flushTop>
        <Prose>
          <h2>What we&apos;re researching</h2>
          <p>
            Before a job starts, someone at a main contractor usually has to collect insurance
            certificates and RAMS from each subcontractor, chase what&apos;s late, check what arrives
            and keep a record of who reviewed it. We want to understand how that really works at
            small fit-out and building firms — the messy version, not the tidy one.
          </p>

          <h2>What we&apos;d ask</h2>
          <p>
            A short call, about 20 minutes, about your most recent job: who asked for the paperwork,
            what came in late, how it was chased and where the decisions ended up. If a reply is
            easier, a few lines about the hardest part is just as useful.
          </p>
          <p>
            If your firm already has this covered — with a tool, a consultant or a good spreadsheet —
            we&apos;d still like to hear what works.
          </p>

          <h2>What we won&apos;t do</h2>
          <ul>
            <li>Sell you anything in these emails or on the call.</li>
            <li>Share your details or anything you tell us with anyone else.</li>
            <li>Keep emailing: it&apos;s {legalPolicy.researchFollowUps}, then we stop.</li>
          </ul>

          <h2>Your details</h2>
          <p>
            We found your details on your company&apos;s own website or the public Companies House
            register. We keep them for {legalPolicy.researchRetention}. The full detail is in our{" "}
            <a href="/privacy#research">privacy policy</a>.
          </p>

          <div className="mt-6 flex flex-col gap-5 rounded-3xl border-2 border-line bg-surface p-7 shadow-hard">
            <p>
              <strong>Happy to help, or rather not?</strong> Either answer is useful.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={mailto(researchContent.replySubject)} icon={Mail}>
                I&apos;m happy to talk
              </ButtonLink>
              <ButtonLink href={mailto(researchContent.optOutSubject)} variant="secondary" icon={X}>
                No thanks, remove me
              </ButtonLink>
            </div>
          </div>
        </Prose>
      </PageSection>
    </>
  );
}
