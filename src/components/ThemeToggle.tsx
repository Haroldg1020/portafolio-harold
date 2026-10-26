"use client";

import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { setTheme, useTheme } from '@/lib/theme';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const t = useTranslations('Navigation');
  const theme = useTheme();

  // Render a placeholder with identical dimensions until the theme is known
  if (theme === null) {
    return (
      <div
        aria-hidden="true"
        className={`w-8 h-8 rounded-lg border border-subtle bg-black/5 dark:bg-white/5 ${className}`}
      />
    );
  }

  const isDark = theme === 'dark';
  const label = isDark ? t('toLight') : t('toDark');

  return (
    <button
      type="button"
      onClick={(e) => setTheme(isDark ? 'light' : 'dark', { x: e.clientX, y: e.clientY })}
      aria-label={label}
      title={label}
      className={`relative w-8 h-8 flex items-center justify-center rounded-lg border border-subtle bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200 cursor-pointer overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -12, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 12, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
          className={isDark ? 'text-yellow-400' : 'text-zinc-800'}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
