import type { MetadataRoute } from 'next';
import { HELP_TOPICS, LEGAL_DOCS } from '@/features/marketing/components/links';
import { publicDirectory } from '@/features/marketing/data';
import { STORIES } from '@/features/marketing/terms';

const SITE_URL = process.env.SITE_URL ?? 'http://localhost:3000';

/** The public pages search engines should know about (URLs carry no locale prefix). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const directory = await publicDirectory();
  const pages: [string, number][] = [
    ['/', 1],
    ['/buyers', 0.9],
    ['/manufacturers', 0.9],
    ['/how-it-works', 0.8],
    ['/pricing', 0.8],
    ['/trust', 0.7],
    ['/contact', 0.6],
    ['/buyers/plus', 0.7],
    ['/buyers/enterprise', 0.7],
    ['/buyers/capacity', 0.7],
    ['/inspectors', 0.7],
    ['/inspectors/apply', 0.5],
    ['/logistics', 0.7],
    ['/help', 0.6],
    ...HELP_TOPICS.map((tp): [string, number] => [`/help/${tp}`, 0.4]),
    ['/about', 0.5],
    ['/categories', 0.8],
    ...(directory?.categories ?? [])
      .filter((c) => c.factories > 0 || c.products > 0)
      .map((c): [string, number] => [`/categories/${c.slug}`, 0.6]),
    ['/sourcing', 0.8],
    ...(directory?.countries ?? []).map((c): [string, number] => [
      `/sourcing/${c.code.toLowerCase()}`,
      0.6,
    ]),
    ['/tools/cost-calculator', 0.7],
    ['/stories', 0.6],
    ...STORIES.map(({ slug }): [string, number] => [`/stories/${slug}`, 0.5]),
    ...LEGAL_DOCS.map((d): [string, number] => [`/legal/${d}`, 0.2]),
  ];
  return pages.map(([path, priority]) => ({
    url: new URL(path, SITE_URL).toString(),
    changeFrequency: 'weekly',
    priority,
  }));
}
