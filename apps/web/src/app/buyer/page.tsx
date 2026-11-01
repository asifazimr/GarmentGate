import type { Metadata } from 'next';
import { BuyerDashboard } from '@/features/discovery/components/buyer-dashboard';

export const metadata: Metadata = { title: 'Dashboard' };

export default function BuyerDashboardPage() {
  return <BuyerDashboard />;
}
