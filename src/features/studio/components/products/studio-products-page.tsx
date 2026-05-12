import { portfolio } from "../content/content";
import { PageHero } from "../shared/page-hero";
import { ProductCard } from "../shared/product-card";
import { StudioShell } from "../shared/studio-shell";
import styles from "../shared/studio-page.module.css";

export function StudioProductsPage() {
  return (
    <StudioShell>
      <PageHero
        eyebrow="Products"
        title="Product work with real screens and a clear story."
        summary="PaySmart, BuildersHub, and VoltPay show the studio range across live fintech, founder collaboration, and payments experience design."
      />

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.productGrid}>
            {portfolio.map((item) => (
              <ProductCard item={item} key={item.name} />
            ))}
          </div>
        </div>
      </section>
    </StudioShell>
  );
}

