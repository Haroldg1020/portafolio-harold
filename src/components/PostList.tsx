import { useLocale } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { formatDate } from '@/lib/seo';
import type { Post } from '@/lib/content';

export default function PostList({ posts }: { posts: Post[] }) {
  const locale = useLocale();

  return (
    <ul className="border-t border-subtle">
      {posts.map((post) => (
        <li key={post.slug} className="border-b border-subtle">
          <Link
            href={`/blog/${post.slug}`}
            className="group grid grid-cols-1 md:grid-cols-[8rem_1fr_auto] items-baseline gap-2 md:gap-6 py-6 transition-colors"
          >
            <span className="text-xs font-mono text-muted">{formatDate(post.date, locale)}</span>
            <span>
              <span className="block text-lg font-bold text-primary group-hover:text-accent transition-colors">{post.title}</span>
              <span className="block mt-1 text-sm text-secondary font-light">{post.summary}</span>
            </span>
            <ArrowUpRight size={18} className="hidden md:block text-muted group-hover:text-accent transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
