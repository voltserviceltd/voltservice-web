import { Calendar, Mail, MessageCircle, Zap } from "lucide-react";
import clsx from "clsx";

import { ButtonLink } from "@/shared/ui/button";
import { IconTile } from "@/shared/ui/icon-tile";
import { reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";

import { contactHref, mailtoHref } from "../content/content";
import styles from "./blocks.module.css";

export function CtaBand({
  title = "Got a process that eats your week?",
  body = "Tell us what it is. We'll reply with honest thoughts — even if the answer is “you don't need custom software”.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <Section>
      <div className={styles.cta} {...reveal(0)}>
        <span aria-hidden="true" className={clsx(styles.ctaTile, styles.ctaTile1)}>
          <IconTile color="coral" icon={Mail} tilt={-12} />
        </span>
        <span aria-hidden="true" className={clsx(styles.ctaTile, styles.ctaTile2)}>
          <IconTile color="blue" icon={Zap} tilt={10} />
        </span>
        <span aria-hidden="true" className={clsx(styles.ctaTile, styles.ctaTile3)}>
          <IconTile color="mint" icon={Calendar} tilt={-8} />
        </span>
        <span aria-hidden="true" className={clsx(styles.ctaTile, styles.ctaTile4)}>
          <IconTile color="pink" icon={MessageCircle} tilt={9} />
        </span>

        <h2 className={styles.ctaTitle}>{title}</h2>
        <p className={styles.ctaBody}>{body}</p>
        <div className={styles.ctaActions}>
          <ButtonLink href={contactHref} variant="dark">
            Start a project
          </ButtonLink>
          <ButtonLink href={mailtoHref} icon={Mail} variant="secondary">
            Email us
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
