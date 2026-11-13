import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type PageSectionProps = {
  children: React.ReactNode;
  /** Paper-deep band for section rhythm. */
  subtle?: boolean;
  /** White (surface) band. */
  surface?: boolean;
  /** Ink outline above and below the band. */
  bordered?: boolean;
  /** Drop the top padding (for sections that follow a page header). */
  flushTop?: boolean;
  className?: string;
} & Omit<ComponentProps<"section">, "children" | "className">;

/** Consistent max-width/padding wrapper, with optional tinted bands for section rhythm. */
export function PageSection({
  children,
  subtle,
  surface,
  bordered,
  flushTop,
  className,
  ...rest
}: PageSectionProps) {
  return (
    <section
      className={cn(
        subtle && "bg-background-subtle",
        surface && "bg-surface",
        bordered && "border-y-2 border-line",
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          "mx-auto max-w-310 px-4 py-16 sm:px-6 md:py-24 lg:px-8",
          flushTop && "pt-0 md:pt-0",
        )}
      >
        {children}
      </div>
    </section>
  );
}
