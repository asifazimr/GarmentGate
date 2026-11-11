import type { Metadata } from 'next';
import { AdminLeadsPage } from '@/features/marketing/admin-leads';

export const metadata: Metadata = { title: 'Leads' };

export default function Page() {
  return <AdminLeadsPage />;
}
