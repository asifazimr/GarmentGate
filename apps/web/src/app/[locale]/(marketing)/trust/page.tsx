import { marketingMetadata } from '@/features/marketing/metadata';
import { TrustPage } from '@/features/marketing/pages/trust';

export const generateMetadata = () => marketingMetadata('trust', '/trust');

export default function Page() {
  return <TrustPage />;
}
