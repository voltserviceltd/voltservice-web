import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const base =
  "group inline-flex w-fit items-center gap-1.5 bg-[linear-gradient(var(--color-volt),var(--color-volt))] bg-[length:100%_4px] bg-bottom bg-no-repeat px-0.5 pb-1 font-semibold transition-[background-size,color] duration-200 hover:bg-[length:100%_100%] hover:text-ink";

/** Inline link with a volt underline that grows into a highlight (Figma "Text link"). */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(base, className)}>
        {children}
        <ArrowUpRight aria-hidden className="size-4.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cn(base, className)}>
        {children}
        <ArrowRight aria-hidden className="size-4.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    );
  }

  return (
    <a href={href} className={cn(base, className)}>
      {children}
      <ArrowRight aria-hidden className="size-4.5" />
    </a>
  );
}
