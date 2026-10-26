import { useTranslations } from 'next-intl';
import * as motion from 'motion/react-client';
import SectionHeading from '@/components/SectionHeading';
import { stack, type StackCategory } from '@/content/stack';

export default function Stack() {
  const t = useTranslations('Stack');
  const categories = Object.entries(stack) as [StackCategory, (typeof stack)[StackCategory]][];

  return (
    <section id="stack" className="py-24 px-6 max-w-6xl mx-auto scroll-mt-20">
      <SectionHeading num="04" title={t('title')} subtitle={t('subtitle')} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(([category, techs], catIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: catIndex * 0.08 }}
            className="glass-dark metal-edge rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted mb-5 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
              {t(`categories.${category}`)}
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {techs.map(({ name, icon: Icon, color }) => (
                <li
                  key={name}
                  style={{ '--brand': color } as React.CSSProperties}
                  className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-subtle bg-black/[0.03] dark:bg-white/[0.03] px-3 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand)]/50 hover:shadow-[0_8px_24px_-12px_var(--brand)]"
                >
                  <Icon size={26} className="text-secondary transition-colors duration-300 group-hover:text-[var(--brand)]" aria-hidden />
                  <span className="text-xs font-medium text-secondary group-hover:text-primary transition-colors text-center">{name}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
