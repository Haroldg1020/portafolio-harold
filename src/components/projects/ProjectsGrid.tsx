"use client";

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import ProjectCard from '@/components/projects/ProjectCard';
import type { Project } from '@/lib/content';

/** All projects with tag filters, used on the /projects page. */
export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const t = useTranslations('Projects');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) for (const tag of p.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag]) => tag);
  }, [projects]);

  const visible = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects;

  const chipClass = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-xs transition-colors cursor-pointer ${
      active ? 'border-accent bg-accent/10 text-accent' : 'border-subtle text-secondary hover:text-primary hover:border-[var(--border-strong)]'
    }`;

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter">
        <button type="button" onClick={() => setActiveTag(null)} aria-pressed={activeTag === null} className={chipClass(activeTag === null)}>
          {t('all')}
        </button>
        {tags.map((tag) => (
          <button key={tag} type="button" onClick={() => setActiveTag(tag)} aria-pressed={activeTag === tag} className={chipClass(activeTag === tag)}>
            {tag}
          </button>
        ))}
      </div>

      <motion.ul layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {visible.length === 0 && <p className="text-muted">{t('empty')}</p>}
    </>
  );
}
