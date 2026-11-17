import { marketingMetadata } from '@/features/marketing/metadata';
import { LiveViewPage } from '@/features/marketing/pages/live-view';

export const generateMetadata = () => marketingMetadata('liveView', '/buyers/live-view');

export default function Page() {
  return <LiveViewPage />;
}
