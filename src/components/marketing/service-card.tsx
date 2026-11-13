import { Check } from "lucide-react";
import { Card } from "@/components/primitives/card";
import { IconTile } from "@/components/primitives/icon-tile";
import { reveal } from "@/components/primitives/reveal";
import type { ServiceItem } from "@/lib/content/domain/service-item";

export function ServiceCard({
  item,
  index = 0,
  maxDeliverables,
}: {
  item: ServiceItem;
  index?: number;
  /** Show only the first N deliverables (homepage summary). */
  maxDeliverables?: number;
}) {
  const deliverables = maxDeliverables ? item.deliverables.slice(0, maxDeliverables) : item.deliverables;

  return (
    <Card interactive className="flex flex-col gap-4" {...reveal(index)}>
      <IconTile icon={item.icon} accent={item.accent} />
      <h3 className="font-display text-2xl leading-tight font-bold text-text-primary">{item.title}</h3>
      <p className="text-text-muted">{item.description}</p>
      <ul className="mt-auto flex flex-col gap-2 pt-2">
        {deliverables.map((deliverable) => (
          <li key={deliverable} className="flex items-start gap-2.5 text-sm text-text-primary">
            <Check aria-hidden className="mt-0.5 size-4.5 shrink-0" />
            {deliverable}
          </li>
        ))}
      </ul>
    </Card>
  );
}
