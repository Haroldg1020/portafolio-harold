import { site } from '@/config/site';

type ApiRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  pushed_at: string;
};

export type GitHubStats = {
  repoCount: number;
  stars: number;
  languages: { name: string; percent: number }[];
  recent: { name: string; url: string; description: string | null; language: string | null; pushedAt: string }[];
};

/** Public profile stats, cached for an hour. Returns null if GitHub is unreachable or rate-limited. */
export async function getGitHubStats(): Promise<GitHubStats | null> {
  const headers: HeadersInit = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${site.github.username}/repos?per_page=100&sort=pushed`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const repos = ((await res.json()) as ApiRepo[]).filter((r) => !r.fork);

    const counts = new Map<string, number>();
    for (const r of repos) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    const withLanguage = [...counts.values()].reduce((a, b) => a + b, 0) || 1;

    return {
      repoCount: repos.length,
      stars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
      languages: [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, percent: Math.round((count / withLanguage) * 100) })),
      recent: repos.slice(0, 4).map((r) => ({
        name: r.name,
        url: r.html_url,
        description: r.description,
        language: r.language,
        pushedAt: r.pushed_at,
      })),
    };
  } catch {
    return null;
  }
}

// Colors from GitHub's linguist for the languages most likely to show up
export const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572a5',
  'C++': '#f34b7d',
  C: '#555555',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#663399',
  Go: '#00add8',
  Rust: '#dea584',
};
