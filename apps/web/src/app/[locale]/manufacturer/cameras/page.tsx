import type { Metadata } from 'next';
import { FactoryCamerasPage } from '@/features/monitoring/components/factory-cameras';

export const metadata: Metadata = { title: 'Cameras' };

export default function Page() {
  return <FactoryCamerasPage />;
}
