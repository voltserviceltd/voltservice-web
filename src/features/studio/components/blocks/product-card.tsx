import Image from "next/image";

import { reveal } from "@/shared/ui/reveal";
import { Tag } from "@/shared/ui/tag";
import { TextLink } from "@/shared/ui/text-link";

import type { ProductItem } from "../../features.type";
import styles from "./blocks.module.css";
import { ProductVisual } from "./product-visual";

/** Figma component: Product card (Breakpoint=Desktop | Mobile). */
export function ProductCard({
  item,
  index = 0,
  headingLevel = 3,
  withScreenshots = false,
}: {
  item: ProductItem;
  index?: number;
  headingLevel?: 2 | 3;
  withScreenshots?: boolean;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article className={styles.productCard} {...reveal(index)}>
      <div className={styles.productCopy}>
        <Tag dot tone={item.statusTone}>
          {item.status}
        </Tag>
        <Heading className={styles.productName}>{item.name}</Heading>
        <p className={styles.productSummary}>{item.summary}</p>
        {withScreenshots ? <p className={styles.cardBody}>{item.detail}</p> : null}
        <ul aria-label="Focus" className={styles.stack}>
          {item.stack.map((s) => (
            <li key={s}>
              <Tag tone="outline">{s}</Tag>
            </li>
          ))}
        </ul>
        <TextLink href={item.url}>{item.urlLabel}</TextLink>
      </div>

      <ProductVisual kind={item.visual} />

      {withScreenshots && item.screenshots ? (
        <ul aria-label={`${item.name} screenshots`} className={styles.screens}>
          {item.screenshots.map((shot) => (
            <li key={shot.image}>
              <Image alt={shot.imageAlt} height={1014} loading="lazy" src={shot.image} width={480} />
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
