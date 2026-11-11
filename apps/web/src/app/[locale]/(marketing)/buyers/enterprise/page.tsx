import { marketingMetadata } from '@/features/marketing/metadata';
import { EnterprisePage } from '@/features/marketing/pages/enterprise';

export const generateMetadata = () => marketingMetadata('enterprise', '/buyers/enterprise');

export default function Page() {
  return <EnterprisePage />;
}
