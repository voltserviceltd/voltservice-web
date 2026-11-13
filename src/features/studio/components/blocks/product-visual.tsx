import clsx from "clsx";

import { Tag } from "@/shared/ui/tag";

import type { ProductItem } from "../../features.type";
import styles from "./blocks.module.css";

/** Figma components: Product visual/PaySmart, Product visual/VoltConnects. Decorative mock UI. */
export function ProductVisual({ kind }: { kind: ProductItem["visual"] }) {
  if (kind === "paysmart") {
    return (
      <div aria-hidden="true" className={clsx(styles.visual, styles.bg_blue)}>
        <div className={clsx(styles.mockCard, styles.tiltLeft)}>
          <div className={styles.mockHead}>
            <span className={styles.mockTitle}>Weekly shift invoice</span>
            <Tag tone="mint">Paid</Tag>
          </div>
          <div className={styles.mockLine}>
            <span>Night shifts · 3 × 12h</span>
            <span>£540.00</span>
          </div>
          <div className={styles.mockLine}>
            <span>Travel</span>
            <span>£24.00</span>
          </div>
          <div className={styles.mockTotal}>
            <span>Total</span>
            <span>£564.00</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={clsx(styles.visual, styles.bg_lilac)}>
      <div className={clsx(styles.mockCard, styles.tiltRight)}>
        <span className={styles.mockTitle}>Group · Kitchen refit crew</span>
        <div className={styles.avatars}>
          {(["volt", "coral", "mint", "pink"] as const).map((c) => (
            <span className={clsx(styles.avatar, styles[`bg_${c}`])} key={c} />
          ))}
        </div>
        <span className={styles.mockMeta}>4 builders · 2 live projects</span>
        <div className={styles.mockTags}>
          <Tag tone="volt">Plastering</Tag>
          <Tag tone="outline">Electrics</Tag>
        </div>
      </div>
    </div>
  );
}
