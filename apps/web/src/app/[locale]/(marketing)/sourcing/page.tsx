import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/features/marketing/metadata';
import { SourcingPage } from '@/features/marketing/pages/sourcing';

export async function generateMetadata() {
  const t = await getTranslations('marketing.directory.sourcing.meta');
  return pageMetadata(t('title'), t('description'), '/sourcing');
}

export default function Page() {
  return <SourcingPage />;
}
