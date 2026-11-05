import type { Metadata } from 'next';
import { PartnerBookings } from '@/features/logistics/components/partner-portal';

export const metadata: Metadata = { title: 'Bookings' };

export default function Page() {
  return <PartnerBookings />;
}
