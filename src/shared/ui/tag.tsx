import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./tag.module.css";
import type { TagTone } from "./ui.type";

export function Tag({
  tone = "outline",
  dot = false,
  className,
  children,
}: {
  tone?: TagTone;
  /** A pulsing "live" dot. */
  dot?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={clsx(styles.tag, styles[tone], className)}>
      {dot ? <span aria-hidden="true" className={styles.dot} /> : null}
      {children}
    </span>
  );
}
