import { Suspense } from 'react';
import { ComingSoon, ComingSoonSkeleton } from '@/features/shell/coming-soon';
import { comingSoonSections } from '@/features/shell/nav';

// Sections from the navigation are prerendered; ComingSoon 404s anything else.
export function generateStaticParams() {
  return comingSoonSections('BUYER').map((section) => ({ section }));
}

export default function BuyerSectionPage({ params }: PageProps<'/buyer/[section]'>) {
  // Reading params inside Suspense keeps navigation instant under Cache Components.
  return (
    <Suspense fallback={<ComingSoonSkeleton />}>
      <Section params={params} />
    </Suspense>
  );
}

async function Section({ params }: Pick<PageProps<'/buyer/[section]'>, 'params'>) {
  const { section } = await params;
  return <ComingSoon role="BUYER" section={section} />;
}
