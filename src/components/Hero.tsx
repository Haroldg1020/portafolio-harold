import { useTranslations } from 'next-intl';
import * as motion from 'motion/react-client';
import { ArrowDown, Download } from 'lucide-react';
import SectionLink from '@/components/SectionLink';
import { site } from '@/config/site';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-page transition-colors duration-300 pt-32 pb-12">
      {/* Patrón geométrico sutil (Brutalist wireframe vibe) */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, var(--dots-color) 1.5px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      {/* Acentos de luz sutiles */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[1000px] h-[300px] bg-accent/10 dark:bg-accent/5 blur-[120px] rounded-[100%] rotate-45"></div>
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 flex flex-col items-start justify-center">

        {/* Micro-typography top bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col md:flex-row justify-between items-start md:items-center border-b border-subtle pb-4 mb-8 md:mb-12 gap-4 md:gap-0"
        >
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-secondary">
            <span className="text-accent mr-2">●</span> {t('areas')}
            <br/>
            <span className="text-accent mt-1 inline-block">{t('portfolio')} — {new Date().getFullYear()}</span>
          </p>
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-secondary text-left md:text-right">
            {t('role')}
            <br/>
            <span className="text-muted mt-1 inline-block">{t('location')}</span>
          </p>
        </motion.div>

        {site.available && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            {t('available')}
          </motion.p>
        )}

        {/* Tipografía Masiva (Brutalist style) */}
        <h1 className="w-full flex flex-col uppercase leading-[0.9] sm:leading-[0.85] select-none text-[13vw] sm:text-[14vw] md:text-[15vw] font-black tracking-tighter m-0">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative z-20 block w-fit text-primary"
          >
            {t('firstName')}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="block w-fit text-outline ml-[2vw] sm:ml-[4vw] md:ml-[5vw] cursor-default"
          >
            {t('lastName')}
          </motion.span>
        </h1>

        {/* Hook / Subtítulo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 md:mt-16 w-full flex flex-col md:flex-row justify-between items-start md:items-end border-t border-subtle pt-8 gap-8 md:gap-6"
        >
          <div className="max-w-md">
            <p className="text-sm md:text-base text-secondary font-light uppercase tracking-wider leading-relaxed">
              {t('hook')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <SectionLink
                section="projects"
                className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-xs font-bold tracking-[0.15em] uppercase text-white shadow-[0_0_30px_rgba(204,41,43,0.35)] hover:bg-accent-dark transition-colors"
              >
                {t('viewProjects')}
                <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
              </SectionLink>
              {site.cvUrl && (
                <a
                  href={site.cvUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-subtle bg-black/5 dark:bg-white/5 px-5 py-3 text-xs font-bold tracking-[0.15em] uppercase text-primary hover:border-accent hover:text-accent transition-colors"
                >
                  <Download size={14} />
                  {t('downloadCv')}
                </a>
              )}
            </div>
          </div>

          <SectionLink
            section="about"
            className="group flex items-center gap-4 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-primary hover:text-accent transition-colors"
          >
            {t('scroll')}
            <span className="w-8 h-[1px] bg-current group-hover:bg-accent transition-colors block"></span>
          </SectionLink>
        </motion.div>
      </div>

      {/* Decoración geométrica adicional (el círculo rojo) */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
        className="absolute bottom-[20%] right-[10%] z-0 hidden lg:block"
      >
        <div className="w-12 h-12 rounded-full bg-accent animate-pulse shadow-[0_0_30px_rgba(204,41,43,0.5)]"></div>
      </motion.div>

    </section>
  );
}
