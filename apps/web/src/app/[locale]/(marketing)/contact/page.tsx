import { marketingMetadata } from '@/features/marketing/metadata';
import { ContactPage } from '@/features/marketing/pages/contact';

export const generateMetadata = () => marketingMetadata('contact', '/contact');

export default function Page() {
  return <ContactPage />;
}
