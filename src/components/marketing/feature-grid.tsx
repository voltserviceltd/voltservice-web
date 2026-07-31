import { Card } from "@/components/primitives/card";
import type { FeatureItem } from "@/lib/content/domain/feature-item";

export function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.title}>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
            {item.eyebrow}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-text-primary">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-text-muted">{item.description}</p>
        </Card>
      ))}
    </div>
  );
}
