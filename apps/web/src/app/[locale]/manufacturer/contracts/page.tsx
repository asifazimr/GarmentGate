import type { Metadata } from 'next';
import { FactoryContractsPage } from '@/features/contracts/components/contracts-pages';

export const metadata: Metadata = { title: 'Contracts' };

export default function Page() {
  return <FactoryContractsPage />;
}
