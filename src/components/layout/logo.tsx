import Link from "next/link";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/** Figma component "Logo": tilted volt mark (wiggles on hover) + wordmark. */
export function Logo({ onInverse = false, className }: { onInverse?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="VoltService home"
      className={cn(
        "group inline-flex items-center gap-2.5",
        onInverse ? "text-paper" : "text-text-primary",
        className,
      )}
    >
      <span
        aria-hidden
        className="grid size-10 -rotate-6 place-items-center rounded-[0.6875rem] border-2 border-ink bg-volt text-ink shadow-[3px_3px_0_var(--color-ink)] group-hover:animate-[vs-wiggle_400ms_var(--ease-spring)]"
      >
        <Zap className="size-5.5" strokeWidth={2.25} />
      </span>
      <span aria-hidden className="inline-flex items-baseline gap-1.5 font-display text-2xl leading-none font-extrabold tracking-[-0.03em]">
        VoltService
        <span className="font-mono text-xs font-medium tracking-[0.08em] opacity-70">LTD</span>
      </span>
    </Link>
  );
}
