import { Check } from "lucide-react";
import { ButtonLink } from "@/components/primitives/button-link";
import { Tag } from "@/components/primitives/tag";
import { HeroCollage } from "@/components/marketing/hero-collage";

type HeroSectionProps = {
  title: string;
  titleLead: string;
  titleHighlight: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  badges: readonly string[];
};

const rise = "block animate-[vs-rise_600ms_var(--ease-out-expo)_both]";

export function HeroSection({
  title,
  titleLead,
  titleHighlight,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  badges,
}: HeroSectionProps) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
      <div className="flex flex-col items-start gap-8">
        <Tag tone="outline" dot>
          Software services · Registered in England &amp; Wales
        </Tag>

        <h1
          aria-label={title}
          className="font-display text-[clamp(2.5rem,1.6rem+4.2vw,5rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-text-primary"
        >
          <span aria-hidden className={rise}>
            {titleLead}
          </span>
          <span aria-hidden className={`${rise} [animation-delay:80ms]`}>
            <span className="mt-1 inline-block -rotate-3 whitespace-nowrap rounded-[1em] border-3 border-ink bg-volt px-[0.26em] pb-[0.06em] text-ink shadow-[6px_6px_0_var(--color-ink)] [--pop-rotate:-3deg] motion-safe:animate-[vs-pop_700ms_var(--ease-spring)_380ms_both]">
              {titleHighlight}
            </span>
          </span>
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl">{subtitle}</p>

        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
          <ButtonLink href={secondaryHref} variant="secondary" icon={null}>
            {secondaryLabel}
          </ButtonLink>
        </div>

        <ul className="flex flex-col gap-2 text-sm text-text-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
          {badges.map((badge) => (
            <li key={badge} className="flex items-center gap-2">
              <Check aria-hidden className="size-4.5 text-text-primary" />
              {badge}
            </li>
          ))}
        </ul>
      </div>

      <HeroCollage />
    </div>
  );
}
