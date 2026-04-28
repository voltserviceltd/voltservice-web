import styles from "./GlassCard.module.css";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={[styles.glassCard, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
