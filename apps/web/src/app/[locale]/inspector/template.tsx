import { PageTransition } from '@/components/patterns/page-transition';

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
