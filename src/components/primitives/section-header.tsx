import { Tag } from "@/components/primitives/tag";
import type { TagTone } from "@/lib/content/domain/visual";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  eyebrowTone?: TagTone;
  /** Render the title as the page's h1. */
  as?: "h1" | "h2";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  eyebrowTone = "volt",
  as: Heading = "h2",
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="flex max-w-3xl flex-col items-start gap-4">
        <Tag tone={eyebrowTone}>{eyebrow}</Tag>
        <Heading
          className={cn(
            "font-display font-extrabold text-text-primary",
            Heading === "h1"
              ? "text-[clamp(2.75rem,1.9rem+3.5vw,4.5rem)] leading-[0.95] tracking-[-0.03em]"
              : "text-[clamp(2.25rem,1.8rem+1.9vw,3.25rem)] leading-[1.05] tracking-[-0.015em]",
          )}
        >
          {title}
        </Heading>
        {description && (
          <p className="text-lg leading-relaxed text-text-muted md:text-xl">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
