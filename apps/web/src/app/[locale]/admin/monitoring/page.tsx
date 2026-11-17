import type { Metadata } from 'next';
import { AdminMonitoringPage } from '@/features/monitoring/components/admin-monitoring';

export const metadata: Metadata = { title: 'Video monitoring' };

export default function Page() {
  return <AdminMonitoringPage />;
}
