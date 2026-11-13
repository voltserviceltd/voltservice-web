import type { Accent, IconName } from "@/lib/content/domain/visual";

export type FeatureItem = {
  eyebrow: string;
  title: string;
  description: string;
  accent?: Accent;
  icon?: IconName;
};
