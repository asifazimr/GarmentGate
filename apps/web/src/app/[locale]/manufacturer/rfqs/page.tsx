import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { FactoryInbox } from '@/features/rfq/components/factory-inbox';

export const metadata: Metadata = { title: 'RFQ inbox' };

export default function Page() {
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <FactoryInbox />
    </Suspense>
  );
}
