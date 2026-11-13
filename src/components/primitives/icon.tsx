import {
  AppWindow,
  Building2,
  Calendar,
  Code,
  HardHat,
  LifeBuoy,
  Mail,
  MessageCircle,
  Monitor,
  Plug,
  Rocket,
  ShieldCheck,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/content/domain/visual";

/** Maps content icon names to lucide-react components. */
export const icons: Record<IconName, LucideIcon> = {
  monitor: Monitor,
  "app-window": AppWindow,
  workflow: Workflow,
  rocket: Rocket,
  "life-buoy": LifeBuoy,
  plug: Plug,
  building: Building2,
  code: Code,
  "shield-check": ShieldCheck,
  "hard-hat": HardHat,
  mail: Mail,
  zap: Zap,
  calendar: Calendar,
  "message-circle": MessageCircle,
  users: Users,
};
