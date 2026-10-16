"use client";

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    setIsDark(isCurrentlyDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Render a placeholder with identical dimensions to prevent layout shift before mount
  if (!mounted) {
    return (
      <div 
        aria-hidden="true" 
        className={`w-8 h-8 rounded-lg border border-subtle bg-black/5 dark:bg-white/5 ${className}`} 
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo Claro" : "Modo Oscuro"}
      className={`relative w-8 h-8 flex items-center justify-center rounded-lg border border-subtle bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200 cursor-pointer overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ y: -12, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 12, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
            className="text-yellow-400"
          >
            <Sun size={16} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: -12, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 12, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
            className="text-zinc-800"
          >
            <Moon size={16} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
