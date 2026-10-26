import { useTranslations } from 'next-intl';
import * as motion from 'motion/react-client';
import { Mail } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import ContactForm from '@/components/ContactForm';
import { site } from '@/config/site';

const socials = [
  { label: 'Email', href: `mailto:${site.email}`, icon: Mail, external: false },
  { label: 'LinkedIn', href: site.linkedin, icon: FaLinkedin, external: true },
  { label: 'GitHub', href: site.github.url, icon: FaGithub, external: true },
];

export default function Contact() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto min-h-[80vh] flex flex-col justify-center scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-xs font-mono text-accent mb-3 tracking-widest">06 /</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
          {t('title')}
        </h2>
        <p className="text-xl text-secondary font-light">
          {t('cta')}
        </p>
      </motion.div>

      <div className="relative glass-dark metal-edge rounded-2xl p-6 sm:p-8 mb-12 shadow-sm">
        <ContactForm />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center gap-6"
      >
        {socials.map(({ label, href, icon: Icon, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
            className="group relative w-14 h-14 rounded-full metal-edge flex items-center justify-center overflow-hidden bg-black/5 dark:bg-white/5 shadow-sm"
          >
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300"></div>
            <Icon className="text-secondary group-hover:text-accent transition-colors relative z-10" size={24} />
          </a>
        ))}
      </motion.div>
      <p className="mt-6 text-center text-sm text-muted">
        <a href={`mailto:${site.email}`} className="hover:text-accent transition-colors">{site.email}</a>
      </p>
    </section>
  );
}
