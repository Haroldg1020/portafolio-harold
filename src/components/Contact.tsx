"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { useState } from 'react';

export default function Contact() {
  const t = useTranslations('Contact');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto min-h-[80vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
          {t('title')}
        </h2>
        <p className="text-xl text-secondary font-light">
          {t('cta')}
        </p>
      </motion.div>

      <div className="glass-dark metal-edge rounded-2xl p-6 sm:p-8 mb-12 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm text-secondary">{t('nameLabel')}</label>
              <input 
                id="name"
                type="text" 
                required
                className="w-full bg-black/5 dark:bg-black/50 border border-subtle rounded-lg px-4 py-3 text-primary placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-secondary">{t('emailLabel')}</label>
              <input 
                id="email"
                type="email" 
                required
                className="w-full bg-black/5 dark:bg-black/50 border border-subtle rounded-lg px-4 py-3 text-primary placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm text-secondary">{t('messageLabel')}</label>
            <textarea 
              id="message"
              rows={4}
              required
              className="w-full bg-black/5 dark:bg-black/50 border border-subtle rounded-lg px-4 py-3 text-primary placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={status !== 'idle'}
            className="w-full relative overflow-hidden group bg-black/5 dark:bg-white/5 border border-subtle rounded-lg px-6 py-4 transition-all duration-300 hover:border-accent disabled:opacity-50 cursor-pointer"
          >
            <div className="absolute inset-0 w-0 bg-accent/15 dark:bg-white/10 transition-all duration-500 ease-out group-hover:w-full"></div>
            <span className="relative z-10 text-primary font-medium tracking-wide">
              {status === 'submitting' ? '...' : status === 'success' ? '✓' : t('send')}
            </span>
          </button>
        </form>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center gap-6"
      >
        <a href="mailto:contact@haroldguerrero.com" className="group relative w-14 h-14 rounded-full metal-edge flex items-center justify-center overflow-hidden bg-black/5 dark:bg-white/5 shadow-sm">
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300"></div>
          <Mail className="text-secondary group-hover:text-accent transition-colors relative z-10" size={24} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group relative w-14 h-14 rounded-full metal-edge flex items-center justify-center overflow-hidden bg-black/5 dark:bg-white/5 shadow-sm">
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300"></div>
          <FaLinkedin className="text-secondary group-hover:text-accent transition-colors relative z-10" size={24} />
        </a>
        <a href="https://github.com/Haroldg1020" target="_blank" rel="noopener noreferrer" className="group relative w-14 h-14 rounded-full metal-edge flex items-center justify-center overflow-hidden bg-black/5 dark:bg-white/5 shadow-sm">
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300"></div>
          <FaGithub className="text-secondary group-hover:text-accent transition-colors relative z-10" size={24} />
        </a>
      </motion.div>
    </section>
  );
}
