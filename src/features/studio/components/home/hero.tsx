import { Check } from "lucide-react";

import { ButtonLink } from "@/shared/ui/button";
import { Tag } from "@/shared/ui/tag";

import { contactHref, heroTrustPoints } from "../content/content";
import { HeroCollage } from "./hero-collage";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Tag dot tone="outline">
            Software studio · Registered in England &amp; Wales
          </Tag>

          <h1 className={styles.title} id="hero-title">
            <span className={styles.line}>Software that</span>{" "}
            <span className={styles.line}>
              takes the <span className={styles.pill}>busywork</span>
            </span>{" "}
            <span className={styles.line}>off your plate.</span>
          </h1>

          <p className={styles.lead}>
            VoltService is a small, founder-led software studio. We design, build and look after websites, web
            apps and internal tools for UK businesses — and we run our own products too.
          </p>

          <div className={styles.actions}>
            <ButtonLink href={contactHref}>Start a project</ButtonLink>
            <ButtonLink href="/work" icon={null} variant="secondary">
              See our work
            </ButtonLink>
          </div>

          <ul className={styles.trust}>
            {heroTrustPoints.map((point) => (
              <li key={point}>
                <Check aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <HeroCollage />
      </div>
    </section>
  );
}
