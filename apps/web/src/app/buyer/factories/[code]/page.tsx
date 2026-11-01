import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { FactoryProfile } from '@/features/discovery/components/factory-profile';

export const metadata: Metadata = { title: 'Factory' };

export default function FactoryPage({ params }: PageProps<'/buyer/factories/[code]'>) {
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <Factory params={params} />
    </Suspense>
  );
}

async function Factory({ params }: Pick<PageProps<'/buyer/factories/[code]'>, 'params'>) {
  const { code } = await params;
  return <FactoryProfile code={decodeURIComponent(code)} />;
}
