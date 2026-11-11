import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { LEGAL_DOCS, type LegalDoc } from '@/features/marketing/components/links';
import { LegalPage } from '@/features/marketing/pages/legal';

const isDoc = (d: string): d is LegalDoc => (LEGAL_DOCS as readonly string[]).includes(d);

export function generateStaticParams() {
  return LEGAL_DOCS.map((doc) => ({ doc }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/legal/[doc]'>): Promise<Metadata> {
  const { doc } = await params;
  if (!isDoc(doc)) return {};
  const t = await getTranslations('marketing.legal');
  return {
    title: t(`docs.${doc}.title`),
    description: t(`docs.${doc}.description`),
    alternates: { canonical: `/legal/${doc}` },
  };
}

// Route params are read inside <Suspense> (Cache Components).
export default function Page({ params }: PageProps<'/[locale]/legal/[doc]'>) {
  return (
    <Suspense fallback={<div className="mx-auto min-h-[60vh] max-w-6xl" />}>
      <LegalRoute params={params} />
    </Suspense>
  );
}

async function LegalRoute({ params }: { params: PageProps<'/[locale]/legal/[doc]'>['params'] }) {
  const { doc } = await params;
  if (!isDoc(doc)) notFound();
  return <LegalPage doc={doc} />;
}
