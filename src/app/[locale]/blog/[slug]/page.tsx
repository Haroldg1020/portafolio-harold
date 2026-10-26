import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import PageHeader from '@/components/PageHeader';
import { getPost, postSlugs } from '@/lib/content';
import { alternates, formatDate } from '@/lib/seo';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = await getPost(slug, locale);
  if (!result) return {};
  return {
    title: result.post.title,
    description: result.post.summary,
    alternates: alternates(`/blog/${slug}`, locale),
    openGraph: { type: 'article', publishedTime: result.post.date },
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const result = await getPost(slug, locale);
  if (!result) notFound();

  const { post, Content } = result;
  const t = await getTranslations('Notes');

  return (
    <main className="max-w-3xl mx-auto px-6 pt-36 pb-12">
      <PageHeader back={{ href: '/blog', label: t('back') }} title={post.title} subtitle={post.summary}>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <time dateTime={post.date} className="text-xs font-mono text-muted">{formatDate(post.date, locale)}</time>
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-md border border-subtle px-2 py-1 text-[11px] text-secondary">{tag}</li>
            ))}
          </ul>
        </div>
      </PageHeader>

      <article className="prose prose-zinc dark:prose-invert max-w-none border-t border-subtle pt-10 prose-headings:font-bold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:before:content-none prose-code:after:content-none">
        <Content />
      </article>
    </main>
  );
}
