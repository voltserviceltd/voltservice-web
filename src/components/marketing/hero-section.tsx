import Link from "next/link";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  badges: readonly string[];
};

export function HeroSection({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  badges,
}: HeroSectionProps) {
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-lg text-text-muted">{subtitle}</p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href={primaryHref}
          className="rounded-lg bg-accent-primary px-5 py-2.5 text-sm font-medium text-text-on-inverse transition-colors hover:bg-accent-primary-hover"
        >
          {primaryLabel}
        </Link>
        <Link
          href={secondaryHref}
          className="rounded-lg border border-border-subtle px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-background-subtle"
        >
          {secondaryLabel}
        </Link>
      </div>

      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">
        {badges.map((badge) => (
          <li key={badge} className="flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full bg-accent-secondary" />
            {badge}
          </li>
        ))}
      </ul>
    </div>
  );
}
