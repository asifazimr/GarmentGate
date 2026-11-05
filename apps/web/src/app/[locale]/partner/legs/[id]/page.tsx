import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { PartnerLegPage } from '@/features/logistics/components/partner-portal';

export const metadata: Metadata = { title: 'Booking' };

export default function Page({ params }: PageProps<'/[locale]/partner/legs/[id]'>) {
  return (
    <Suspense fallback={<Skeleton className="h-96 rounded-xl" />}>
      <Leg params={params} />
    </Suspense>
  );
}

async function Leg({ params }: Pick<PageProps<'/[locale]/partner/legs/[id]'>, 'params'>) {
  const { id } = await params;
  return <PartnerLegPage id={id} />;
}
