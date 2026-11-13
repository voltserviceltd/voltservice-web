import type { ReactNode } from "react";

import { SectionHeading } from "@/shared/ui/section-heading";
import { Section } from "@/shared/ui/section";
import type { TagTone } from "@/shared/ui/ui.type";

import styles from "./blocks.module.css";

/** Top of every inner page: eyebrow tag, H1 and lead paragraph. */
export function PageHero({
  eyebrow,
  eyebrowTone = "volt",
  title,
  summary,
  children,
}: {
  eyebrow: string;
  eyebrowTone?: TagTone;
  title: ReactNode;
  summary: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Section className={styles.pageHero}>
      <SectionHeading description={summary} eyebrow={eyebrow} eyebrowTone={eyebrowTone} level={1} title={title} />
      {children}
    </Section>
  );
}
