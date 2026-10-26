"use client";

import { Link, usePathname } from '@/i18n/routing';
import { useGoToSection, type SectionId } from '@/lib/navigation';

interface SectionLinkProps extends Omit<React.ComponentProps<'a'>, 'href'> {
  section: SectionId | 'top';
}

/** Link to a home section: smooth-scrolls on the home page, navigates there from other pages. */
export default function SectionLink({ section, onClick, ...props }: SectionLinkProps) {
  const pathname = usePathname();
  const goToSection = useGoToSection();

  return (
    <Link
      href={section === 'top' ? '/' : `/#${section}`}
      onClick={(e) => {
        onClick?.(e);
        if (pathname !== '/') return;
        e.preventDefault();
        goToSection(section);
      }}
      {...props}
    />
  );
}
