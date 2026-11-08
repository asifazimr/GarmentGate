import type { Metadata } from 'next';
import { BuyerContractsPage } from '@/features/contracts/components/contracts-pages';

export const metadata: Metadata = { title: 'Contracts' };

export default function Page() {
  return <BuyerContractsPage />;
}
