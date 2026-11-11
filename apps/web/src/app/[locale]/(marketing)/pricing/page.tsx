import { marketingMetadata } from '@/features/marketing/metadata';
import { PricingPage } from '@/features/marketing/pages/pricing';

export const generateMetadata = () => marketingMetadata('pricing', '/pricing');

export default function Page() {
  return <PricingPage />;
}
