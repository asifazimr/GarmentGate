import { AppShell } from '@/features/shell/app-shell';

export default function BuyerLayout({ children }: LayoutProps<'/buyer'>) {
  return <AppShell role="BUYER">{children}</AppShell>;
}
