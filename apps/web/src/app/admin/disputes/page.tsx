import type { Metadata } from 'next';
import { AdminDisputes } from '@/features/trust/components/admin-disputes';

export const metadata: Metadata = { title: 'Disputes' };

export default function Page() {
  return <AdminDisputes />;
}
