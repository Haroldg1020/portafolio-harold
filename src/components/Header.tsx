"use client";

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useRef, useTransition, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { useLenis } from 'lenis/react';
import { Menu, X, Search } from 'lucide-react';

import ThemeToggle from '@/components/ThemeToggle';
import { openCommandPalette } from '@/components/CommandPalette';
import { sectionIds, useGoToSection, type SectionId } from '@/lib/navigation';
import { site } from '@/config/site';

/** Tracks which home section is in the middle of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export default function Header() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const lenis = useLenis();
  const goToSection = useGoToSection();
  const [isPending, startTransition] = useTransition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const isHome = pathname === '/';
  const activeSection = useActiveSection(isHome);
  const currentPage: SectionId | null = pathname.startsWith('/projects')
    ? 'projects'
    : pathname.startsWith('/blog')
      ? 'notes'
      : activeSection;

  // Prefetch alternate locale so switching is instantaneous
  useEffect(() => {
    const alternateLocale = currentLocale === 'es' ? 'en' : 'es';
    router.prefetch(pathname, { locale: alternateLocale });
  }, [currentLocale, pathname, router]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Freeze page scroll behind the open mobile menu
  useEffect(() => {
    if (mobileMenuOpen) lenis?.stop();
    else lenis?.start();
  }, [mobileMenuOpen, lenis]);

  useMotionValueEvent(scrollY, "change", () => {
    document.body.classList.add('is-scrolling');
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      document.body.classList.remove('is-scrolling');
    }, 400);
  });

  const handleSelectLocale = (nextLocale: 'es' | 'en') => {
    if (nextLocale === currentLocale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  };

  const handleNavClick = (e: React.MouseEvent, id: SectionId | 'top') => {
    setMobileMenuOpen(false);
    if (!isHome) return; // let <Link> navigate to the home page
    e.preventDefault();
    goToSection(id);
  };

  const navLinks = sectionIds.map((id, i) => ({
    id,
    num: String(i + 1).padStart(2, '0'),
    name: t(id),
  }));

  const localeButtonClass = (locale: string) =>
    `px-1.5 py-0.5 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-200 rounded ${
      currentLocale === locale ? 'text-primary bg-black/10 dark:bg-white/10 font-black' : 'text-secondary hover:text-primary'
    } ${isPending ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`;

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[60]"
      />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:py-6 md:px-12 backdrop-blur-md bg-header border-b border-subtle transition-colors duration-300"
      >
        <div className="w-full flex items-center justify-between gap-4">
          <Link href="/" onClick={(e) => handleNavClick(e, 'top')} className="flex items-center gap-3 group">
            <div className="relative h-8 md:h-10 flex items-center transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/logo-hg.png"
                alt={site.name}
                width={40}
                height={40}
                priority
                className="h-full w-auto object-contain dark:brightness-100 brightness-90"
              />
            </div>
            <span className="font-bold tracking-widest text-sm text-primary hidden sm:block">
              HG
            </span>
          </Link>

          {/* Minimalist Micro-Typography Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <Link
                  key={link.id}
                  href={`/#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative text-xs font-bold tracking-widest uppercase flex gap-2 items-baseline transition-colors ${
                    isActive ? 'text-accent' : 'text-secondary hover:text-accent'
                  }`}
                >
                  <span className={`font-light transition-colors ${isActive ? 'text-accent' : 'text-muted group-hover:text-accent'}`}>
                    {link.num}
                  </span>
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-2 left-0 right-0 h-px bg-accent"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            {/* Command palette trigger */}
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label={t('search')}
              className="flex items-center gap-2 h-8 px-2 md:px-2.5 rounded-lg border border-subtle bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-secondary hover:text-primary transition-colors cursor-pointer"
            >
              <Search size={14} />
              <kbd className="hidden md:inline-block whitespace-nowrap">Ctrl K</kbd>
            </button>

            <ThemeToggle />

            {/* Language Switcher */}
            <div className="flex items-center gap-1 border-l border-subtle pl-3 md:pl-4">
              <button
                type="button"
                onClick={() => handleSelectLocale('es')}
                disabled={isPending}
                aria-label={t('switchToEs')}
                className={localeButtonClass('es')}
              >
                ES
              </button>
              <span className="text-muted text-[10px] select-none">/</span>
              <button
                type="button"
                onClick={() => handleSelectLocale('en')}
                disabled={isPending}
                aria-label={t('switchToEn')}
                className={localeButtonClass('en')}
              >
                EN
              </button>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 text-secondary hover:text-primary transition-colors rounded-lg bg-black/5 dark:bg-white/5 border border-subtle cursor-pointer"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer (sits under the fixed header) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            data-lenis-prevent
            className="fixed inset-0 z-40 bg-page/95 backdrop-blur-2xl px-6 pt-28 pb-10 flex flex-col justify-between lg:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={`/#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`flex items-center gap-4 text-xl font-bold tracking-widest uppercase hover:text-accent transition-colors py-2 border-b border-subtle ${
                    currentPage === link.id ? 'text-accent' : 'text-primary'
                  }`}
                >
                  <span className="text-xs font-mono text-accent font-normal">{link.num}</span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>

            <div className="pt-6 border-t border-subtle">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-secondary">
                {site.name} — {new Date().getFullYear()}
              </p>
              <p className="text-[10px] tracking-widest uppercase text-muted mt-1">
                {site.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
