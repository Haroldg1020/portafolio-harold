import { getLocale, getTranslations } from 'next-intl/server';
import * as motion from 'motion/react-client';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SectionHeading from '@/components/SectionHeading';
import ProjectCard from '@/components/projects/ProjectCard';
import { getProjects } from '@/lib/content';

/** Bento grid of featured projects on the home page. */
export default async function Projects() {
  const t = await getTranslations('Projects');
  const projects = await getProjects(await getLocale());
  const featured = projects.filter((p) => p.featured);
  const shown = (featured.length >= 3 ? featured : projects).slice(0, 3);

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto scroll-mt-20">
      <SectionHeading
        num="02"
        title={t('title')}
        subtitle={t('subtitle')}
        action={
          <Link href="/projects" className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-primary hover:text-accent transition-colors shrink-0">
            {t('viewAll')}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />

      <ul className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-6">
        {shown.map((project, index) => (
          <motion.li
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={index === 0 ? 'lg:row-span-2' : ''}
          >
            <ProjectCard project={project} large={index === 0} />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
