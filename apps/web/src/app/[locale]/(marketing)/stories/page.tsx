import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/features/marketing/metadata';
import { StoriesPage } from '@/features/marketing/pages/stories';

export async function generateMetadata() {
  const t = await getTranslations('marketing.stories.meta');
  return pageMetadata(t('title'), t('description'), '/stories');
}

export default function Page() {
  return <StoriesPage />;
}
