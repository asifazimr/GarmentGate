import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Shortlists } from '@/features/discovery/components/shortlists';

export const metadata: Metadata = { title: 'Shortlists' };

export default function ShortlistsPage() {
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <Shortlists />
    </Suspense>
  );
}
