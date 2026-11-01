import Link from 'next/link';
import { Logo } from '@/components/logo';
import { BrandPanel } from '@/features/auth/components/brand-panel';

/** Split screen: brand story on the left (desktop), the form on the right. */
export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="grid min-h-dvh flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <BrandPanel />
      <main className="flex flex-col px-4 py-8 sm:px-8 lg:px-12">
        <Link href="/" className="self-start lg:hidden" aria-label="GarmentGate home">
          <Logo />
        </Link>
        <div className="flex flex-1 items-center justify-center py-8">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </main>
    </div>
  );
}
