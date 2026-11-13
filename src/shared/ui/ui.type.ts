import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** Accent colours available to tiles, tags and blobs (Figma variables color/*). */
export type Accent = "volt" | "coral" | "blue" | "mint" | "lilac" | "pink" | "paper";

export type TagTone = Accent | "outline" | "ink";

export type ButtonVariant = "primary" | "secondary" | "dark";

export type SectionTone = "paper" | "deep" | "white" | "ink";

export type IconTileSize = "sm" | "md" | "lg";

export type SectionHeadingProps = {
  eyebrow: string;
  eyebrowTone?: TagTone;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  level?: 1 | 2;
  aside?: ReactNode;
};

export type IconComponent = LucideIcon;
