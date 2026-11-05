import { AppShell } from '@/features/shell/app-shell';

export default function PartnerLayout({ children }: LayoutProps<'/[locale]/partner'>) {
  return <AppShell role="PARTNER">{children}</AppShell>;
}
