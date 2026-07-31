import { Card } from "@/components/primitives/card";
import type { ServiceItem } from "@/lib/content/domain/service-item";

export function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
      <p className="mt-2 text-sm text-text-muted">{item.description}</p>
      <ul className="mt-4 flex flex-col gap-2">
        {item.deliverables.map((deliverable) => (
          <li
            key={deliverable}
            className="flex items-start gap-2 text-sm text-text-primary"
          >
            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-secondary" />
            {deliverable}
          </li>
        ))}
      </ul>
    </Card>
  );
}
