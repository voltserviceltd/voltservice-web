import type { ReactNode } from "react";
import type { TagTone } from "@/lib/content/domain/visual";
import { cn } from "@/lib/utils";

const tones: Record<TagTone, string> = {
  volt: "bg-volt text-ink border-ink",
  coral: "bg-coral text-ink border-ink",
  blue: "bg-blue text-white border-ink",
  mint: "bg-mint text-ink border-ink",
  lilac: "bg-lilac text-ink border-ink",
  pink: "bg-pink text-ink border-ink",
  paper: "bg-background-subtle text-text-primary border-line",
  outline: "bg-surface text-text-primary border-line",
  ink: "bg-ink text-paper border-ink dark:bg-paper dark:text-ink dark:border-paper",
};

/** Mono uppercase label (Figma component "Tag"). `dot` adds a pulsing live dot. */
export function Tag({
  tone = "outline",
  dot = false,
  className,
  children,
}: {
  tone?: TagTone;
  dot?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full border-[1.5px] px-3 py-1.5 font-mono text-[0.8125rem] font-medium uppercase leading-tight tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden
          className="relative size-2 shrink-0 rounded-full border-[1.5px] border-current bg-mint after:absolute after:-inset-[1.5px] after:animate-[vs-pulse-ring_1.6s_var(--ease-in-out-soft)_infinite] after:rounded-full after:bg-inherit"
        />
      )}
      {children}
    </span>
  );
}
