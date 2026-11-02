import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { FactoryRfqDetail } from '@/features/rfq/components/factory-rfq-detail';

export const metadata: Metadata = { title: 'Request for quote' };

export default function Page({ params }: PageProps<'/[locale]/manufacturer/rfqs/[code]'>) {
  // Reading params inside Suspense keeps navigation instant under Cache Components.
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({
  params,
}: Pick<PageProps<'/[locale]/manufacturer/rfqs/[code]'>, 'params'>) {
  const { code } = await params;
  return <FactoryRfqDetail code={decodeURIComponent(code)} />;
}
