import { SectionHeading } from "@/shared/ui/section-heading";

import { founderProfile, principles } from "../content/content";
import { PageHero } from "../shared/page-hero";
import { StudioShell } from "../shared/studio-shell";
import styles from "../shared/studio-page.module.css";

export function StudioAboutPage() {
  return (
    <StudioShell>
      <PageHero
        eyebrow="About"
        title="Founder-led product work for high-trust systems."
        summary="A focused studio for public product presence, fintech flows, and maintainable web and app delivery."
      />

      <section className={`${styles.section} ${styles.sectionMuted}`}>
        <div className={styles.sectionInner}>
          <div className={styles.founderLayout}>
            <div className={styles.founderIntro}>
              <p className={styles.founderEyebrow}>
                {founderProfile.eyebrow}
              </p>
              <h2 className={styles.founderTitle}>{founderProfile.title}</h2>
            </div>

            <div className={styles.founderCopy}>
              <div>
                <p className={styles.founderName}>{founderProfile.name}</p>
                <p className={styles.founderRole}>{founderProfile.role}</p>
              </div>
              <p>{founderProfile.summary}</p>
              <ul className={styles.founderList}>
                {founderProfile.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <SectionHeading
            description="Boundaries, documentation, and quality checks stay visible because they are part of the product experience."
            eyebrow="Principles"
            title="The engineering bar stays visible."
          />

          <div className={styles.principlesGrid}>
            {principles.map((item) => (
              <article className={styles.principleCard} key={item.title}>
                <h3 className={styles.principleTitle}>{item.title}</h3>
                <p className={styles.principleSummary}>{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </StudioShell>
  );
}

