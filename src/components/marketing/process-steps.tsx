import { reveal } from "@/components/primitives/reveal";
import type { FeatureItem } from "@/lib/content/domain/feature-item";
import { cn } from "@/lib/utils";

const blobs = ["bg-coral", "bg-volt", "bg-lilac", "bg-mint", "bg-pink"];

/** "How we work" steps with number blobs that pop in on scroll (Figma "Step card"). */
export function ProcessSteps({ steps }: { steps: FeatureItem[] }) {
  return (
    <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
      {steps.map((step, index) => (
        <li key={step.title} className="flex flex-col items-start gap-4" {...reveal(index)}>
          <span
            aria-hidden
            data-pop
            className={cn(
              "grid size-16 place-items-center rounded-full border-2 border-ink font-display text-2xl font-extrabold text-ink shadow-[3px_3px_0_var(--color-ink)]",
              blobs[index % blobs.length],
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-2xl leading-tight font-bold text-text-primary">
            <span className="sr-only">{step.eyebrow}: </span>
            {step.title}
          </h3>
          <p className="text-text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
