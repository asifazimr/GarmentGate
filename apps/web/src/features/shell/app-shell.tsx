'use client';

import type { Role } from '@garmentgate/shared';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Logo } from '@/components/logo';
import { useLocalFlag } from '@/lib/client-hooks';
import { ChatSocketProvider } from '@/features/chat/socket';
import { BottomNav } from './bottom-nav';
import { CommandMenu } from './command-menu';
import { NAV } from './nav';
import { NotificationsBell } from './notifications-bell';
import { ProfileMenu } from './profile-menu';
import { Sidebar } from './sidebar';

const COLLAPSED_KEY = 'gg:sidebar-collapsed';

/**
 * Signed-in layout for every role: collapsible sidebar (desktop), bottom nav (mobile),
 * and a top bar with ⌘K search, notifications and the profile menu.
 */
export function AppShell({ role, children }: { role: Role; children: ReactNode }) {
  const t = useTranslations('nav');
  const [collapsed, setCollapsed] = useLocalFlag(COLLAPSED_KEY);
  const toggle = () => setCollapsed(!collapsed);

  return (
    <ChatSocketProvider>
      <div className="flex min-h-dvh">
        <a
          href="#main"
          className="bg-primary text-primary-foreground sr-only z-50 rounded-md px-3 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:start-3"
        >
          {t('skipToContent')}
        </a>
        <Sidebar role={role} collapsed={collapsed} onToggle={toggle} />
        <div className="flex min-w-0 flex-1 flex-col">
          <header
            className="bg-background/80 sticky top-0 z-20 border-b backdrop-blur-xl"
            style={{ top: 'env(safe-area-inset-top, 0px)' }}
          >
            <div className="flex h-16 items-center gap-2 px-4 sm:px-6 lg:px-8">
              <Link href={NAV[role][0]?.href ?? '/'} className="lg:hidden" aria-label="GarmentGate">
                <Logo />
              </Link>
              {/* One palette instance: it renders a search field on desktop and an icon on mobile. */}
              <div className="flex flex-1 items-center justify-end md:justify-start lg:max-w-md">
                <CommandMenu role={role} />
              </div>
              <div className="ms-auto flex items-center gap-1">
                <NotificationsBell />
                <ProfileMenu />
              </div>
            </div>
          </header>
          <main id="main" className="flex-1 px-4 pt-6 pb-28 sm:px-6 lg:px-8 lg:pt-8 lg:pb-12">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </div>
        <BottomNav role={role} />
      </div>
    </ChatSocketProvider>
  );
}
