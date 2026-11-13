import type { Accent, IconName } from "@/lib/content/domain/visual";

export type ServiceItem = {
  title: string;
  description: string;
  deliverables: string[];
  accent: Accent;
  icon: IconName;
};
