import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { BuyerRfqList } from '@/features/rfq/components/buyer-rfq-list';

export const metadata: Metadata = { title: 'Requests for quote' };

export default function Page() {
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <BuyerRfqList />
    </Suspense>
  );
}
