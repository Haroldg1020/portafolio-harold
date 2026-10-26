import { useTranslations } from 'next-intl';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail, ArrowUp } from 'lucide-react';
import { site } from '@/config/site';
import SectionLink from '@/components/SectionLink';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="mt-20 border-t border-subtle">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted">
        <div className="text-center md:text-left">
          <p>© {new Date().getFullYear()} {site.name}. {t('rights')}</p>
          <p className="text-xs mt-1">{t('builtWith')}</p>
        </div>
        <div className="flex items-center gap-5">
          <a href={`mailto:${site.email}`} aria-label="Email" className="hover:text-accent transition-colors">
            <Mail size={18} />
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors">
            <FaLinkedin size={18} />
          </a>
          <a href={site.github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors">
            <FaGithub size={18} />
          </a>
          <SectionLink section="top" aria-label={t('backToTop')} title={t('backToTop')} className="ml-2 w-8 h-8 rounded-full border border-subtle flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
            <ArrowUp size={14} />
          </SectionLink>
        </div>
      </div>
    </footer>
  );
}
