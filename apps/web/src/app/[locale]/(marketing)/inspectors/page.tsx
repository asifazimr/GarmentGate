import { marketingMetadata } from '@/features/marketing/metadata';
import { InspectorsPage } from '@/features/marketing/pages/inspectors';

export const generateMetadata = () => marketingMetadata('inspectors', '/inspectors');

export default function Page() {
  return <InspectorsPage />;
}
