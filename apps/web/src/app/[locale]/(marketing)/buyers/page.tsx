import { marketingMetadata } from '@/features/marketing/metadata';
import { BuyersPage } from '@/features/marketing/pages/buyers';

export const generateMetadata = () => marketingMetadata('buyers', '/buyers');

export default function Page() {
  return <BuyersPage />;
}
