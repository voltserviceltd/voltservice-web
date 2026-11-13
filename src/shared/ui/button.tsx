import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

import styles from "./button.module.css";
import type { ButtonVariant, IconComponent } from "./ui.type";

type CommonProps = {
  variant?: ButtonVariant;
  /** Trailing icon. Defaults to an arrow; pass `null` for none. */
  icon?: IconComponent | null;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

function Inner({ icon: Icon, children }: Pick<CommonProps, "icon" | "children">) {
  return (
    <>
      <span>{children}</span>
      {Icon ? <Icon aria-hidden="true" className={styles.icon} strokeWidth={2} /> : null}
    </>
  );
}

function classes({ variant = "primary", fullWidth, className }: Omit<CommonProps, "children">) {
  return clsx(styles.button, styles[variant], fullWidth && styles.full, className);
}

/** A link that looks like a button. Internal routes use next/link; mailto/tel/http use <a>. */
export function ButtonLink({
  href,
  icon = ArrowRight,
  ...props
}: CommonProps & { href: string } & Omit<ComponentProps<"a">, "href" | "children">) {
  const { variant, fullWidth, className, children, ...rest } = props;
  const cls = classes({ variant, fullWidth, className });
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link className={cls} href={href as Route} {...rest}>
        <Inner icon={icon}>{children}</Inner>
      </Link>
    );
  }

  return (
    <a className={cls} href={href} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </a>
  );
}

export function Button({
  icon = ArrowRight,
  variant,
  fullWidth,
  className,
  children,
  type = "button",
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, "children">) {
  return (
    <button className={classes({ variant, fullWidth, className })} type={type} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}
