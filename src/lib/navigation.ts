"use client";

import { useCallback } from 'react';
import { useLenis } from 'lenis/react';
import { usePathname, useRouter } from '@/i18n/routing';

export const sectionIds = ['about', 'projects', 'experience', 'stack', 'notes', 'contact'] as const;
export type SectionId = (typeof sectionIds)[number];

/** Smooth-scrolls to a home section, navigating to the home page first when needed. */
export function useGoToSection() {
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (id: SectionId | 'top') => {
      if (pathname !== '/') {
        router.push(id === 'top' ? '/' : `/#${id}`);
        return;
      }
      const target = id === 'top' ? 0 : document.getElementById(id);
      if (target === null) return;
      if (lenis) {
        // Sections set scroll-margin-top for the fixed header, which Lenis respects
        lenis.scrollTo(target);
      } else if (typeof target === 'number') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      history.replaceState(null, '', id === 'top' ? window.location.pathname : `#${id}`);
    },
    [lenis, pathname, router]
  );
}
