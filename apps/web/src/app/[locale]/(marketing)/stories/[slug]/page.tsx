import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { pageMetadata } from '@/features/marketing/metadata';
import { StoryPage } from '@/features/marketing/pages/stories';
import { STORIES, type StorySlug } from '@/features/marketing/terms';

const isStory = (s: string): s is StorySlug => STORIES.some((x) => x.slug === s);

export function generateStaticParams() {
  return STORIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/stories/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  if (!isStory(slug)) return {};
  const t = await getTranslations('marketing.stories.items');
  return pageMetadata(t(`${slug}.title`), t(`${slug}.summary`), `/stories/${slug}`);
}

// Route params are read inside <Suspense> (Cache Components).
export default function Page({ params }: PageProps<'/[locale]/stories/[slug]'>) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <Route params={params} />
    </Suspense>
  );
}

async function Route({ params }: { params: PageProps<'/[locale]/stories/[slug]'>['params'] }) {
  const { slug } = await params;
  if (!isStory(slug)) notFound();
  return <StoryPage slug={slug} />;
}
