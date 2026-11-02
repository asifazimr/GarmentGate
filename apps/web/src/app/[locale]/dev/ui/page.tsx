import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DesignSystemShowcase } from '@/features/dev-ui/showcase';

export const metadata: Metadata = { title: 'Design system', robots: { index: false } };

/** Developer-only component gallery. Not part of the product: 404 in production builds. */
export default function DevUiPage() {
  if (process.env.NODE_ENV === 'production') notFound();
  return <DesignSystemShowcase />;
}
