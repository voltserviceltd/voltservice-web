import Image from "next/image";

import { IconTile } from "@/shared/ui/icon-tile";
import { reveal } from "@/shared/ui/reveal";
import { Tag } from "@/shared/ui/tag";
import { TextLink } from "@/shared/ui/text-link";

import { companyFacts, founderProfile } from "../content/content";
import styles from "./blocks.module.css";

/** Homepage / About: founder photo, intro and company facts. */
export function FounderBlock({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const f = founderProfile;

  return (
    <div className={styles.founder}>
      <figure className={styles.photoFrame} {...reveal(0)}>
        <Image
          alt={f.imageAlt}
          className={styles.photo}
          height={f.imageHeight}
          sizes="(max-width: 900px) 90vw, 440px"
          src={f.image}
          width={f.imageWidth}
        />
        <figcaption className={styles.photoCaption}>
          <span className={styles.photoName}>{f.name}</span>
          <span>{f.role}</span>
        </figcaption>
      </figure>

      <div className={styles.founderCopy} {...reveal(1)}>
        <Tag tone="volt">Who you&apos;ll work with</Tag>
        <Heading className={styles.founderTitle}>A small team, and a direct line to the person building it.</Heading>
        <p className={styles.lead}>{f.summary}</p>
        {f.bio.map((p) => (
          <p className={styles.cardBody} key={p}>
            {p}
          </p>
        ))}
        <ul className={styles.facts}>
          {companyFacts.map((fact) => (
            <li key={fact.text}>
              <IconTile color={fact.color} icon={fact.icon} size="sm" />
              <span>{fact.text}</span>
            </li>
          ))}
        </ul>
        <TextLink href={f.linkedinUrl}>{f.name} on LinkedIn</TextLink>
      </div>
    </div>
  );
}
