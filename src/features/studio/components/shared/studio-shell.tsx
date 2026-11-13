import { RevealObserver } from "@/shared/ui/reveal-observer";

import { navigation } from "../content/content";
import { SiteNavbar } from "../navbar/site-navbar";
import { SiteFooter } from "./site-footer";
import styles from "./studio-shell.module.css";

export function StudioShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>

      <SiteNavbar items={navigation} />

      <main className={styles.main} id="main" tabIndex={-1}>
        {children}
      </main>

      <SiteFooter />
      <RevealObserver />
    </div>
  );
}
