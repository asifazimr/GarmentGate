import { marketingMetadata } from '@/features/marketing/metadata';
import { BuyerPlusPage } from '@/features/marketing/pages/buyer-plus';

export const generateMetadata = () => marketingMetadata('plus', '/buyers/plus');

export default function Page() {
  return <BuyerPlusPage />;
}
