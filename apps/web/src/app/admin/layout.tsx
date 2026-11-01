import { AppShell } from '@/features/shell/app-shell';

export default function AdminLayout({ children }: LayoutProps<'/admin'>) {
  return <AppShell role="ADMIN">{children}</AppShell>;
}
