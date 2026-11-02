import { AppShell } from '@/features/shell/app-shell';

export default function AdminLayout({ children }: LayoutProps<'/[locale]/admin'>) {
  return <AppShell role="ADMIN">{children}</AppShell>;
}
