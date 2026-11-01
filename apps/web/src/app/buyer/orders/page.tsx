import type { Metadata } from 'next';
import { OrderList } from '@/features/orders/components/order-list';

export const metadata: Metadata = { title: 'Orders' };

export default function Page() {
  return <OrderList role="BUYER" />;
}
