import type { DemoScenario } from "@/lib/content/domain/demo-scenario";

/**
 * Static, non-animated rendering of a product demo scenario — deliberately
 * simpler than the original Flutter version's animated stepper (see
 * doc/nextjs-migration-plan.md content-cleanup notes): the goal is a clean
 * B2B site, not a gimmick.
 */
export function ProductPreview({ scenario }: { scenario: DemoScenario }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
        {scenario.eyebrow}
      </p>
      <h3 className="mt-2 text-2xl font-semibold text-text-primary">
        {scenario.title}
      </h3>
      <p className="mt-2 max-w-2xl text-text-muted">{scenario.description}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {scenario.steps.map((step) => (
          <div
            key={step.label}
            className="rounded-lg border border-border-subtle bg-surface p-6"
          >
            <span className="inline-block rounded-full bg-background-subtle px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-text-primary">
              {step.label}
            </span>
            <h4 className="mt-3 font-semibold text-text-primary">
              {step.title}
            </h4>
            <p className="mt-2 text-sm text-text-muted">{step.description}</p>

            <dl className="mt-4 flex flex-col gap-1 text-sm">
              {step.metrics.map((metric) => (
                <div key={metric.label} className="flex justify-between gap-4">
                  <dt className="text-text-muted">{metric.label}</dt>
                  <dd className="font-medium text-text-primary">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>

            <pre className="mt-4 overflow-x-auto rounded-lg bg-surface-inverse p-3 text-xs text-text-on-inverse">
              {step.codeLines.join("\n")}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
