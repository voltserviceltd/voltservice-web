import { contactDetails } from "../content/content";
import styles from "./studio-page.module.css";

export function ContactPanel() {
  return (
    <section className={`${styles.section} ${styles.sectionDark}`}>
      <div className={styles.sectionInner}>
        <div className={styles.contactBand}>
          <div className={styles.contactCopy}>
            <p className={styles.contactEyebrow}>Contact</p>
            <h2 className={styles.contactTitle}>
              Bring a stronger product story to market.
            </h2>
            <p className={styles.contactSummary}>{contactDetails.strapline}</p>
          </div>

          <div className={styles.contactMeta}>
            <a
              className={styles.contactEmail}
              href={`mailto:${contactDetails.email}`}
            >
              {contactDetails.email}
            </a>
            <p className={styles.contactSummary}>
              For product launches, studio sites, and web or app delivery.
            </p>
            <a
              className={styles.contactAction}
              href={`mailto:${contactDetails.email}`}
            >
              Start a Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

