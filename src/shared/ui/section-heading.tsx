import clsx from "clsx";

import styles from "./section-heading.module.css";
import { Tag } from "./tag";
import type { SectionHeadingProps } from "./ui.type";

export function SectionHeading({
  eyebrow,
  eyebrowTone = "volt",
  title,
  description,
  align = "start",
  level = 2,
  aside,
}: SectionHeadingProps) {
  const Heading = level === 1 ? "h1" : "h2";

  const heading = (
    <div className={clsx(styles.wrap, align === "center" && styles.center)}>
      <Tag tone={eyebrowTone}>{eyebrow}</Tag>
      <Heading className={level === 1 ? styles.titleH1 : styles.title}>{title}</Heading>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );

  if (!aside) return heading;

  return (
    <div className={styles.row}>
      {heading}
      <p className={styles.aside}>{aside}</p>
    </div>
  );
}
