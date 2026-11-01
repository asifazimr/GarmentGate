import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { BuyerRfqDetail } from '@/features/rfq/components/buyer-rfq-detail';

export const metadata: Metadata = { title: 'Request for quote' };

export default function Page({ params }: PageProps<'/buyer/rfqs/[code]'>) {
  // Reading params inside Suspense keeps navigation instant under Cache Components.
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: Pick<PageProps<'/buyer/rfqs/[code]'>, 'params'>) {
  const { code } = await params;
  return <BuyerRfqDetail code={decodeURIComponent(code)} />;
}
