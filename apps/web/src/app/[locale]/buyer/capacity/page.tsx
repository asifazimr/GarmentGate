import type { Metadata } from 'next';
import { BuyerCapacity } from '@/features/capacity-booking/components/buyer-capacity';

export const metadata: Metadata = { title: 'Book capacity' };

export default function Page() {
  return <BuyerCapacity />;
}
