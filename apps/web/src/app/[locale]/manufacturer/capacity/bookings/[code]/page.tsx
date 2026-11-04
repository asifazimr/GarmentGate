import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { FactoryBookingPage } from '@/features/capacity-booking/components/booking-inbox';

export const metadata: Metadata = { title: 'Booking request' };

export default function Page({
  params,
}: PageProps<'/[locale]/manufacturer/capacity/bookings/[code]'>) {
  return (
    <Suspense fallback={<Skeleton className="h-32 rounded-xl" />}>
      <Detail params={params} />
    </Suspense>
  );
}

async function Detail({
  params,
}: Pick<PageProps<'/[locale]/manufacturer/capacity/bookings/[code]'>, 'params'>) {
  const { code } = await params;
  return <FactoryBookingPage code={decodeURIComponent(code)} />;
}
