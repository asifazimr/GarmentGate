'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/logo';
import { useMe } from '@/features/auth/api';
import { ProfileMenu } from '@/features/shell/profile-menu';

/**
 * Slim top bar for signed-in pages outside the app shell (onboarding, pending verification):
 * logo, the company's public code, optional actions and the profile menu.
 */
export function AppHeader({ actions }: { actions?: ReactNode }) {
  const me = useMe();
  const code = me.data?.company?.publicCode;

  return (
    <header
      className="bg-background/80 sticky top-0 z-20 border-b backdrop-blur-xl"
      style={{ top: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="GarmentGate home"
          className="rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          <Logo />
        </Link>
        {code ? (
          <Badge variant="code" className="hidden sm:inline-flex">
            {code}
          </Badge>
        ) : null}
        <div className="ms-auto flex items-center gap-2">
          {actions}
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
