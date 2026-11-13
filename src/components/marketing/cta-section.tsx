import { ButtonLink } from "@/components/primitives/button-link";
import { IconTile } from "@/components/primitives/icon-tile";
import { reveal } from "@/components/primitives/reveal";

type CTASectionProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

const floating =
  "absolute hidden motion-safe:animate-[vs-float_4.5s_var(--ease-in-out-soft)_infinite] lg:block";

/** Volt call-to-action card with floating icon tiles (Figma "Section/CTA"). */
export function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <div
      className="relative flex flex-col items-center gap-6 rounded-[2.25rem] border-3 border-ink bg-volt px-6 py-12 text-center text-ink shadow-[10px_10px_0_var(--color-ink)] md:px-20 md:py-22"
      {...reveal(0)}
    >
      <span aria-hidden className={`${floating} top-11 left-11`}>
        <IconTile icon="mail" accent="coral" tilt={-12} />
      </span>
      <span aria-hidden className={`${floating} top-12 right-12 [animation-delay:-1.2s]`}>
        <IconTile icon="zap" accent="blue" tilt={10} />
      </span>
      <span aria-hidden className={`${floating} right-14 bottom-12 [animation-delay:-2.4s]`}>
        <IconTile icon="calendar" accent="mint" tilt={-8} />
      </span>
      <span aria-hidden className={`${floating} bottom-12 left-13 [animation-delay:-3.3s]`}>
        <IconTile icon="message-circle" accent="pink" tilt={9} />
      </span>

      <h2 className="max-w-4xl font-display text-[clamp(2.5rem,1.8rem+3vw,4.25rem)] leading-[0.98] font-extrabold tracking-[-0.03em]">
        {title}
      </h2>
      <p className="max-w-2xl text-lg md:text-xl">{description}</p>
      <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
        <ButtonLink href={primaryHref} variant="dark" className="dark:bg-ink dark:text-paper dark:border-ink">
          {primaryLabel}
        </ButtonLink>
        <ButtonLink href={secondaryHref} variant="secondary" icon={null} className="bg-white text-ink border-ink">
          {secondaryLabel}
        </ButtonLink>
      </div>
    </div>
  );
}
