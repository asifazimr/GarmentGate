import type { Metadata } from 'next';
import { AdminCapacity } from '@/features/capacity-booking/components/admin-capacity';

export const metadata: Metadata = { title: 'Admin · Capacity booking' };

export default function Page() {
  return <AdminCapacity />;
}
