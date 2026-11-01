import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductDetail } from '@/features/discovery/components/product-detail';

export const metadata: Metadata = { title: 'Product' };

export default function ProductPage({ params }: PageProps<'/buyer/products/[id]'>) {
  // Reading params inside Suspense keeps navigation instant under Cache Components.
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <Product params={params} />
    </Suspense>
  );
}

async function Product({ params }: Pick<PageProps<'/buyer/products/[id]'>, 'params'>) {
  const { id } = await params;
  return <ProductDetail id={id} />;
}
