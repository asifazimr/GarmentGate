import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { HELP_TOPICS, type HelpTopic } from '@/features/marketing/components/links';
import { HelpTopicPage } from '@/features/marketing/pages/help';

const isTopic = (t: string): t is HelpTopic => (HELP_TOPICS as readonly string[]).includes(t);

export function generateStaticParams() {
  return HELP_TOPICS.map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/help/[topic]'>): Promise<Metadata> {
  const { topic } = await params;
  if (!isTopic(topic)) return {};
  const t = await getTranslations('marketing.help');
  return {
    title: `${t(`topics.${topic}.title`)} · ${t('hero.eyebrow')}`,
    description: t(`topics.${topic}.body`),
    alternates: { canonical: `/help/${topic}` },
  };
}

// Route params are read inside <Suspense> (Cache Components).
export default function Page({ params }: PageProps<'/[locale]/help/[topic]'>) {
  return (
    <Suspense fallback={<div className="mx-auto min-h-[60vh] max-w-6xl" />}>
      <TopicRoute params={params} />
    </Suspense>
  );
}

async function TopicRoute({ params }: { params: PageProps<'/[locale]/help/[topic]'>['params'] }) {
  const { topic } = await params;
  if (!isTopic(topic)) notFound();
  return <HelpTopicPage topic={topic} />;
}
