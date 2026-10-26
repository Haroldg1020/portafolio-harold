import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from '@/i18n/routing';
import ProjectCover from '@/components/projects/ProjectCover';
import { formatDate } from '@/lib/seo';
import type { Project } from '@/lib/content';

interface ProjectCardProps {
  project: Project;
  large?: boolean;
}

export default function ProjectCard({ project, large }: ProjectCardProps) {
  const t = useTranslations('Projects');
  const locale = useLocale();

  return (
    <article className="group relative h-full flex flex-col glass-dark metal-edge rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:border-accent/40 hover:-translate-y-1">
      <ProjectCover project={project} className={large ? 'aspect-[16/9] lg:aspect-auto lg:flex-1 lg:min-h-64' : 'aspect-[16/9]'} />

      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-3 text-xs font-mono text-muted">
          <span>{formatDate(project.date, locale)}</span>
          {project.status === 'in-progress' && (
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-accent">{t('inProgress')}</span>
          )}
        </div>

        <h3 className={`font-bold text-primary leading-tight ${large ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {/* The stretched link makes the whole card clickable */}
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.title}
          </Link>
        </h3>
        <p className="text-secondary font-light leading-relaxed">{project.summary}</p>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <ul className="flex flex-wrap gap-2">
            {project.tags.slice(0, large ? 5 : 3).map((tag) => (
              <li key={tag} className="rounded-md border border-subtle px-2 py-1 text-[11px] text-secondary">
                {tag}
              </li>
            ))}
          </ul>
          <div className="relative z-10 flex items-center gap-3 text-secondary">
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`${t('code')}: ${project.title}`} className="hover:text-accent transition-colors">
                <FaGithub size={18} />
              </a>
            )}
            <ArrowUpRight size={18} className="text-muted transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </div>
        </div>
      </div>
    </article>
  );
}
