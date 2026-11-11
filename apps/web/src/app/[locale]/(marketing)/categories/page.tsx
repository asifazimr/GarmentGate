import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/features/marketing/metadata';
import { CategoriesPage } from '@/features/marketing/pages/categories';

export async function generateMetadata() {
  const t = await getTranslations('marketing.directory.categories.meta');
  return pageMetadata(t('title'), t('description'), '/categories');
}

export default function Page() {
  return <CategoriesPage />;
}
