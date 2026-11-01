import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { MessagesPage } from '@/features/chat/components/messages-page';

export const metadata: Metadata = { title: 'Messages' };

export default function Page({ params }: PageProps<'/admin/messages/[id]'>) {
  // Reading params inside Suspense keeps navigation instant under Cache Components.
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <Thread params={params} />
    </Suspense>
  );
}

async function Thread({ params }: Pick<PageProps<'/admin/messages/[id]'>, 'params'>) {
  const { id } = await params;
  return <MessagesPage role="ADMIN" conversationId={id} />;
}
