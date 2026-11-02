import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { InspectorJobPage } from '@/features/qc/components/inspector-job';

export const metadata: Metadata = { title: 'Inspection' };

export default function Page({ params }: PageProps<'/[locale]/inspector/inspections/[id]'>) {
  // Reading params inside Suspense keeps navigation instant under Cache Components.
  return (
    <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
      <Job params={params} />
    </Suspense>
  );
}

async function Job({ params }: Pick<PageProps<'/[locale]/inspector/inspections/[id]'>, 'params'>) {
  const { id } = await params;
  return <InspectorJobPage id={id} />;
}
