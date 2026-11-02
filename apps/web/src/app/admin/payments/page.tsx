import type { Metadata } from 'next';
import { AdminPayments } from '@/features/admin/components/payments';

export const metadata: Metadata = { title: 'Admin · Payments' };

export default function Page() {
  return <AdminPayments />;
}
