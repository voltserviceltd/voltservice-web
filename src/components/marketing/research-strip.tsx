import { ButtonLink } from "@/components/primitives/button-link";
import { IconTile } from "@/components/primitives/icon-tile";
import { reveal } from "@/components/primitives/reveal";
import { Tag } from "@/components/primitives/tag";
import { researchContent } from "@/lib/content/service/research-content";

/** "Right now" strip. Backs up the contractor research emails; no pitch. */
export function ResearchStrip() {
  const { strip } = researchContent;

  return (
    <div
      className="grid items-center gap-8 rounded-[2.25rem] border-2 border-ink bg-lilac p-6 text-ink shadow-hard-lg md:p-12 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-12"
      {...reveal(0)}
    >
      <IconTile icon="hard-hat" accent="volt" size="lg" tilt={-6} />
      <div className="flex flex-col items-start gap-3">
        <Tag tone="ink" dot>
          {strip.eyebrow}
        </Tag>
        <h2 className="font-display text-[clamp(2.25rem,1.8rem+1.9vw,3.25rem)] leading-[1.05] font-extrabold tracking-[-0.015em]">
          {strip.title}
        </h2>
        <p className="text-lg leading-relaxed md:text-xl">{strip.description}</p>
      </div>
      <ButtonLink href={strip.actionHref} variant="dark" className="w-full lg:w-auto dark:bg-ink dark:text-paper dark:border-ink">
        {strip.actionLabel}
      </ButtonLink>
    </div>
  );
}
