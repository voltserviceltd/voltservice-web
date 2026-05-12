import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/shared/ui/section-heading";

import {
  capabilities,
  portfolio,
  proofItems,
} from "../content/content";
import { ContactPanel } from "../shared/contact-panel";
import { ProductCard } from "../shared/product-card";
import { StudioShell } from "../shared/studio-shell";
import styles from "../shared/studio-page.module.css";

export function StudioHome() {
  const featuredProducts = portfolio.slice(0, 2);

  return (
    <StudioShell>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>Voltservice product studio</p>
            <h1 className={styles.heroTitle}>
              Build the product moments that matter.
            </h1>
            <p className={styles.heroSummary}>
              We shape web, mobile, cloud, and fintech products into clear
              public stories backed by real shipped work.
            </p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href="/products">
                View Products
              </Link>
              <Link className={styles.secondaryAction} href="/contact">
                Start a Project
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <Image
              alt=""
              className={styles.heroProduct}
              height={1080}
              priority
              src="/brand/paysmart/hero.png"
              width={1514}
            />
          </div>
        </div>
      </section>

      <section className={styles.productTabs} aria-label="Product channels">
        <div className={styles.productTabsInner}>
          {portfolio.map((item) => (
            <Link className={styles.productTab} href="/products" key={item.name}>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionMuted}`}>
        <div className={styles.sectionInner}>
          <SectionHeading
            description="A focused entry point for the company, with clear routes into products, services, approach, and contact."
            eyebrow="Positioning"
            title="A sharper front door for product work."
          />

          <div className={styles.proofGrid}>
            {proofItems.map((item) => (
              <article className={styles.proofItem} key={item.label}>
                <p className={styles.proofLabel}>{item.label}</p>
                <p className={styles.proofValue}>{item.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.splitHeading}>
            <SectionHeading
              description="A quick preview of shipped and concept work, with the full portfolio available on its own page."
              eyebrow="Featured work"
              title="Selected product proof."
            />
            <Link className={styles.textAction} href="/products">
              All Products
            </Link>
          </div>

          <div className={styles.productGrid}>
            {featuredProducts.map((item) => (
              <ProductCard item={item} key={item.name} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAccent}`}>
        <div className={styles.sectionInner}>
          <SectionHeading
            description="Product websites, fintech flows, app surfaces, and release discipline shaped as one coherent delivery practice."
            eyebrow="Studio"
            title="Hire Voltservice for focused product work."
          />

          <div className={styles.servicesGrid}>
            {capabilities.map((item) => (
              <article className={styles.serviceCard} key={item.title}>
                <h3 className={styles.serviceTitle}>{item.title}</h3>
                <p className={styles.serviceSummary}>{item.summary}</p>
              </article>
            ))}
          </div>

          <Link className={styles.primaryActionInline} href="/services">
            Explore Services
          </Link>
        </div>
      </section>

      <ContactPanel />
    </StudioShell>
  );
}
