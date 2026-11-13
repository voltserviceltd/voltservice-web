import Link from "next/link";
import type { Route } from "next";

import { legalLine } from "@/shared/config/site";

import { footerGroups } from "../content/content";
import { Logo } from "../navbar/logo";
import styles from "./site-footer.module.css";

function FooterLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith("/")) {
    return (
      <Link className={styles.link} href={href as Route}>
        {label}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      className={styles.link}
      href={href}
      {...(external ? { rel: "noopener noreferrer", target: "_blank" } : {})}
    >
      {label}
    </a>
  );
}

/** Figma component: Footer. Carries the company's legal disclosures. */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo onDark />
            <p className={styles.blurb}>
              Websites, apps and internal tools for UK businesses — designed, built and looked after by a
              small, founder-led team.
            </p>
          </div>

          {footerGroups.map((group) => (
            <nav aria-label={group.title} className={styles.group} key={group.title}>
              <p className={styles.groupTitle}>{group.title}</p>
              <ul className={styles.list}>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className={styles.legal}>{legalLine()}</p>
      </div>
    </footer>
  );
}
