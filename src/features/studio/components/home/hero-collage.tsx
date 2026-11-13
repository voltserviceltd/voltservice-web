import { Calendar, Check, Code, MessageCircle, Receipt, Zap } from "lucide-react";
import clsx from "clsx";

import styles from "./hero.module.css";

function starPoints(points = 14, outer = 64, inner = 52.5, cx = 66, cy = 66) {
  const out: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i) / points - Math.PI / 2;
    out.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return out.join(" ");
}

const tasks = [
  { label: "Brief agreed", done: true },
  { label: "Designs signed off", done: true },
  { label: "Build — week 3 of 5", done: false },
  { label: "Launch", done: false },
];

/** Decorative hero collage (Figma: "Hero collage (animated)"). Sized in em so it scales with its container. */
export function HeroCollage() {
  return (
    <div aria-hidden="true" className={styles.collageWrap}>
      <div className={styles.collage}>
        <span className={styles.blob} />

        <div className={styles.projectCard}>
          <div className={styles.projectHead}>
            <span className={styles.projectTitle}>Booking portal</span>
            <span className={styles.chip}>
              <span className={styles.chipDot} />
              In build
            </span>
          </div>
          <ul className={styles.tasks}>
            {tasks.map((t) => (
              <li key={t.label}>
                <span className={clsx(styles.box, t.done && styles.boxDone)}>{t.done ? <Check /> : null}</span>
                <span className={t.done ? styles.taskDone : undefined}>{t.label}</span>
              </li>
            ))}
          </ul>
          <span className={styles.progress}>
            <span className={styles.progressFill} />
          </span>
          <span className={styles.projectFoot}>
            <Calendar />
            Next demo: Thursday, 10:00
          </span>
        </div>

        <div className={styles.toast}>
          <span className={clsx(styles.miniTile, styles.tileVolt)}>
            <Receipt />
          </span>
          <span className={styles.toastText}>
            <strong>Invoice paid</strong>
            <span>£564.00 · via PaySmart</span>
          </span>
        </div>

        <span className={styles.sticker}>
          <svg viewBox="0 0 132 132">
            <polygon fill="var(--color-coral)" points={starPoints()} stroke="var(--color-ink)" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span className={styles.stickerText}>
            Built
            <br />
            in the UK
          </span>
        </span>

        <span className={clsx(styles.floatTile, styles.tileBlue, styles.ft1)}>
          <Code />
        </span>
        <span className={clsx(styles.floatTile, styles.tilePink, styles.ft2)}>
          <MessageCircle />
        </span>
        <span className={clsx(styles.floatTile, styles.tileLilac, styles.ft3)}>
          <Zap />
        </span>
      </div>
    </div>
  );
}
