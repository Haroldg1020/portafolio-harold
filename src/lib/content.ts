import type { ComponentType } from 'react';
import { projectSlugs } from '@/content/projects';
import { postSlugs } from '@/content/blog';

type MdxModule<T> = { default: ComponentType; metadata: T };

export type ProjectMeta = {
  title: string;
  summary: string;
  /** ISO date, e.g. '2025-09-15' */
  date: string;
  tags: string[];
  repo?: string;
  demo?: string;
  /** Image in /public, e.g. '/projects/portafolio/cover.png'. Without it a generated cover is shown. */
  cover?: string;
  featured?: boolean;
  status?: 'done' | 'in-progress';
};

export type PostMeta = {
  title: string;
  summary: string;
  date: string;
  tags: string[];
};

export type Project = ProjectMeta & { slug: string };
export type Post = PostMeta & { slug: string };

async function loadProject(slug: string, locale: string) {
  try {
    return (await import(`@/content/projects/${slug}/${locale}.mdx`)) as MdxModule<ProjectMeta>;
  } catch {
    // Fall back to Spanish when a translation is missing
    return (await import(`@/content/projects/${slug}/es.mdx`)) as MdxModule<ProjectMeta>;
  }
}

async function loadPost(slug: string, locale: string) {
  try {
    return (await import(`@/content/blog/${slug}/${locale}.mdx`)) as MdxModule<PostMeta>;
  } catch {
    return (await import(`@/content/blog/${slug}/es.mdx`)) as MdxModule<PostMeta>;
  }
}

const byDateDesc = (a: { date: string }, b: { date: string }) => b.date.localeCompare(a.date);

export async function getProjects(locale: string): Promise<Project[]> {
  const projects = await Promise.all(
    projectSlugs.map(async (slug) => ({ slug, ...(await loadProject(slug, locale)).metadata }))
  );
  return projects.sort(byDateDesc);
}

export async function getProject(slug: string, locale: string) {
  if (!projectSlugs.includes(slug)) return null;
  const mod = await loadProject(slug, locale);
  return { project: { slug, ...mod.metadata } as Project, Content: mod.default };
}

export async function getPosts(locale: string): Promise<Post[]> {
  const posts = await Promise.all(
    postSlugs.map(async (slug) => ({ slug, ...(await loadPost(slug, locale)).metadata }))
  );
  return posts.sort(byDateDesc);
}

export async function getPost(slug: string, locale: string) {
  if (!postSlugs.includes(slug)) return null;
  const mod = await loadPost(slug, locale);
  return { post: { slug, ...mod.metadata } as Post, Content: mod.default };
}

export { projectSlugs, postSlugs };
