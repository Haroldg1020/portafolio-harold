import { ViewTransition } from 'react';
import Image from 'next/image';
import type { Project } from '@/lib/content';

interface ProjectCoverProps {
  project: Project;
  className?: string;
  priority?: boolean;
}

/** Project image, or a generated cover when the project has none. Morphs between list and detail pages. */
export default function ProjectCover({ project, className = '', priority }: ProjectCoverProps) {
  return (
    <ViewTransition name={`project-cover-${project.slug}`} share="morph">
      <div className={`relative overflow-hidden bg-card-solid ${className}`}>
        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <GeneratedCover project={project} />
        )}
        {!project.cover && project.logo && (
          <div className="absolute inset-0">
            <Image src={project.logo.light} alt={project.title} fill unoptimized className="object-contain p-[12%] dark:hidden" />
            <Image src={project.logo.dark} alt={project.title} fill unoptimized className="object-contain p-[12%] hidden dark:block" />
          </div>
        )}
      </div>
    </ViewTransition>
  );
}

function GeneratedCover({ project }: { project: Project }) {
  const monogram = project.title
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div aria-hidden className="absolute inset-0">
      <div
        className="absolute inset-0 opacity-60 dark:opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute -top-1/3 -right-1/4 w-2/3 aspect-square rounded-full bg-accent/25 blur-3xl transition-transform duration-700 group-hover:scale-125" />
      <div className="absolute -bottom-1/3 -left-1/4 w-1/2 aspect-square rounded-full bg-black/10 dark:bg-white/10 blur-3xl" />
      {!project.logo && (
        <span className="absolute bottom-2 right-4 text-[7rem] leading-none font-black tracking-tighter text-outline select-none">
          {monogram}
        </span>
      )}
      <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
        {project.tags[0]}
      </span>
    </div>
  );
}
