import { AppShell } from '@/features/shell/app-shell';

export default function ManufacturerLayout({ children }: LayoutProps<'/[locale]/manufacturer'>) {
  return <AppShell role="MANUFACTURER">{children}</AppShell>;
}
