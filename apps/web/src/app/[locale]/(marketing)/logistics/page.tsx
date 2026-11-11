import { marketingMetadata } from '@/features/marketing/metadata';
import { LogisticsPage } from '@/features/marketing/pages/logistics';

export const generateMetadata = () => marketingMetadata('logistics', '/logistics');

export default function Page() {
  return <LogisticsPage />;
}
