"use client";

import { Fragment, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Infinite ticker band (Figma component "Marquee band") with a pause control
 * (WCAG 2.2.2). Static and horizontally scrollable under reduced motion.
 */
export function Marquee({ items, label }: { items: readonly string[]; label: string }) {
  const [paused, setPaused] = useState(false);

  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex items-center gap-7 px-3.5 py-5">
      {items.map((item, index) => (
        <Fragment key={item}>
          <li
            className={cn(
              "font-display text-[clamp(1.375rem,1rem+1.2vw,2.125rem)] font-extrabold tracking-tight whitespace-nowrap",
              index % 2 ? "text-volt" : "text-white",
            )}
          >
            {item}
          </li>
          <li aria-hidden className="text-3xl leading-none text-volt">
            ✺
          </li>
        </Fragment>
      ))}
    </ul>
  );

  return (
    <div
      role="region"
      aria-label={label}
      className="group relative overflow-hidden border-y-2 border-ink bg-blue motion-reduce:overflow-x-auto"
    >
      <div
        className={cn(
          "flex w-max animate-[vs-marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none",
          paused && "[animation-play-state:paused]",
        )}
      >
        {list(false)}
        {list(true)}
      </div>
      <button
        type="button"
        aria-pressed={paused}
        aria-label={paused ? "Play scrolling banner" : "Pause scrolling banner"}
        onClick={() => setPaused((value) => !value)}
        className="absolute top-1/2 right-4 grid size-11 -translate-y-1/2 place-items-center rounded-full border-2 border-ink bg-white text-ink shadow-[3px_3px_0_var(--color-ink)] motion-reduce:hidden"
      >
        {paused ? <Play aria-hidden className="size-4.5" /> : <Pause aria-hidden className="size-4.5" />}
      </button>
    </div>
  );
}
