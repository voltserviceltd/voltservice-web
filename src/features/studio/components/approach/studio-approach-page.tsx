import Image from "next/image";

import { SectionHeading } from "@/shared/ui/section-heading";

import { processSteps } from "../content/content";
import { PageHero } from "../shared/page-hero";
import { StudioShell } from "../shared/studio-shell";
import styles from "../shared/studio-page.module.css";

export function StudioApproachPage() {
  return (
    <StudioShell>
      <PageHero
        eyebrow="Approach"
        title="A delivery model built around proof and maintainability."
        summary="Clear product framing, clean technical boundaries, and visible release discipline from the first brief to the shipped surface."
      />

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionInner}>
          <div className={styles.approachLayout}>
            <div className={styles.approachCopy}>
              <SectionHeading
                description="The work moves in practical stages, keeping message, product surface, and engineering quality aligned."
                eyebrow="Process"
                title="How the work moves."
              />

              <div className={styles.processGrid}>
                {processSteps.map((step, index) => (
                  <article className={styles.processCard} key={step.title}>
                    <p className={styles.processIndex}>0{index + 1}</p>
                    <h3 className={styles.processTitle}>{step.title}</h3>
                    <p className={styles.processSummary}>{step.summary}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.approachVisual}>
              <div className={styles.approachImageWrap}>
                <Image
                  alt="Illustration of a software delivery partnership."
                  className={styles.approachImage}
                  height={768}
                  src="/brand/partner-image.png"
                  width={768}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </StudioShell>
  );
}
