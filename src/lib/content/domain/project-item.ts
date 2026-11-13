import type { StaticImageData } from "next/image";
import type { TagTone } from "@/lib/content/domain/visual";

export type ProjectItem = {
  eyebrow: string;
  title: string;
  description: string;
  metrics: string[];
  tags: string[];
  /** Short status shown as a tag, e.g. "Live on Google Play". */
  status: string;
  statusTone: TagTone;
  url: string;
  urlLabel: string;
  /** Which decorative mock UI to show beside the copy. */
  visual: "paysmart" | "voltconnect";
  screenshots?: { src: StaticImageData; alt: string }[];
};
