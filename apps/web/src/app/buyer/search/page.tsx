import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductSearch } from '@/features/discovery/components/product-search';

export const metadata: Metadata = { title: 'Discover products' };

export default function SearchPage() {
  // Search state lives in the URL, which is only known at request time.
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <ProductSearch />
    </Suspense>
  );
}
