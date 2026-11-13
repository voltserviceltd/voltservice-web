import clsx from "clsx";

import { reveal } from "@/shared/ui/reveal";

import type { ProcessStep } from "../../features.type";
import styles from "./blocks.module.css";

/** Figma component: Step card. */
export function StepCard({ step, index = 0, detailed = false }: { step: ProcessStep; index?: number; detailed?: boolean }) {
  return (
    <li className={styles.step} {...reveal(index)}>
      <span aria-hidden="true" className={clsx(styles.stepNumber, styles[`bg_${step.color}`])}>
        {step.number}
      </span>
      <h3 className={styles.cardTitle}>
        <span className="sr-only">Step {Number(step.number)}: </span>
        {step.title}
      </h3>
      <p className={styles.cardBody}>{step.summary}</p>
      {detailed ? <p className={styles.stepDetail}>{step.detail}</p> : null}
    </li>
  );
}
