import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { EditProduct } from '@/features/manufacturer/components/product-editor';

export const metadata: Metadata = { title: 'Edit product' };

export default function EditProductPage({
  params,
}: PageProps<'/[locale]/manufacturer/products/[id]'>) {
  // Reading params inside Suspense keeps navigation instant under Cache Components.
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <Product params={params} />
    </Suspense>
  );
}

async function Product({
  params,
}: Pick<PageProps<'/[locale]/manufacturer/products/[id]'>, 'params'>) {
  const { id } = await params;
  return <EditProduct id={id} />;
}
