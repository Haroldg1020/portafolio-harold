import { getLocale, getTranslations } from 'next-intl/server';
import * as motion from 'motion/react-client';
import { FaGithub } from 'react-icons/fa';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getGitHubStats, languageColors } from '@/lib/github';
import { formatDate } from '@/lib/seo';
import { getProjects } from '@/lib/content';
import { site } from '@/config/site';

const fallbackColor = 'var(--text-muted)';

export default async function GitHubActivity() {
  const stats = await getGitHubStats();
  if (!stats) return null;

  const t = await getTranslations('GitHub');
  const locale = await getLocale();
  const projects = await getProjects(locale);

  // Hand-picked cards: live data for public repos, portfolio data for projects without one
  const cards = site.github.showcase.flatMap((item) => {
    if ('repo' in item) {
      const repo = stats.repos.find((r) => r.name === item.repo);
      return repo
        ? [{ key: repo.name, title: repo.name, href: repo.url, external: true, description: repo.description, label: repo.language, date: repo.pushedAt }]
        : [];
    }
    const project = projects.find((p) => p.slug === item.project);
    return project
      ? [{ key: project.slug, title: project.title, href: `/projects/${project.slug}`, external: false, description: project.summary, label: project.tags[0], date: project.date }]
      : [];
  });

  return (
    <section aria-labelledby="github-title" className="px-6 max-w-6xl mx-auto pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="glass-dark metal-edge rounded-2xl p-6 md:p-8 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <FaGithub size={28} className="text-primary" />
            <div>
              <h3 id="github-title" className="text-lg font-bold text-primary">{t('title')}</h3>
              <p className="text-sm text-muted">{t('subtitle')}</p>
            </div>
          </div>
          <a
            href={site.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-primary hover:text-accent transition-colors"
          >
            {t('viewProfile')}
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
          <div className="space-y-6">
            <dl className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-subtle p-4">
                <dt className="text-xs text-muted">{t('repos')}</dt>
                <dd className="text-3xl font-bold text-primary mt-1">{stats.repoCount}</dd>
              </div>
              <div className="rounded-xl border border-subtle p-4">
                <dt className="text-xs text-muted">{t('stars')}</dt>
                <dd className="text-3xl font-bold text-primary mt-1">{stats.stars}</dd>
              </div>
            </dl>

            <div>
              <p className="text-xs text-muted mb-3">{t('languages')}</p>
              <div className="flex h-2 rounded-full overflow-hidden bg-black/5 dark:bg-white/5">
                {stats.languages.map((lang) => (
                  <span
                    key={lang.name}
                    style={{ width: `${lang.percent}%`, background: languageColors[lang.name] ?? fallbackColor }}
                    title={`${lang.name} ${lang.percent}%`}
                  />
                ))}
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                {stats.languages.map((lang) => (
                  <li key={lang.name} className="flex items-center gap-1.5 text-xs text-secondary">
                    <span className="w-2 h-2 rounded-full" style={{ background: languageColors[lang.name] ?? fallbackColor }} />
                    {lang.name} <span className="text-muted">{lang.percent}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted mb-3">{t('featured')}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cards.map((card) => {
                const content = (
                  <>
                    <span className="flex items-center justify-between gap-2 font-medium text-primary group-hover:text-accent transition-colors">
                      <span className="flex items-center gap-2 truncate">
                        {card.external && <FaGithub size={14} className="shrink-0 text-muted" />}
                        <span className="truncate">{card.title}</span>
                      </span>
                      {card.external ? (
                        <ArrowUpRight size={14} className="shrink-0 text-muted group-hover:text-accent" />
                      ) : (
                        <ArrowRight size={14} className="shrink-0 text-muted group-hover:text-accent" />
                      )}
                    </span>
                    <span className="text-xs text-secondary line-clamp-2 flex-1">{card.description ?? t('noDescription')}</span>
                    <span className="flex items-center gap-3 text-[11px] text-muted">
                      {card.label && (
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ background: languageColors[card.label] ?? fallbackColor }} />
                          {card.label}
                        </span>
                      )}
                      <span>{formatDate(card.date, locale)}</span>
                    </span>
                  </>
                );
                const className = 'group flex h-full flex-col gap-2 rounded-xl border border-subtle p-4 hover:border-accent/40 transition-colors';
                return (
                  <li key={card.key}>
                    {card.external ? (
                      <a href={card.href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
                    ) : (
                      <Link href={card.href} className={className}>{content}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
