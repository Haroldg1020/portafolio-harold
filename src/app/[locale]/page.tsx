import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Stack from '@/components/Stack';
import Contact from '@/components/Contact';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Footer');

  return (
    <main className="relative">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Stack />
      <Contact />
      
      {/* Footer minimalista */}
      <footer className="py-8 text-center text-sm text-muted border-t border-subtle mt-20">
        <p>© {new Date().getFullYear()} Harold Guerrero. {t('rights')}</p>
      </footer>
    </main>
  );
}
