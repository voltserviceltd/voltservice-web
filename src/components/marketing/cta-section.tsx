import Link from "next/link";

type CTASectionProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <div className="rounded-lg bg-accent-primary px-8 py-12 text-text-on-inverse md:px-12">
      <div className="max-w-2xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-text-on-inverse/80">{description}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-4">
        <Link
          href={primaryHref}
          className="rounded-lg bg-surface px-5 py-2.5 text-sm font-medium text-accent-primary transition-colors hover:bg-background-subtle"
        >
          {primaryLabel}
        </Link>
        <Link
          href={secondaryHref}
          className="rounded-lg border border-text-on-inverse/40 px-5 py-2.5 text-sm font-medium text-text-on-inverse transition-colors hover:bg-accent-primary-hover"
        >
          {secondaryLabel}
        </Link>
      </div>
    </div>
  );
}
