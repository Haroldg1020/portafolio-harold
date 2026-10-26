"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { useLenis } from 'lenis/react';
import {
  ArrowRight, Copy, FileText, FolderGit2, Globe, Mail, Moon, Search, Sun, User, Briefcase, Layers,
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { usePathname, useRouter } from '@/i18n/routing';
import { sectionIds, useGoToSection, type SectionId } from '@/lib/navigation';
import { setTheme, useTheme } from '@/lib/theme';
import { site } from '@/config/site';

const OPEN_EVENT = 'open-command-palette';

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

type Command = {
  id: string;
  group: 'navigate' | 'actions' | 'links';
  label: string;
  icon: React.ReactNode;
  run: () => void;
};

const sectionIcons: Record<SectionId, React.ReactNode> = {
  about: <User size={16} />,
  projects: <FolderGit2 size={16} />,
  experience: <Briefcase size={16} />,
  stack: <Layers size={16} />,
  notes: <FileText size={16} />,
  contact: <Mail size={16} />,
};

export default function CommandPalette() {
  const t = useTranslations('Command');
  const tNav = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  const theme = useTheme();
  const goToSection = useGoToSection();
  const [, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const close = () => {
    setOpen(false);
    setQuery('');
    setSelected(0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(id);
  }, [toast]);

  const commands = useMemo<Command[]>(() => {
    const otherLocale = locale === 'es' ? 'en' : 'es';
    return [
      ...sectionIds.map((id) => ({
        id: `section-${id}`,
        group: 'navigate' as const,
        label: tNav(id),
        icon: sectionIcons[id],
        run: () => goToSection(id),
      })),
      {
        id: 'theme',
        group: 'actions',
        label: t('toggleTheme'),
        icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />,
        run: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      },
      {
        id: 'language',
        group: 'actions',
        label: t('switchLanguage'),
        icon: <Globe size={16} />,
        run: () => startTransition(() => router.replace(pathname, { locale: otherLocale, scroll: false })),
      },
      {
        id: 'copy-email',
        group: 'actions',
        label: `${t('copyEmail')} · ${site.email}`,
        icon: <Copy size={16} />,
        run: () => {
          navigator.clipboard?.writeText(site.email).then(() => setToast(t('emailCopied')), () => {});
        },
      },
      {
        id: 'github',
        group: 'links',
        label: 'GitHub',
        icon: <FaGithub size={16} />,
        run: () => window.open(site.github.url, '_blank', 'noopener'),
      },
      {
        id: 'linkedin',
        group: 'links',
        label: 'LinkedIn',
        icon: <FaLinkedin size={16} />,
        run: () => window.open(site.linkedin, '_blank', 'noopener'),
      },
    ];
  }, [goToSection, locale, pathname, router, t, tNav, theme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  const runCommand = (command: Command) => {
    close();
    command.run();
  };

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => (s + 1) % Math.max(filtered.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => (s - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === 'Enter' && filtered[selected]) {
      e.preventDefault();
      runCommand(filtered[selected]);
    } else if (e.key === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  const groups = (['navigate', 'actions', 'links'] as const)
    .map((group) => ({ group, items: filtered.filter((c) => c.group === group) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm flex items-start justify-center px-4 pt-[15vh]"
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t('placeholder')}
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="w-full max-w-lg rounded-2xl border border-subtle bg-card-solid shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 border-b border-subtle">
                <Search size={16} className="text-muted shrink-0" />
                <input
                  ref={inputRef}
                  autoFocus
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelected(0);
                  }}
                  onKeyDown={onInputKeyDown}
                  placeholder={t('placeholder')}
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="command-list"
                  aria-activedescendant={filtered[selected] ? `cmd-${filtered[selected].id}` : undefined}
                  className="w-full bg-transparent py-4 text-sm text-primary placeholder:text-muted focus:outline-none"
                />
                <kbd>Esc</kbd>
              </div>

              <ul id="command-list" ref={listRef} role="listbox" data-lenis-prevent className="max-h-80 overflow-y-auto p-2">
                {groups.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">{t('empty')}</li>}
                {groups.map(({ group, items }) => (
                  <li key={group} role="presentation">
                    <p className="px-3 pt-3 pb-1 text-[10px] font-bold tracking-[0.2em] uppercase text-muted">{t(group)}</p>
                    <ul role="presentation">
                      {items.map((command) => {
                        const index = filtered.indexOf(command);
                        const isSelected = index === selected;
                        return (
                          <li
                            key={command.id}
                            id={`cmd-${command.id}`}
                            role="option"
                            aria-selected={isSelected}
                            onMouseMove={() => setSelected(index)}
                            onClick={() => runCommand(command)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors ${
                              isSelected ? 'bg-accent/10 text-accent' : 'text-secondary'
                            }`}
                          >
                            <span className="shrink-0">{command.icon}</span>
                            <span className="flex-1 truncate">{command.label}</span>
                            {isSelected && <ArrowRight size={14} />}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between px-4 py-2.5 border-t border-subtle text-[11px] text-muted">
                <span>
                  <kbd>↑</kbd> <kbd>↓</kbd> <kbd>Enter</kbd>
                </span>
                <span>
                  <kbd>Ctrl</kbd> <kbd>K</kbd> {t('hint')}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] rounded-full border border-subtle bg-card-solid px-4 py-2 text-sm text-primary shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

