import { cn } from "@/lib/utils";

/** Long-form text styling for legal and explanatory pages. */
export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4 text-lg leading-relaxed text-text-primary",
        "[&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:font-extrabold [&_h2:first-child]:mt-0",
        "[&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-6",
        "[&_a]:font-semibold [&_a]:underline [&_a]:decoration-volt [&_a]:decoration-3 [&_a]:underline-offset-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
