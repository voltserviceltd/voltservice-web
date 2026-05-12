import Image from "next/image";
import clsx from "clsx";

import { PortfolioItem } from "../../features.type";
import styles from "./studio-page.module.css";

export function ProductCard({ item }: { item: PortfolioItem }) {
  const screenshots = item.screenshots ?? [
    { image: item.image, imageAlt: item.imageAlt },
  ];

  return (
    <article className={styles.productCard}>
      <div className={styles.productImageWrap}>
        <div
          className={clsx(
            styles.productScreenshotGrid,
            screenshots.length > 1 && styles.productScreenshotStrip,
          )}
        >
          {screenshots.map((screenshot) => (
            <Image
              alt={screenshot.imageAlt}
              className={styles.productImage}
              height={960}
              key={screenshot.image}
              src={screenshot.image}
              width={960}
            />
          ))}
        </div>
      </div>

      <div className={styles.productBody}>
        <p className={styles.productCategory}>{item.category}</p>
        <h3 className={styles.productName}>{item.name}</h3>
        <p className={styles.productSummary}>{item.summary}</p>
        <p className={styles.productDetail}>{item.detail}</p>
      </div>
    </article>
  );
}
