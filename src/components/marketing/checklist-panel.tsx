import { Check } from "lucide-react";
import { reveal } from "@/components/primitives/reveal";
import { Tag } from "@/components/primitives/tag";
import type { TagTone } from "@/lib/content/domain/visual";

/** A titled checklist card — used for "Reliability" and "Who we help". */
export function ChecklistPanel({
  eyebrow,
  eyebrowTone,
  title,
  description,
  bullets,
  index = 0,
}: {
  eyebrow: string;
  eyebrowTone: TagTone;
  title: string;
  description: string;
  bullets: readonly string[];
  index?: number;
}) {
  return (
    <div
      className="flex flex-col items-start gap-4 rounded-3xl border-2 border-line bg-surface p-7 shadow-hard md:p-10"
      {...reveal(index)}
    >
      <Tag tone={eyebrowTone}>{eyebrow}</Tag>
      <h2 className="font-display text-3xl leading-tight font-extrabold tracking-[-0.015em] text-text-primary md:text-4xl">
        {title}
      </h2>
      <p className="text-text-muted">{description}</p>
      <ul className="mt-2 flex flex-col gap-3">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3 text-text-primary">
            <span aria-hidden className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 border-ink bg-mint text-ink">
              <Check className="size-4" />
            </span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}
