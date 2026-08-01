import type { Metadata } from "next";
import { PageSection } from "@/components/primitives/page-section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Card } from "@/components/primitives/card";
import { contactContent } from "@/lib/content/service/contact-content";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata(contactContent.seo);

function buildMailtoHref() {
  return `mailto:${contactContent.email}?subject=${encodeURIComponent(contactContent.mailtoSubject)}`;
}

export default function ContactPage() {
  return (
    <PageSection>
      <SectionHeader {...contactContent.header} />

      <div className="mt-8 max-w-2xl">
        <Card>
          <p className="text-text-muted">{contactContent.introLine}</p>

          <a
            href={buildMailtoHref()}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent-primary px-5 py-2.5 text-sm font-medium text-text-on-inverse transition-colors hover:bg-accent-primary-hover"
          >
            {contactContent.ctaLabel}
          </a>

          <p className="mt-4 text-sm font-medium text-text-primary">{contactContent.email}</p>
          <p className="mt-1 text-sm text-text-muted">{contactContent.fallbackLine}</p>

          <ul className="mt-6 flex flex-col gap-2 border-t border-border-subtle pt-6 text-sm text-text-primary">
            {contactContent.prompts.map((prompt) => (
              <li key={prompt} className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-secondary"
                />
                {prompt}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </PageSection>
  );
}
