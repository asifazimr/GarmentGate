import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { AdminMargins } from '@/features/rfq/components/admin-margins';

export const metadata: Metadata = { title: 'Margins' };

export default function Page() {
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <AdminMargins />
    </Suspense>
  );
}
