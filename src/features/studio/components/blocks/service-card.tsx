import { Check } from "lucide-react";

import { IconTile } from "@/shared/ui/icon-tile";
import { reveal } from "@/shared/ui/reveal";

import type { ServiceItem } from "../../features.type";
import styles from "./blocks.module.css";

/** Figma component: Service card. */
export function ServiceCard({ item, index = 0, showExamples = false }: { item: ServiceItem; index?: number; showExamples?: boolean }) {
  return (
    <article className={styles.serviceCard} data-tilt-host id={item.slug} {...reveal(index)}>
      <IconTile color={item.color} icon={item.icon} />
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardBody}>{item.summary}</p>
      <ul className={styles.checkList}>
        {item.points.map((point) => (
          <li key={point}>
            <Check aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
      {showExamples ? (
        <div className={styles.examples}>
          <p className={styles.examplesTitle}>Typical projects</p>
          <ul>
            {item.examples.map((example) => (
              <li key={example}>{example}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
