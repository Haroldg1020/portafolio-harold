import { useTranslations } from 'next-intl';
import * as motion from 'motion/react-client';
import { site } from '@/config/site';

export default function About() {
  const t = useTranslations('About');

  const rows = [
    { label: t('roleLabel'), value: t('role') },
    { label: t('focusLabel'), value: t('focus') },
    { label: t('locationLabel'), value: t('location') },
  ];

  return (
    <section id="about" className="py-20 md:py-24 px-6 max-w-6xl mx-auto min-h-screen flex items-center scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono text-accent mb-3 tracking-widest">01 /</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-primary flex items-center gap-4">
            <span className="w-8 md:w-12 h-[1px] bg-primary/20 block"></span>
            {t('title')}
          </h2>
          <p className="text-secondary text-base md:text-lg leading-relaxed font-light mb-8">
            {t('description')}
          </p>
          <div className="flex gap-4">
            {/* abstract visual nodes */}
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <div className="w-2 h-2 rounded-full bg-black/20 dark:bg-white/20"></div>
            <div className="w-2 h-2 rounded-full bg-black/10 dark:bg-white/10"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative group"
        >
          {/* Subtle glow behind the card */}
          <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-2xl blur-xl group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors duration-500"></div>

          <div className="relative glass-dark p-6 sm:p-8 rounded-2xl metal-edge shadow-sm">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-subtle">
              <h3 className="text-xl font-medium text-primary">{t('profile')}</h3>
              <div className="w-10 h-10 rounded-full border border-subtle flex items-center justify-center">
                <span className="text-xs font-bold text-secondary">HG</span>
              </div>
            </div>

            <dl className="space-y-6">
              {rows.map((row) => (
                <div key={row.label} className="flex justify-between items-center gap-4">
                  <dt className="text-muted text-sm">{row.label}</dt>
                  <dd className="text-primary font-medium text-right">{row.value}</dd>
                </div>
              ))}
              <div className="flex justify-between items-center gap-4">
                <dt className="text-muted text-sm">{t('emailLabel')}</dt>
                <dd className="text-right min-w-0">
                  <a href={`mailto:${site.email}`} className="text-primary font-medium hover:text-accent transition-colors break-all">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
