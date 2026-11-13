import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./text-link.module.css";

export function TextLink({
  href,
  children,
  onDark = false,
  className,
}: {
  href: string;
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  const external = /^https?:\/\//.test(href);
  const cls = clsx(styles.link, onDark && styles.onDark, className);

  if (external) {
    return (
      <a className={cls} href={href} rel="noopener noreferrer" target="_blank">
        {children}
        <ArrowUpRight aria-hidden="true" className={styles.icon} />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link className={cls} href={href as Route}>
        {children}
        <ArrowRight aria-hidden="true" className={styles.icon} />
      </Link>
    );
  }

  return (
    <a className={cls} href={href}>
      {children}
      <ArrowRight aria-hidden="true" className={styles.icon} />
    </a>
  );
}
