import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

/** Canonical URL plus hreflang links for a path such as '/projects/foo'. */
export function alternates(path: string, locale: string): Metadata['alternates'] {
  const suffix = path === '/' ? '' : path;
  return {
    canonical: `/${locale}${suffix}`,
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${suffix}`])),
      'x-default': `/${routing.defaultLocale}${suffix}`,
    },
  };
}

export function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', timeZone: 'UTC' }).format(
    new Date(date)
  );
}
