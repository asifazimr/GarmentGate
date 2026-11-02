import { AppShell } from '@/features/shell/app-shell';

export default function BuyerLayout({ children }: LayoutProps<'/[locale]/buyer'>) {
  return <AppShell role="BUYER">{children}</AppShell>;
}
