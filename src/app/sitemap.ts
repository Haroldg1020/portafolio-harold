import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { postSlugs, projectSlugs } from '@/lib/content';
import { site } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    '/projects',
    '/blog',
    ...projectSlugs.map((slug) => `/projects/${slug}`),
    ...postSlugs.map((slug) => `/blog/${slug}`),
  ];

  return paths.map((path) => ({
    url: `${site.url}/${routing.defaultLocale}${path}`,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((locale) => [locale, `${site.url}/${locale}${path}`])),
    },
  }));
}
