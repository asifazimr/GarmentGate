import type { Metadata } from 'next';
import { AdminContractsPage } from '@/features/contracts/components/admin-contracts';

export const metadata: Metadata = { title: 'Contracts' };

export default function Page() {
  return <AdminContractsPage />;
}
