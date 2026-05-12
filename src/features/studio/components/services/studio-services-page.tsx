import { capabilities } from "../content/content";
import { ContactPanel } from "../shared/contact-panel";
import { PageHero } from "../shared/page-hero";
import { StudioShell } from "../shared/studio-shell";
import styles from "../shared/studio-page.module.css";

export function StudioServicesPage() {
  return (
    <StudioShell>
      <PageHero
        eyebrow="Services"
        title="Focused product, web, mobile, and cloud delivery."
        summary="A practical studio offer for teams that need clearer product surfaces, stronger trust flows, and release-ready builds."
      />

      <section className={`${styles.section} ${styles.sectionAccent}`}>
        <div className={styles.sectionInner}>
          <div className={styles.servicesGrid}>
            {capabilities.map((item) => (
              <article className={styles.serviceCard} key={item.title}>
                <h3 className={styles.serviceTitle}>{item.title}</h3>
                <p className={styles.serviceSummary}>{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactPanel />
    </StudioShell>
  );
}
