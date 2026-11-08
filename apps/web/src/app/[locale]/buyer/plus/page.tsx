import type { Metadata } from 'next';
import { BuyerPlusPage } from '@/features/plans/components/buyer-plus';

export const metadata: Metadata = { title: 'GarmentGate Plus' };

export default function Page() {
  return <BuyerPlusPage />;
}
