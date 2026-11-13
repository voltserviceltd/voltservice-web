import Link from "next/link";
import { Zap } from "lucide-react";
import clsx from "clsx";

import styles from "./logo.module.css";

/** Figma component: Logo. Tilted volt mark (wiggles on hover) + wordmark. */
export function Logo({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  return (
    <Link aria-label="VoltService home" className={clsx(styles.logo, onDark && styles.onDark, className)} href="/">
      <span aria-hidden="true" className={styles.mark}>
        <Zap strokeWidth={2.25} />
      </span>
      <span aria-hidden="true" className={styles.word}>
        VoltService<span className={styles.ltd}>LTD</span>
      </span>
    </Link>
  );
}
