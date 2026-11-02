import type { Metadata } from 'next';
import { AdminOverviewPage } from '@/features/admin/components/overview';

export const metadata: Metadata = { title: 'Admin · Overview' };

export default function AdminPage() {
  return <AdminOverviewPage />;
}
