import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import PageHeader from '@/components/PageHeader';
import ProjectCover from '@/components/projects/ProjectCover';
import { getProject, projectSlugs } from '@/lib/content';
import { alternates, formatDate } from '@/lib/seo';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = await getProject(slug, locale);
  if (!result) return {};
  return {
    title: result.project.title,
    description: result.project.summary,
    alternates: alternates(`/projects/${slug}`, locale),
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const result = await getProject(slug, locale);
  if (!result) notFound();

  const { project, Content } = result;
  const t = await getTranslations('Projects');

  const buttonClass =
    'inline-flex items-center gap-2 rounded-lg border border-subtle bg-black/5 dark:bg-white/5 px-4 py-2.5 text-xs font-bold tracking-[0.15em] uppercase text-primary hover:border-accent hover:text-accent transition-colors';

  return (
    <main className="max-w-4xl mx-auto px-6 pt-36 pb-12">
      <PageHeader back={{ href: '/projects', label: t('back') }} title={project.title} subtitle={project.summary}>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <span className="text-xs font-mono text-muted">{formatDate(project.date, locale)}</span>
          {project.status === 'in-progress' && (
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs text-accent">{t('inProgress')}</span>
          )}
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-md border border-subtle px-2 py-1 text-[11px] text-secondary">{tag}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className={buttonClass}>
              <FaGithub size={14} /> {t('code')}
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className={buttonClass}>
              <ExternalLink size={14} /> {t('demo')}
            </a>
          )}
        </div>
      </PageHeader>

      <ProjectCover project={project} priority className="aspect-[16/9] rounded-2xl border border-subtle mb-12" />

      <article className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:before:content-none prose-code:after:content-none">
        <Content />
      </article>
    </main>
  );
}
