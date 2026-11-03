import type { Metadata } from 'next';
import { CapacityTabs } from '@/features/capacity-booking/components/capacity-tabs';

export const metadata: Metadata = { title: 'Capacity' };

export default function CapacityPage() {
  return <CapacityTabs />;
}
