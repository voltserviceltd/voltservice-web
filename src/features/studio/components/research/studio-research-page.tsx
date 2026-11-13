import { HardHat, Mail, X } from "lucide-react";

import { siteConfig } from "@/shared/config/site";
import { ButtonLink } from "@/shared/ui/button";
import { IconTile } from "@/shared/ui/icon-tile";
import { Section } from "@/shared/ui/section";

import { PageHero } from "../blocks/page-hero";
import styles from "../legal/prose.module.css";
import { policy } from "../legal/policy";
import { StudioShell } from "../shared/studio-shell";

const email = siteConfig.contactEmail;
const replyHref = `mailto:${email}?subject=${encodeURIComponent("Contractor research: happy to talk")}`;
const optOutHref = `mailto:${email}?subject=${encodeURIComponent("No thanks: please remove me")}`;

export function StudioResearchPage() {
  return (
    <StudioShell>
      <PageHero
        eyebrow="Contractor research"
        eyebrowTone="lilac"
        summary="If we emailed you about subcontractor paperwork, here's what we're doing, what we'd ask and what happens to your details."
        title="Listening to small contractors."
      >
        <div style={{ marginTop: "var(--space-32)" }}>
          <IconTile color="volt" icon={HardHat} size="lg" tilt={-6} />
        </div>
      </PageHero>

      <Section style={{ paddingTop: 0 }}>
        <div className={styles.prose} style={{ maxWidth: "46rem" }}>
          <h2>What we&apos;re researching</h2>
          <p>
            Before a job starts, someone at a main contractor usually has to collect insurance certificates and
            RAMS from each subcontractor, chase what&apos;s late, check what arrives and keep a record of who
            reviewed it. We want to understand how that really works at small fit-out and building firms — the
            messy version, not the tidy one.
          </p>

          <h2>What we&apos;d ask</h2>
          <p>
            A short call, about 20 minutes, about your most recent job: who asked for the paperwork, what came in
            late, how it was chased and where the decisions ended up. If a reply is easier, a few lines about the
            hardest part is just as useful.
          </p>
          <p>
            If your firm already has this covered — with a tool, a consultant or a good spreadsheet — we&apos;d
            still like to hear what works.
          </p>

          <h2>What we won&apos;t do</h2>
          <ul>
            <li>Sell you anything in these emails or on the call.</li>
            <li>Share your details or anything you tell us with anyone else.</li>
            <li>Keep emailing: it&apos;s {policy.researchFollowUps}, then we stop.</li>
          </ul>

          <h2>Your details</h2>
          <p>
            We found your details on your company&apos;s own website or the public Companies House register. We keep them for {policy.researchRetention}. The full detail is in our{" "}
            <a href="/privacy/#research">privacy notice</a>.
          </p>

          <div className={styles.callout}>
            <p>
              <strong>Happy to help, or rather not?</strong> Either answer is useful.
            </p>
            <div className={styles.actions}>
              <ButtonLink href={replyHref} icon={Mail}>
                I&apos;m happy to talk
              </ButtonLink>
              <ButtonLink href={optOutHref} icon={X} variant="secondary">
                No thanks, remove me
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </StudioShell>
  );
}
