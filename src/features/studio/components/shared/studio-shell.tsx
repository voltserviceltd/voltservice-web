import { contactDetails, navigation } from "../content/content";
import { SiteNavbar } from "../navbar/site-navbar";
import styles from "./studio-page.module.css";

export function StudioShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>

      <SiteNavbar
        contactEmail={contactDetails.email}
        domain={contactDetails.domain}
        items={navigation}
      />

      <main id="main">{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <p className={styles.footerTitle}>VOLTSERVICE LTD</p>
            <p className={styles.footerText}>
              Modern digital products for web, cloud, and high-trust systems.
            </p>
          </div>

          <p className={styles.footerText}>{contactDetails.domain}</p>
        </div>
      </footer>
    </div>
  );
}

