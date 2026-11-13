import clsx from "clsx";
import type { CSSProperties } from "react";

import styles from "./icon-tile.module.css";
import type { Accent, IconComponent, IconTileSize } from "./ui.type";

/** A Lucide icon on a bright, outlined tile. Decorative: hidden from assistive tech. */
export function IconTile({
  icon: Icon,
  color = "volt",
  size = "md",
  tilt,
  className,
}: {
  icon: IconComponent;
  color?: Accent;
  size?: IconTileSize;
  /** Resting rotation in degrees. */
  tilt?: number;
  className?: string;
}) {
  const style = tilt ? ({ "--tile-tilt": `${tilt}deg` } as CSSProperties) : undefined;

  return (
    <span aria-hidden="true" className={clsx(styles.tile, styles[size], styles[color], className)} style={style}>
      <Icon className={styles.icon} strokeWidth={2} />
    </span>
  );
}
