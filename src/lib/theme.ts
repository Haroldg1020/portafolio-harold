"use client";

import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

// On the server the theme is unknown until the inline script in <head> runs
const getServerSnapshot = (): Theme | null => null;

export function useTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Switches theme with a circular reveal from `origin` when the browser supports View Transitions. */
export function setTheme(theme: Theme, origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const apply = () => {
    root.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduceMotion) {
    apply();
    return;
  }

  root.style.setProperty('--vt-x', `${origin?.x ?? window.innerWidth / 2}px`);
  root.style.setProperty('--vt-y', `${origin?.y ?? 0}px`);
  root.classList.add('theme-transition');
  document.startViewTransition(apply).finished.finally(() => {
    root.classList.remove('theme-transition');
  });
}
