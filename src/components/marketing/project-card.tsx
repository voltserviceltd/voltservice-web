import Image from "next/image";
import { reveal } from "@/components/primitives/reveal";
import { Tag } from "@/components/primitives/tag";
import { TextLink } from "@/components/primitives/text-link";
import { ProjectVisual } from "@/components/marketing/project-visual";
import type { ProjectItem } from "@/lib/content/domain/project-item";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  index = 0,
  withScreenshots = false,
}: {
  project: ProjectItem;
  index?: number;
  withScreenshots?: boolean;
}) {
  return (
    <article
      className="grid items-center gap-6 rounded-[2.25rem] border-2 border-line bg-surface p-4 shadow-hard-lg md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-12 md:p-6 md:pl-12"
      {...reveal(index)}
    >
      <div className="flex flex-col items-start gap-4 px-2 pb-4 md:order-first md:p-0">
        <Tag tone={project.statusTone} dot>
          {project.status}
        </Tag>
        <p className="font-mono text-[0.8125rem] font-medium tracking-[0.08em] text-text-muted uppercase">
          {project.eyebrow}
        </p>
        <h3 className="font-display text-[clamp(2.25rem,1.8rem+1.9vw,3.25rem)] leading-[1.05] font-extrabold tracking-[-0.015em] text-text-primary">
          {project.title}
        </h3>
        <p className="text-lg leading-relaxed text-text-muted">{project.description}</p>
        <ul aria-label="Highlights" className="flex flex-col gap-1.5 text-sm font-semibold text-text-primary">
          {project.metrics.map((metric) => (
            <li key={metric}>✺ {metric}</li>
          ))}
        </ul>
        <ul aria-label="Services involved" className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag tone="outline">{tag}</Tag>
            </li>
          ))}
        </ul>
        <TextLink href={project.url}>{project.urlLabel}</TextLink>
      </div>

      <div className="order-first md:order-last">
        <ProjectVisual kind={project.visual} />
      </div>

      {withScreenshots && project.screenshots && (
        <ul
          aria-label={`${project.title} screenshots`}
          className={cn("grid grid-cols-3 gap-3 md:col-span-2 md:gap-6 md:pr-6")}
        >
          {project.screenshots.map((shot) => (
            <li key={shot.alt}>
              <Image
                src={shot.src}
                alt={shot.alt}
                width={480}
                height={1014}
                sizes="(min-width: 768px) 240px, 30vw"
                className="mx-auto h-auto w-full max-w-60"
              />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
