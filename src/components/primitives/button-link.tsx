import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-volt text-ink border-ink",
  secondary: "bg-surface text-text-primary border-line",
  dark: "bg-ink text-paper border-ink dark:bg-paper dark:text-ink dark:border-paper",
} as const;

export type ButtonVariant = keyof typeof variants;

export function buttonClasses(variant: ButtonVariant = "primary", fullWidth = false) {
  return cn(
    "sticker group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full border-2 py-3.5 pr-5.5 pl-6 text-base leading-none font-semibold whitespace-nowrap shadow-hard-sm",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue",
    variants[variant],
    fullWidth && "w-full",
  );
}

/**
 * A link styled as the pill "sticker" button (Figma component "Button").
 * Internal paths use next/link; mailto/https use a plain anchor.
 */
export function ButtonLink({
  href,
  variant = "primary",
  icon: Icon = ArrowRight,
  fullWidth = false,
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  icon?: LucideIcon | null;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "children" | "className">) {
  const classes = cn(buttonClasses(variant, fullWidth), className);
  const inner = (
    <>
      <span>{children}</span>
      {Icon && (
        <Icon
          aria-hidden
          className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {inner}
    </a>
  );
}
