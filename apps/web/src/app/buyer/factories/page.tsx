import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { FactorySearch } from '@/features/discovery/components/factory-search';

export const metadata: Metadata = { title: 'Factories' };

export default function FactoriesPage() {
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <FactorySearch />
    </Suspense>
  );
}
