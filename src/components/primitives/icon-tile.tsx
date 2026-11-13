import type { CSSProperties } from "react";
import { icons } from "@/components/primitives/icon";
import type { Accent, IconName } from "@/lib/content/domain/visual";
import { cn } from "@/lib/utils";

export const accentBg: Record<Accent, string> = {
  volt: "bg-volt",
  coral: "bg-coral",
  blue: "bg-blue",
  mint: "bg-mint",
  lilac: "bg-lilac",
  pink: "bg-pink",
  paper: "bg-paper",
};

const sizes = {
  sm: "size-10 rounded-[0.625rem] [&_svg]:size-5",
  md: "size-16 rounded-[1rem] [&_svg]:size-7",
  lg: "size-24 rounded-[1.5rem] [&_svg]:size-11",
} as const;

/**
 * The coloured-icon pattern (Figma component "Icon tile"): a Lucide icon on a
 * bright, outlined tile with a hard shadow. Decorative, so hidden from AT.
 * Tiles inside a `.lift` card tilt −6° on hover.
 */
export function IconTile({
  icon,
  accent = "volt",
  size = "md",
  tilt,
  className,
}: {
  icon: IconName;
  accent?: Accent;
  size?: keyof typeof sizes;
  tilt?: number;
  className?: string;
}) {
  const Icon = icons[icon];
  const style = tilt ? ({ rotate: `${tilt}deg` } as CSSProperties) : undefined;

  return (
    <span
      aria-hidden
      data-tile
      style={style}
      className={cn(
        "inline-grid shrink-0 place-items-center border-2 border-ink text-ink shadow-[3px_3px_0_var(--color-ink)] transition-[rotate] duration-200 ease-(--ease-spring)",
        sizes[size],
        accentBg[accent],
        className,
      )}
    >
      <Icon strokeWidth={2} />
    </span>
  );
}
