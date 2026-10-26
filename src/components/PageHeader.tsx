import * as motion from 'motion/react-client';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface PageHeaderProps {
  back: { href: string; label: string };
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ back, title, subtitle, children }: PageHeaderProps) {
  return (
    <header className="mb-12">
      <Link
        href={back.href}
        className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-secondary hover:text-accent transition-colors mb-10"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
        {back.label}
      </Link>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl md:text-6xl font-black tracking-tight text-primary"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-5 text-lg text-secondary font-light max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
      {children}
    </header>
  );
}
