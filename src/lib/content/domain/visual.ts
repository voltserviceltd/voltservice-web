/** Brand accent colours used by icon tiles, tags and number blobs. */
export type Accent = "volt" | "coral" | "blue" | "mint" | "lilac" | "pink" | "paper";

/** Tag tones: any accent, plus an outlined and an ink variant. */
export type TagTone = Accent | "outline" | "ink";

/**
 * Icon names used in content. Mapped to lucide-react components in
 * src/components/primitives/icon.tsx, so content files stay free of UI imports.
 */
export type IconName =
  | "monitor"
  | "app-window"
  | "workflow"
  | "rocket"
  | "life-buoy"
  | "plug"
  | "building"
  | "code"
  | "shield-check"
  | "hard-hat"
  | "mail"
  | "zap"
  | "calendar"
  | "message-circle"
  | "users";
