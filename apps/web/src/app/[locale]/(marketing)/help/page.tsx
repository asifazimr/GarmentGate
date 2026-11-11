import { marketingMetadata } from '@/features/marketing/metadata';
import { HelpPage } from '@/features/marketing/pages/help';

export const generateMetadata = () => marketingMetadata('help', '/help');

export default function Page() {
  return <HelpPage />;
}
