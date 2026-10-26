import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import GitHubActivity from '@/components/GitHubActivity';
import Experience from '@/components/Experience';
import Stack from '@/components/Stack';
import Notes from '@/components/Notes';
import Contact from '@/components/Contact';
import { setRequestLocale } from 'next-intl/server';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative">
      <Hero />
      <About />
      <Projects />
      <GitHubActivity />
      <Experience />
      <Stack />
      <Notes />
      <Contact />
    </main>
  );
}
