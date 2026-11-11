import { marketingMetadata } from '@/features/marketing/metadata';
import { CapacityPage } from '@/features/marketing/pages/capacity';

export const generateMetadata = () => marketingMetadata('capacity', '/buyers/capacity');

export default function Page() {
  return <CapacityPage />;
}
