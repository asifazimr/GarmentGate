import { marketingMetadata } from '@/features/marketing/metadata';
import { ManufacturersPage } from '@/features/marketing/pages/manufacturers';

export const generateMetadata = () => marketingMetadata('manufacturers', '/manufacturers');

export default function Page() {
  return <ManufacturersPage />;
}
