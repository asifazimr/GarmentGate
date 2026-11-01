import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { AdminMediaReview } from '@/features/rfq/components/admin-media-review';

export const metadata: Metadata = { title: 'Moderation' };

export default function Page() {
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <AdminMediaReview />
    </Suspense>
  );
}
