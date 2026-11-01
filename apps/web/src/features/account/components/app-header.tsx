'use client';

import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { useLogout, useMe } from '@/features/auth/api';

/** Top bar for signed-in pages: logo, the company's public code, sign out. */
export function AppHeader({ actions }: { actions?: ReactNode }) {
  const t = useTranslations('common');
  const me = useMe();
  const logout = useLogout();
  const code = me.data?.company?.publicCode;

  return (
    <header
      className="bg-background/90 sticky top-0 z-20 border-b backdrop-blur"
      style={{ top: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" aria-label="GarmentGate home">
          <Logo />
        </Link>
        {code ? (
          <Badge variant="secondary" className="hidden font-mono sm:inline-flex">
            {code}
          </Badge>
        ) : null}
        <div className="ms-auto flex items-center gap-2">
          {actions}
          <Button
            variant="ghost"
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
            aria-label={t('signOut')}
          >
            <LogOut className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">{t('signOut')}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
