import type { Metadata } from 'next';
import { FactoryPlanPage } from '@/features/plans/components/factory-plan';

export const metadata: Metadata = { title: 'Plan' };

export default function Page() {
  return <FactoryPlanPage />;
}
