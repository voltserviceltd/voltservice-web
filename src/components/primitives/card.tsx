import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  /** Lift on hover (cards that represent an item, not static notes). */
  interactive?: boolean;
} & Omit<React.ComponentProps<"div">, "children" | "className">;

/** Outlined "sticker" card with a hard shadow. */
export function Card({ children, className, interactive = false, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border-2 border-line bg-surface p-7 shadow-hard",
        interactive && "lift",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
