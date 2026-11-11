import { marketingMetadata } from '@/features/marketing/metadata';
import { HowItWorksPage } from '@/features/marketing/pages/how-it-works';

export const generateMetadata = () => marketingMetadata('how', '/how-it-works');

export default function Page() {
  return <HowItWorksPage />;
}
