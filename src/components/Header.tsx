"use client";

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useRef, useTransition, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

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

  useMotionValueEvent(scrollY, "change", () => {
    if (typeof document !== 'undefined') {
      document.body.classList.add('is-scrolling');
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 400);
    }
  });

  const handleSelectLocale = (nextLocale: 'es' | 'en') => {
    if (nextLocale === currentLocale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  };

  const navLinks = [
    { num: '01', name: t('about'), href: '#about' },
    { num: '02', name: t('experience'), href: '#experience' },
    { num: '03', name: t('stack'), href: '#stack' },
    { num: '04', name: t('contact'), href: '#contact' },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 origin-left z-[60]"
      />
      
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:py-6 md:px-12 backdrop-blur-md bg-carbon/60 border-b border-white/5"
      >
        <div className="w-full flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 group">
            {/* Logo sin recuadro, ajustado a la estética */}
            <div className="relative h-8 md:h-10 w-auto flex items-center transition-transform duration-500 group-hover:scale-105">
              <img 
                src="/logo-hg.png" 
                alt="HG Logo" 
                className="h-full w-auto object-contain"
              />
            </div>
            <span className="font-bold tracking-widest text-sm text-white hidden sm:block">
              HG
            </span>
          </a>

          {/* Minimalist Micro-Typography Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="group text-[10px] md:text-xs font-bold tracking-widest text-gray-400 hover:text-red-500 transition-colors uppercase flex gap-2 items-baseline"
              >
                <span className="text-gray-600 font-light group-hover:text-red-400 transition-colors">{link.num}</span>
                <span>{link.name}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-6">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 border-l border-white/10 pl-3 md:pl-6">
              <button 
                type="button"
                onClick={() => handleSelectLocale('es')}
                disabled={isPending}
                aria-label="Cambiar a Español"
                className={`px-1.5 py-0.5 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-200 rounded ${
                  currentLocale === 'es' ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white'
                } ${isPending ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
              >
                ES
              </button>
              <span className="text-gray-600 text-[10px] select-none">/</span>
              <button 
                type="button"
                onClick={() => handleSelectLocale('en')}
                disabled={isPending}
                aria-label="Switch to English"
                className={`px-1.5 py-0.5 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-200 rounded ${
                  currentLocale === 'en' ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white'
                } ${isPending ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
              >
                EN
              </button>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-lg bg-white/5 border border-white/10"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 top-[69px] z-40 bg-carbon/95 backdrop-blur-2xl px-6 py-10 flex flex-col justify-between md:hidden border-b border-white/10"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-4 text-xl font-bold tracking-widest uppercase text-gray-300 hover:text-red-500 transition-colors py-2 border-b border-white/5"
                >
                  <span className="text-xs font-mono text-red-500 font-normal">{link.num}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </nav>

            <div className="pt-6 border-t border-white/10">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
                HAROLD GUERRERO — {new Date().getFullYear()}
              </p>
              <p className="text-[10px] tracking-widest uppercase text-gray-600 mt-1">
                CALI, COLOMBIA
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
