import { Card } from "@/components/primitives/card";
import { IconTile } from "@/components/primitives/icon-tile";
import { reveal } from "@/components/primitives/reveal";
import type { FeatureItem } from "@/lib/content/domain/feature-item";

export function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Card key={item.title} interactive className="flex flex-col gap-4" {...reveal(index)}>
          {item.icon && <IconTile icon={item.icon} accent={item.accent} />}
          <p className="font-mono text-[0.8125rem] font-medium tracking-[0.08em] text-text-muted uppercase">
            {item.eyebrow}
          </p>
          <h3 className="font-display text-2xl leading-tight font-bold text-text-primary">
            {item.title}
          </h3>
          <p className="text-text-muted">{item.description}</p>
        </Card>
      ))}
    </div>
  );
}
