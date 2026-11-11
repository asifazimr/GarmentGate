import { marketingMetadata } from '@/features/marketing/metadata';
import { HomePage } from '@/features/marketing/pages/home';

// Signed-in visitors are redirected to their dashboard by the proxy.
export const generateMetadata = () => marketingMetadata('home', '/');

export default function Page() {
  return <HomePage />;
}
