import Image from "next/image";
import { IconTile } from "@/components/primitives/icon-tile";
import { reveal } from "@/components/primitives/reveal";
import { Tag } from "@/components/primitives/tag";
import { TextLink } from "@/components/primitives/text-link";
import { companyContent } from "@/lib/content/service/company-content";
import { founderContent, founderLinkedInUrl } from "@/lib/content/service/founder-content";
import type { Accent, IconName } from "@/lib/content/domain/visual";

const facts: { icon: IconName; accent: Accent; text: string }[] = [
  {
    icon: "building",
    accent: "mint",
    text: `${companyContent.legalName} — registered in ${companyContent.jurisdiction}, company number ${companyContent.companyNumber}`,
  },
  { icon: "rocket", accent: "coral", text: "Systems in production: PaySmart and VoltConnect" },
  { icon: "code", accent: "blue", text: "Websites, web and mobile applications, cloud deployment" },
  { icon: "shield-check", accent: "volt", text: "Maintainable, accessible software that's supported after launch" },
];

/** Homepage "Who you'll work with": founder photo, intro and company facts. */
export function FounderBlock({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="grid items-center gap-12 md:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-18">
      <figure
        className="max-w-sm rotate-2 overflow-hidden rounded-[2.25rem] border-3 border-ink bg-pink shadow-[10px_10px_0_var(--color-ink)] md:max-w-none"
        {...reveal(0)}
      >
        <Image
          src={founderContent.avatar.src}
          alt={founderContent.avatar.alt}
          width={1000}
          height={1272}
          sizes="(min-width: 768px) 416px, 90vw"
          className="aspect-[1000/1180] w-full object-cover object-[50%_20%]"
        />
        <figcaption className="flex flex-col border-t-3 border-ink bg-volt px-6 py-4 text-sm text-ink">
          <span className="font-display text-xl font-extrabold">{founderContent.name}</span>
          <span>{founderContent.role}</span>
        </figcaption>
      </figure>

      <div className="flex flex-col items-start gap-6" {...reveal(1)}>
        <Tag tone="volt">{eyebrow}</Tag>
        <h2 className="font-display text-[clamp(2.25rem,1.8rem+1.9vw,3.25rem)] leading-[1.05] font-extrabold tracking-[-0.015em] text-text-primary">
          {title}
        </h2>
        <p className="text-lg leading-relaxed text-text-primary md:text-xl">{founderContent.supportingLine}</p>
        {founderContent.details.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-text-muted">
            {paragraph}
          </p>
        ))}
        <ul className="flex flex-col gap-3 font-semibold text-text-primary">
          {facts.map((fact) => (
            <li key={fact.text} className="flex items-center gap-3">
              <IconTile icon={fact.icon} accent={fact.accent} size="sm" />
              {fact.text}
            </li>
          ))}
        </ul>
        <TextLink href={founderLinkedInUrl}>{founderContent.name} on LinkedIn</TextLink>
      </div>
    </div>
  );
}
