"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function About() {
  const t = useTranslations('About');

  return (
    <section id="about" className="py-20 md:py-24 px-6 max-w-6xl mx-auto min-h-screen flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
        >
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
            
            <ul className="space-y-6">
              <li className="flex justify-between items-center">
                <span className="text-muted text-sm">{t('roleLabel')}</span>
                <span className="text-primary font-medium">{t('role')}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-muted text-sm">{t('focusLabel')}</span>
                <span className="text-primary font-medium">{t('focus')}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-muted text-sm">{t('locationLabel')}</span>
                <span className="text-primary font-medium">{t('location')}</span>
              </li>
            </ul>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
