import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import PageHeader from '@/components/PageHeader';
import PostList from '@/components/PostList';
import { getPosts } from '@/lib/content';
import { alternates } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Notes' });
  return {
    title: t('title'),
    description: t('pageDescription'),
    alternates: alternates('/blog', locale),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Notes');
  const tNav = await getTranslations('Navigation');
  const posts = await getPosts(locale);

  return (
    <main className="max-w-4xl mx-auto px-6 pt-36 pb-12">
      <PageHeader back={{ href: '/', label: tNav('home') }} title={t('title')} subtitle={t('subtitle')} />
      <PostList posts={posts} />
    </main>
  );
}
