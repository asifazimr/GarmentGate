import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { PageHeader } from '@/components/patterns/page-header';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FactorySearch } from '@/features/discovery/components/factory-search';

export const metadata: Metadata = { title: 'Factories' };

export default async function FactoriesPage() {
  const t = await getTranslations('discovery.factories');
  // Static header; the search itself reads its state from the URL.
  return (
    <div className="space-y-6">
      <PageHeader
        title={t('title')}
        description={t('description')}
        actions={
          <Button variant="outline" render={<Link href="/buyer/search" />}>
            {t('browseProducts')}
          </Button>
        }
      />
      <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
        <FactorySearch />
      </Suspense>
    </div>
  );
}
