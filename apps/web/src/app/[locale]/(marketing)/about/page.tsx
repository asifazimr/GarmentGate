import { marketingMetadata } from '@/features/marketing/metadata';
import { AboutPage } from '@/features/marketing/pages/about';

export const generateMetadata = () => marketingMetadata('about', '/about');

export default function Page() {
  return <AboutPage />;
}
