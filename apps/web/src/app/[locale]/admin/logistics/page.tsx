import type { Metadata } from 'next';
import { AdminLogistics } from '@/features/logistics/components/admin-logistics';

export const metadata: Metadata = { title: 'Admin · Logistics' };

export default function Page() {
  return <AdminLogistics />;
}
