"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Experience() {
  const t = useTranslations('Experience');

  const experiences = [
    { role: t('role1'), desc: t('desc1'), year: t('year1') },
    { role: t('role2'), desc: t('desc2'), year: t('year2') },
  ];

  return (
    <section id="experience" className="py-24 px-6 max-w-4xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold mb-16 text-center text-primary"
      >
        {t('title')}
      </motion.h2>

      <div className="relative border-l border-subtle ml-4 md:ml-0 md:pl-0">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="mb-12 relative pl-8 md:pl-16 group"
          >
            {/* Hardware node */}
            <div className="absolute left-[-5px] md:left-[-5px] top-1 w-2.5 h-2.5 bg-page border border-accent rounded-full group-hover:bg-accent group-hover:shadow-[0_0_10px_rgba(204,41,43,0.5)] transition-all duration-300"></div>
            
            <div className="glass-dark metal-edge p-6 rounded-xl hover:border-accent/40 transition-colors duration-300 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors"></div>
              
              <span className="text-xs text-accent tracking-wider font-semibold font-mono mb-2 block">{exp.year}</span>
              <h3 className="text-xl font-bold text-primary mb-3">{exp.role}</h3>
              <p className="text-secondary font-light leading-relaxed">{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
