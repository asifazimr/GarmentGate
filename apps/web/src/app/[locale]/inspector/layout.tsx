import { AppShell } from '@/features/shell/app-shell';

export default function InspectorLayout({ children }: LayoutProps<'/[locale]/inspector'>) {
  return <AppShell role="INSPECTOR">{children}</AppShell>;
}
