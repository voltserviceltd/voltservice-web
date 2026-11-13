import { HardHat } from "lucide-react";

import { ButtonLink } from "@/shared/ui/button";
import { IconTile } from "@/shared/ui/icon-tile";
import { reveal } from "@/shared/ui/reveal";
import { Tag } from "@/shared/ui/tag";

import styles from "./blocks.module.css";

/** "Right now" strip. Backs up the contractor research emails; no pitch. */
export function ResearchStrip() {
  return (
    <div className={styles.research} {...reveal(0)}>
      <IconTile color="volt" icon={HardHat} size="lg" tilt={-6} />
      <div className={styles.researchCopy}>
        <Tag dot tone="ink">
          What we&apos;re working on now
        </Tag>
        <h2 className={styles.researchTitle}>Listening to small contractors.</h2>
        <p className={styles.lead}>
          We&apos;re talking to fit-out and building firms about how they collect insurance and RAMS from
          subcontractors before a job starts. There&apos;s no pitch — we&apos;re learning. If that&apos;s your
          world, we&apos;d value 20 minutes of your experience.
        </p>
      </div>
      <ButtonLink className={styles.researchButton} href="/research" variant="dark">
        Share how you do it
      </ButtonLink>
    </div>
  );
}
