import { Calendar, Check, Code, MessageCircle, Receipt, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./hero-collage.module.css";

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

/**
 * Decorative hero illustration (Figma "Hero collage (animated)"): a project
 * card, an invoice toast, a spinning sticker and floating icon tiles. Built
 * from live elements rather than an image so it stays sharp and animatable.
 */
export function HeroCollage() {
  return (
    <div aria-hidden className={styles.collageWrap}>
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
            {tasks.map((task) => (
              <li key={task.label}>
                <span className={cn(styles.box, task.done && styles.boxDone)}>
                  {task.done ? <Check /> : null}
                </span>
                <span className={task.done ? styles.taskDone : undefined}>{task.label}</span>
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
          <span className={cn(styles.miniTile, styles.tileVolt)}>
            <Receipt />
          </span>
          <span className={styles.toastText}>
            <strong>Invoice sent</strong>
            <span>£564.00 · via PaySmart</span>
          </span>
        </div>

        <span className={styles.sticker}>
          <svg viewBox="0 0 132 132">
            <polygon
              fill="var(--color-coral)"
              points={starPoints()}
              stroke="var(--color-ink)"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <span className={styles.stickerText}>
            Built
            <br />
            to last
          </span>
        </span>

        <span className={cn(styles.floatTile, styles.tileBlue, styles.ft1)}>
          <Code />
        </span>
        <span className={cn(styles.floatTile, styles.tilePink, styles.ft2)}>
          <MessageCircle />
        </span>
        <span className={cn(styles.floatTile, styles.tileLilac, styles.ft3)}>
          <Zap />
        </span>
      </div>
    </div>
  );
}
