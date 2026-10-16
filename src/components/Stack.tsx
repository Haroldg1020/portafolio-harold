"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const techStack = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", 
  "Node.js", "Python", "PostgreSQL", "Framer Motion",
  "Docker", "AWS", "Git", "Figma"
];

export default function Stack() {
  const t = useTranslations('Stack');

  return (
    <section id="stack" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold mb-16 text-center text-white"
      >
        {t('title')}
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {techStack.map((tech, index) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-dark metal-edge p-6 rounded-xl flex items-center justify-center cursor-pointer group"
          >
            <span className="text-gray-400 font-medium group-hover:text-white transition-colors duration-300">
              {tech}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
