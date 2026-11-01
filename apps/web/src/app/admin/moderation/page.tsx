import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ModerationPage } from '@/features/chat/components/moderation-page';

export const metadata: Metadata = { title: 'Moderation' };

export default function Page() {
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <ModerationPage />
    </Suspense>
  );
}
