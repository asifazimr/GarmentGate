import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductEditor } from '@/features/manufacturer/components/product-editor';

export const metadata: Metadata = { title: 'New product' };

// The form generates client-side ids (useFieldArray), so it renders inside Suspense rather than
// in the prerendered shell.
export default function NewProductPage() {
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <ProductEditor />
    </Suspense>
  );
}
