'use client';

import type { Role } from '@garmentgate/shared';
import { Ellipsis } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Suspense, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { UnreadBadge } from '@/features/chat/components/unread-badge';
import { cn } from '@/lib/utils';
import { isActive, NAV } from './nav';

/** Mobile navigation: four primary destinations plus "More" in a bottom sheet. */
export function BottomNav({ role }: { role: Role }) {
  return (
    <Suspense fallback={<BottomNavBar role={role} pathname={null} />}>
      <ActiveBottomNav role={role} />
    </Suspense>
  );
}

function ActiveBottomNav({ role }: { role: Role }) {
  return <BottomNavBar role={role} pathname={usePathname()} />;
}

function BottomNavBar({ role, pathname }: { role: Role; pathname: string | null }) {
  const t = useTranslations('nav');
  const [moreOpen, setMoreOpen] = useState(false);
  const items = NAV[role];
  const home = items[0]?.href ?? '/';
  const primary = items.filter((i) => i.primary);
  const more = items.filter((i) => !i.primary);
  const moreActive = pathname !== null && more.some((i) => isActive(pathname, i.href, home));

  const tab =
    'flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-[0.6875rem] font-medium outline-none transition-colors focus-visible:bg-muted';

  return (
    <>
      <nav
        aria-label={t('mainNavigation')}
        className="bg-background/85 fixed inset-x-0 bottom-0 z-30 border-t pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      >
        <ul className="flex">
          {primary.map((item) => {
            const active = pathname !== null && isActive(pathname, item.href, home);
            return (
              <li key={item.href} className="flex flex-1">
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(tab, active ? 'text-primary-ink' : 'text-muted-foreground')}
                >
                  <span className="relative">
                    <item.icon className="size-5" aria-hidden="true" />
                    {item.label === 'messages' ? (
                      <UnreadBadge dot className="absolute -top-0.5 -end-1" />
                    ) : null}
                  </span>
                  <span className="max-w-full truncate px-1">{t(item.label)}</span>
                </Link>
              </li>
            );
          })}
          {more.length > 0 ? (
            <li className="flex flex-1">
              <button
                type="button"
                onClick={() => setMoreOpen(true)}
                aria-haspopup="dialog"
                className={cn(tab, moreActive ? 'text-primary-ink' : 'text-muted-foreground')}
              >
                <span className="relative">
                  <Ellipsis className="size-5" aria-hidden="true" />
                  {more.some((i) => i.label === 'messages') ? (
                    <UnreadBadge dot className="absolute -top-0.5 -end-1" />
                  ) : null}
                </span>
                {t('more')}
              </button>
            </li>
          ) : null}
        </ul>
      </nav>

      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent side="bottom" className="lg:hidden">
          <SheetHeader>
            <SheetTitle>{t('more')}</SheetTitle>
          </SheetHeader>
          <ul className="space-y-1 px-3 pb-4">
            {more.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className="hover:bg-muted flex min-h-12 items-center gap-3 rounded-lg px-3 text-[0.9375rem] font-medium"
                >
                  <item.icon className="text-muted-foreground size-5" aria-hidden="true" />
                  {t(item.label)}
                  {item.label === 'messages' ? <UnreadBadge className="ms-auto" /> : null}
                </Link>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </>
  );
}
