"use client";

import { Pause, Play } from "lucide-react";
import clsx from "clsx";
import { Fragment, useState } from "react";

import styles from "./marquee.module.css";

/** Infinite ticker with a pause control (WCAG 2.2.2). Static under reduced motion. */
export function Marquee({ items, label }: { items: readonly string[]; label: string }) {
  const [paused, setPaused] = useState(false);

  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className={styles.list}>
      {items.map((item) => (
        <Fragment key={item}>
          <li className={styles.item}>{item}</li>
          <li aria-hidden="true" className={styles.star}>
            ✺
          </li>
        </Fragment>
      ))}
    </ul>
  );

  return (
    <div aria-label={label} className={clsx(styles.band, paused && styles.paused)} role="region">
      <div className={styles.track}>
        {list(false)}
        {list(true)}
      </div>
      <button
        aria-label={paused ? "Play scrolling banner" : "Pause scrolling banner"}
        aria-pressed={paused}
        className={styles.toggle}
        onClick={() => setPaused((value) => !value)}
        type="button"
      >
        {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      </button>
    </div>
  );
}
