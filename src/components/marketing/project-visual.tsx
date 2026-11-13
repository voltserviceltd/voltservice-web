import { Tag } from "@/components/primitives/tag";
import type { ProjectItem } from "@/lib/content/domain/project-item";
import { cn } from "@/lib/utils";

const card =
  "grid w-full max-w-78 gap-3 rounded-2xl border-2 border-ink bg-white p-5 text-sm text-ink shadow-[6px_6px_0_var(--color-ink)] motion-safe:animate-[vs-float_5s_var(--ease-in-out-soft)_infinite]";

/** Decorative mock UI beside each project card (Figma "Product visual/*"). */
export function ProjectVisual({ kind }: { kind: ProjectItem["visual"] }) {
  if (kind === "paysmart") {
    return (
      <div aria-hidden className="grid min-h-60 place-items-center overflow-hidden rounded-3xl border-2 border-ink bg-blue p-8 md:min-h-90">
        <div className={cn(card, "-rotate-4")}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-base font-semibold">Weekly shift invoice</span>
            <Tag tone="mint">Sent</Tag>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-[#4a4339]">Night shifts · 3 × 12h</span>
            <span>£540.00</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-[#4a4339]">Travel</span>
            <span>£24.00</span>
          </div>
          <div className="flex items-center justify-between gap-2 border-t-[1.5px] border-ink pt-3 font-semibold">
            <span>Total</span>
            <span className="font-display text-xl font-bold">£564.00</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden className="grid min-h-60 place-items-center overflow-hidden rounded-3xl border-2 border-ink bg-lilac p-8 md:min-h-90">
      <div className={cn(card, "rotate-3 [animation-delay:-2s]")}>
        <span className="text-base font-semibold">Team · Kitchen refit crew</span>
        <div className="flex">
          {["bg-volt", "bg-coral", "bg-mint", "bg-pink"].map((bg) => (
            <span key={bg} className={cn("-mr-2.5 size-9 rounded-full border-2 border-ink", bg)} />
          ))}
        </div>
        <span className="text-[#4a4339]">4 members · 2 live projects</span>
        <div className="flex flex-wrap gap-2">
          <Tag tone="volt">Plastering</Tag>
          <Tag tone="paper" className="border-ink bg-white text-ink">
            Electrics
          </Tag>
        </div>
      </div>
    </div>
  );
}
