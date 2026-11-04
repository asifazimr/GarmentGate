import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { BookingFlow } from '@/features/capacity-booking/components/booking-flow';

export const metadata: Metadata = { title: 'Book line time' };

export default function Page({ params }: PageProps<'/[locale]/buyer/capacity/book/[slotId]'>) {
  // Reading params inside Suspense keeps navigation instant under Cache Components.
  return (
    <Suspense fallback={<Skeleton className="mx-auto h-96 max-w-3xl rounded-xl" />}>
      <Flow params={params} />
    </Suspense>
  );
}

async function Flow({
  params,
}: Pick<PageProps<'/[locale]/buyer/capacity/book/[slotId]'>, 'params'>) {
  const { slotId } = await params;
  return <BookingFlow slotId={slotId} />;
}
