import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { countryName } from '@/lib/countries';
import { publicDirectory } from '@/features/marketing/data';
import { pageMetadata } from '@/features/marketing/metadata';
import { CountryPage } from '@/features/marketing/pages/sourcing';

/** Countries with verified factories are prerendered; new ones render on first visit. */
export async function generateStaticParams() {
  const codes = (await publicDirectory())?.countries.map((c) => c.code.toLowerCase()) ?? [];
  return (codes.length > 0 ? codes : ['bd']).map((country) => ({ country }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/sourcing/[country]'>): Promise<Metadata> {
  const { country } = await params;
  if (!/^[a-z]{2}$/.test(country)) return {};
  const name = countryName(country.toUpperCase(), await getLocale());
  const t = await getTranslations('marketing.directory.country');
  return pageMetadata(
    t('title', { country: name }),
    t('body', { country: name }),
    `/sourcing/${country}`,
  );
}

// Route params are read inside <Suspense> (Cache Components).
export default function Page({ params }: PageProps<'/[locale]/sourcing/[country]'>) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <Route params={params} />
    </Suspense>
  );
}

async function Route({ params }: { params: PageProps<'/[locale]/sourcing/[country]'>['params'] }) {
  const { country } = await params;
  return <CountryPage code={country} />;
}
