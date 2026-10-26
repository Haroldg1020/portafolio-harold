import { getLocale, getTranslations } from 'next-intl/server';
import * as motion from 'motion/react-client';
import { FaGithub } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';
import { getGitHubStats, languageColors } from '@/lib/github';
import { formatDate } from '@/lib/seo';
import { site } from '@/config/site';

const fallbackColor = 'var(--text-muted)';

export default async function GitHubActivity() {
  const stats = await getGitHubStats();
  if (!stats) return null;

  const t = await getTranslations('GitHub');
  const locale = await getLocale();

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
            <p className="text-xs text-muted mb-3">{t('recent')}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stats.recent.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col gap-2 rounded-xl border border-subtle p-4 hover:border-accent/40 transition-colors"
                  >
                    <span className="flex items-center justify-between gap-2 font-medium text-primary group-hover:text-accent transition-colors">
                      <span className="truncate">{repo.name}</span>
                      <ArrowUpRight size={14} className="shrink-0 text-muted group-hover:text-accent" />
                    </span>
                    <span className="text-xs text-secondary line-clamp-2 flex-1">{repo.description ?? t('noDescription')}</span>
                    <span className="flex items-center gap-3 text-[11px] text-muted">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ background: languageColors[repo.language] ?? fallbackColor }} />
                          {repo.language}
                        </span>
                      )}
                      <span>{formatDate(repo.pushedAt, locale)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
