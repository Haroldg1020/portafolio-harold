"use client";

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { sendContactMessage, type ContactField, type ContactState } from '@/app/actions/contact';
import { site } from '@/config/site';

const inputClass =
  'w-full bg-black/5 dark:bg-black/50 border border-subtle rounded-lg px-4 py-3 text-primary placeholder:text-muted focus:outline-none focus:border-accent transition-colors aria-[invalid=true]:border-accent';

export default function ContactForm() {
  const t = useTranslations('Contact');
  const [state, formAction, isPending] = useActionState<ContactState, FormData>(sendContactMessage, { status: 'idle' });

  const invalid = (field: ContactField) => state.status === 'error' && !!state.fields?.includes(field);
  const fieldErrors = state.status === 'error' ? state.fields ?? [] : [];
  // React resets the form after each submit; on errors it resets to these values instead of blank
  const values = state.status === 'error' ? state.values : undefined;

  return (
    <form action={formAction} noValidate className="space-y-6">
      {/* Honeypot for bots, hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm text-secondary">{t('nameLabel')}</label>
          <input id="name" name="name" type="text" required autoComplete="name" defaultValue={values?.name} aria-invalid={invalid('name')} className={inputClass} />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm text-secondary">{t('emailLabel')}</label>
          <input id="email" name="email" type="email" required autoComplete="email" defaultValue={values?.email} aria-invalid={invalid('email')} className={inputClass} />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm text-secondary">{t('messageLabel')}</label>
        <textarea id="message" name="message" rows={5} required defaultValue={values?.message} aria-invalid={invalid('message')} className={`${inputClass} resize-none`}></textarea>
      </div>

      <div aria-live="polite">
        <AnimatePresence mode="wait">
          {state.status === 'success' && (
            <motion.p key="ok" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} /> {t('success')}
            </motion.p>
          )}
          {state.status === 'error' && (
            <motion.ul key="err" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-1 text-sm text-accent">
              {(fieldErrors.length ? fieldErrors.map((f) => t(`errors.${f}`)) : [t('errors.generic', { email: site.email })]).map((msg) => (
                <li key={msg} className="flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" /> {msg}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full relative overflow-hidden group bg-black/5 dark:bg-white/5 border border-subtle rounded-lg px-6 py-4 transition-all duration-300 hover:border-accent disabled:opacity-50 disabled:cursor-wait cursor-pointer"
      >
        <div className="absolute inset-0 w-0 bg-accent/15 dark:bg-white/10 transition-all duration-500 ease-out group-hover:w-full"></div>
        <span className="relative z-10 inline-flex items-center gap-2 text-primary font-medium tracking-wide">
          {isPending ? t('sending') : t('send')}
          {!isPending && <Send size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
        </span>
      </button>
    </form>
  );
}
