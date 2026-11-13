import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { PageSection } from "@/components/primitives/page-section";
import { SectionHeader } from "@/components/primitives/section-header";
import { ButtonLink } from "@/components/primitives/button-link";
import { Tag } from "@/components/primitives/tag";
import { contactContent } from "@/lib/content/service/contact-content";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata(contactContent.seo);

function buildMailtoHref() {
  return `mailto:${contactContent.email}?subject=${encodeURIComponent(contactContent.mailtoSubject)}`;
}

export default function ContactPage() {
  return (
    <>
      <PageSection>
        <SectionHeader {...contactContent.header} eyebrowTone="coral" as="h1" />
      </PageSection>

      <PageSection flushTop>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="flex flex-col items-start gap-5 rounded-[2.25rem] border-3 border-ink bg-volt p-7 text-ink shadow-[10px_10px_0_var(--color-ink)] md:p-12">
            <Tag tone="ink" className="dark:bg-ink dark:text-paper dark:border-ink">
              Email us directly
            </Tag>
            <p className="text-lg md:text-xl">{contactContent.introLine}</p>
            <ButtonLink
              href={buildMailtoHref()}
              variant="dark"
              icon={Mail}
              className="dark:bg-ink dark:text-paper dark:border-ink"
            >
              {contactContent.ctaLabel}
            </ButtonLink>
            <a
              href={buildMailtoHref()}
              className="font-display text-xl font-bold break-all underline decoration-3 underline-offset-4 md:text-2xl"
            >
              {contactContent.email}
            </a>
            <p className="text-sm">{contactContent.fallbackLine}</p>
          </div>

          <div className="flex flex-col gap-5 rounded-3xl border-2 border-line bg-surface p-7 shadow-hard md:p-10">
            <span
              aria-hidden
              className="grid size-12 place-items-center rounded-xl border-2 border-ink bg-lilac text-ink shadow-[3px_3px_0_var(--color-ink)]"
            >
              <MessageCircle className="size-6" />
            </span>
            <h2 className="font-display text-2xl font-extrabold text-text-primary">
              Useful things to include
            </h2>
            <ul className="flex flex-col gap-3 text-text-primary">
              {contactContent.prompts.map((prompt) => (
                <li key={prompt} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full border-[1.5px] border-line bg-mint" />
                  {prompt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>
    </>
  );
}
