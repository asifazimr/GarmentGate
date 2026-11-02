import type { Metadata } from 'next';
import { CapacityCalendar } from '@/features/manufacturer/components/capacity-calendar';

export const metadata: Metadata = { title: 'Capacity' };

export default function CapacityPage() {
  return <CapacityCalendar />;
}
