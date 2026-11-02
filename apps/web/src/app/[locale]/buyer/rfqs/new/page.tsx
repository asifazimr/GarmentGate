import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { RfqWizard } from '@/features/rfq/components/rfq-wizard';

export const metadata: Metadata = { title: 'New request for quote' };

export default function Page() {
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <RfqWizard />
    </Suspense>
  );
}
