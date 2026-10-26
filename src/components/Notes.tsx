import { getLocale, getTranslations } from 'next-intl/server';
import * as motion from 'motion/react-client';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SectionHeading from '@/components/SectionHeading';
import PostList from '@/components/PostList';
import { getPosts } from '@/lib/content';

/** Latest notes on the home page. */
export default async function Notes() {
  const t = await getTranslations('Notes');
  const posts = (await getPosts(await getLocale())).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="notes" className="py-24 px-6 max-w-4xl mx-auto scroll-mt-20">
      <SectionHeading
        num="05"
        title={t('title')}
        subtitle={t('subtitle')}
        action={
          <Link href="/blog" className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-primary hover:text-accent transition-colors shrink-0">
            {t('viewAll')}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <PostList posts={posts} />
      </motion.div>
    </section>
  );
}
