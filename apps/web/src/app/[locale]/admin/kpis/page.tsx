import type { Metadata } from 'next';
import { KpiDashboard } from '@/features/kpis/components/kpi-dashboard';

export const metadata: Metadata = { title: 'Admin · KPIs' };

export default function Page() {
  return <KpiDashboard />;
}
