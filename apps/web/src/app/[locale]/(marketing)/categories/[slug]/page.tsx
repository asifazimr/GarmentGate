import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { publicDirectory } from '@/features/marketing/data';
import { pageMetadata } from '@/features/marketing/metadata';
import { CategoryPage } from '@/features/marketing/pages/categories';

/** Live categories are prerendered; new ones render on first visit. */
export async function generateStaticParams() {
  const directory = await publicDirectory();
  const live = directory?.categories.filter((c) => c.factories > 0 || c.products > 0) ?? [];
  // At least one entry so the route can prerender even when the API is down at build time.
  return live.length > 0 ? live.map((c) => ({ slug: c.slug })) : [{ slug: 't-shirts' }];
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/categories/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const category = (await publicDirectory())?.categories.find((c) => c.slug === slug);
  if (!category) return {};
  const t = await getTranslations('marketing.directory.category');
  return pageMetadata(
    t('title', { name: category.name }),
    t('body', { name: category.name }),
    `/categories/${slug}`,
  );
}

// Route params are read inside <Suspense> (Cache Components).
export default function Page({ params }: PageProps<'/[locale]/categories/[slug]'>) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <Route params={params} />
    </Suspense>
  );
}

async function Route({ params }: { params: PageProps<'/[locale]/categories/[slug]'>['params'] }) {
  const { slug } = await params;
  return <CategoryPage slug={slug} />;
}
