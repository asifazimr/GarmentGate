import type { Metadata } from 'next';
import { RoleDashboard } from '@/features/dashboard/components/role-dashboard';

export const metadata: Metadata = { title: 'Dashboard' };

export default function BuyerDashboardPage() {
  return <RoleDashboard role="buyer" />;
}
