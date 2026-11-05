import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ShipmentDetail } from '@/features/logistics/components/admin-shipments';

export const metadata: Metadata = { title: 'Admin · Shipment' };

export default function Page({ params }: PageProps<'/[locale]/admin/logistics/shipments/[code]'>) {
  return (
    <Suspense fallback={<Skeleton className="h-96 rounded-xl" />}>
      <Detail params={params} />
    </Suspense>
  );
}

async function Detail({
  params,
}: Pick<PageProps<'/[locale]/admin/logistics/shipments/[code]'>, 'params'>) {
  const { code } = await params;
  return <ShipmentDetail code={decodeURIComponent(code)} />;
}
