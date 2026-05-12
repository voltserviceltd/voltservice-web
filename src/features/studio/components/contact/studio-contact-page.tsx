import { signals } from "../content/content";
import { ContactPanel } from "../shared/contact-panel";
import { PageHero } from "../shared/page-hero";
import { StudioShell } from "../shared/studio-shell";
import styles from "../shared/studio-page.module.css";

export function StudioContactPage() {
  return (
    <StudioShell>
      <PageHero
        eyebrow="Contact"
        title="Start a product conversation."
        summary="For product launches, public repositioning, high-trust flows, and focused web or app delivery."
      />

      <ContactPanel />

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <ul className={styles.signalListLight}>
            {signals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>
      </section>
    </StudioShell>
  );
}
