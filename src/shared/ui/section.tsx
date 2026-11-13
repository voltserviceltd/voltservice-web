import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

import styles from "./section.module.css";
import type { SectionTone } from "./ui.type";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={clsx(styles.container, className)} {...props} />;
}

/** A full-width page band with the standard gutter and vertical rhythm. */
export function Section({
  tone = "paper",
  bordered = false,
  className,
  innerClassName,
  children,
  ...props
}: {
  tone?: SectionTone;
  bordered?: boolean;
  innerClassName?: string;
  children: ReactNode;
} & Omit<ComponentProps<"section">, "children">) {
  return (
    <section className={clsx(styles.section, styles[tone], bordered && styles.bordered, className)} {...props}>
      <Container className={innerClassName}>{children}</Container>
    </section>
  );
}
