import type { Metadata } from 'next';
import { AdminOrders } from '@/features/admin/components/orders';

export const metadata: Metadata = { title: 'Orders' };

export default function Page() {
  return <AdminOrders />;
}
