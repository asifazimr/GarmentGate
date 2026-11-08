import type { Metadata } from 'next';
import { InspectorEarnings } from '@/features/gig/components/earnings';

export const metadata: Metadata = { title: 'Earnings' };

export default function Page() {
  return <InspectorEarnings />;
}
