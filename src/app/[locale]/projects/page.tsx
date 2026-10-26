import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import PageHeader from '@/components/PageHeader';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import { getProjects } from '@/lib/content';
import { alternates } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Projects' });
  return {
    title: t('title'),
    description: t('pageDescription'),
    alternates: alternates('/projects', locale),
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Projects');
  const tNav = await getTranslations('Navigation');
  const projects = await getProjects(locale);

  return (
    <main className="max-w-6xl mx-auto px-6 pt-36 pb-12">
      <PageHeader back={{ href: '/', label: tNav('home') }} title={t('title')} subtitle={t('subtitle')} />
      <ProjectsGrid projects={projects} />
    </main>
  );
}
