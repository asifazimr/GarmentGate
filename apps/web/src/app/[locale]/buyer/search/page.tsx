import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { PageHeader } from '@/components/patterns/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductSearch } from '@/features/discovery/components/product-search';

export const metadata: Metadata = { title: 'Discover products' };

export default async function SearchPage() {
  const t = await getTranslations('discovery.search');
  // The header is static (painted at once); search state lives in the URL, known per request.
  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
        <ProductSearch />
      </Suspense>
    </div>
  );
}
