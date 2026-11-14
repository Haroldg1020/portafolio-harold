import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import GitHubActivity from '@/components/GitHubActivity';
import Experience from '@/components/Experience';
import Stack from '@/components/Stack';
import Notes from '@/components/Notes';
import Contact from '@/components/Contact';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { site } from '@/config/site';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Metadata');
  const tHero = await getTranslations('Hero');

  // Tells Google who this site belongs to, linking it with the person's other profiles
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: `${site.url}/${locale}`,
    email: site.email,
    jobTitle: tHero('role'),
    description: t('description'),
    address: { '@type': 'PostalAddress', addressLocality: 'Cali', addressRegion: 'Valle del Cauca', addressCountry: 'CO' },
    affiliation: { '@type': 'CollegeOrUniversity', name: 'Pontificia Universidad Javeriana Cali' },
    knowsAbout: ['Desarrollo web', 'Next.js', 'React', 'TypeScript', 'Python', 'Bases de datos', 'Arquitectura de software', 'Inteligencia artificial'],
    sameAs: [site.linkedin, site.github.url, ...site.profiles],
  };

  return (
    <main className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
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
