import { Check } from "lucide-react";

import { Section } from "@/shared/ui/section";
import { Tag } from "@/shared/ui/tag";
import { TextLink } from "@/shared/ui/text-link";

import { PageHero } from "../blocks/page-hero";
import { contactDetails, mailtoHref } from "../content/content";
import { StudioShell } from "../shared/studio-shell";
import styles from "./contact.module.css";
import { ContactForm } from "./contact-form";

const expectations = [
  "A reply from the person who'd build it",
  "Honest thoughts, even if the answer is “you don't need custom software”",
  "No obligation — a written scope and fixed price only if you want one",
];

export function StudioContactPage() {
  return (
    <StudioShell>
      <PageHero
        eyebrow="Contact"
        eyebrowTone="coral"
        summary="Tell us what's slowing you down — a tired website, a process held together by spreadsheets, an app idea. We'll reply with honest next steps."
        title="Start a project."
      />

      <Section style={{ paddingTop: 0 }}>
        <div className={styles.layout}>
          <div className={styles.formCard}>
            <ContactForm email={contactDetails.email} />
          </div>

          <aside aria-label="Other ways to reach us" className={styles.aside}>
            <div className={styles.asideCard} style={{ background: "var(--color-volt)" }}>
              <Tag tone="ink">Email us directly</Tag>
              <a className={styles.email} href={mailtoHref}>
                {contactDetails.email}
              </a>
            </div>
            <div className={styles.asideCard} style={{ background: "var(--color-white)" }}>
              <h2 className={styles.asideTitle}>What happens next</h2>
              <ul className={styles.expect}>
                {expectations.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <TextLink href="/how-we-work">How we work</TextLink>
            </div>
          </aside>
        </div>
      </Section>
    </StudioShell>
  );
}
