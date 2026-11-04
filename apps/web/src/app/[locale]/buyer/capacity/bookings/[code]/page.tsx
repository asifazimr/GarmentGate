import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { BookingDetail } from '@/features/capacity-booking/components/booking-detail';

export const metadata: Metadata = { title: 'Capacity booking' };

export default function Page({ params }: PageProps<'/[locale]/buyer/capacity/bookings/[code]'>) {
  return (
    <Suspense fallback={<Skeleton className="h-96 rounded-xl" />}>
      <Detail params={params} />
    </Suspense>
  );
}

async function Detail({
  params,
}: Pick<PageProps<'/[locale]/buyer/capacity/bookings/[code]'>, 'params'>) {
  const { code } = await params;
  return <BookingDetail code={decodeURIComponent(code)} />;
}
