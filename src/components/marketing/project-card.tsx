import { Card } from "@/components/primitives/card";
import type { ProjectItem } from "@/lib/content/domain/project-item";

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <Card>
      <p className="text-xs font-semibold uppercase tracking-wide text-accent-primary">
        {project.eyebrow}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-text-primary">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-text-muted">{project.description}</p>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-text-primary">
        {project.metrics.map((metric) => (
          <li key={metric}>{metric}</li>
        ))}
      </ul>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-background-subtle px-3 py-1 text-xs font-medium text-text-primary"
          >
            {tag}
          </li>
        ))}
      </ul>
    </Card>
  );
}
