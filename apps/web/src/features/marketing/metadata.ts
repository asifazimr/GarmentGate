import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type PageKey =
  | 'home'
  | 'how'
  | 'buyers'
  | 'manufacturers'
  | 'pricing'
  | 'trust'
  | 'contact'
  | 'inspectors'
  | 'logistics'
  | 'help'
  | 'about'
  | 'plus'
  | 'enterprise'
  | 'capacity';

/** Title, description and social cards for a marketing page, from its `meta` copy. */
export async function marketingMetadata(page: PageKey, path: string): Promise<Metadata> {
  const t = await getTranslations(`marketing.${page}.meta`);
  return pageMetadata(t('title'), t('description'), path, page === 'home');
}

/** Title, description, canonical link and social cards for any public page. */
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  absolute = false,
): Metadata {
  return {
    title: absolute ? { absolute: `GarmentGate · ${title}` } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: 'GarmentGate', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}
