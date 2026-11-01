import { AppShell } from '@/features/shell/app-shell';

export default function ManufacturerLayout({ children }: LayoutProps<'/manufacturer'>) {
  return <AppShell role="MANUFACTURER">{children}</AppShell>;
}
