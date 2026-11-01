'use client';

import type { Role } from '@garmentgate/shared';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { UnreadBadge } from '@/features/chat/components/unread-badge';
import { cn } from '@/lib/utils';
import { isActive, NAV } from './nav';

/** Desktop navigation. Collapses to an icon rail; labels move into tooltips. */
export function Sidebar(props: { role: Role; collapsed: boolean; onToggle: () => void }) {
  // The pathname is request data on dynamic routes: read it inside Suspense and render the
  // same nav without a highlight until it's known.
  return (
    <Suspense fallback={<SidebarNav {...props} pathname={null} />}>
      <ActiveSidebar {...props} />
    </Suspense>
  );
}

function ActiveSidebar(props: { role: Role; collapsed: boolean; onToggle: () => void }) {
  return <SidebarNav {...props} pathname={usePathname()} />;
}

function SidebarNav({
  role,
  collapsed,
  onToggle,
  pathname,
}: {
  role: Role;
  collapsed: boolean;
  onToggle: () => void;
  pathname: string | null;
}) {
  const t = useTranslations('nav');
  const items = NAV[role];
  const home = items[0]?.href ?? '/';

  return (
    <aside
      className={cn(
        'bg-sidebar sticky top-0 hidden h-dvh shrink-0 flex-col border-e transition-[width] duration-300 ease-out-expo lg:flex',
        collapsed ? 'w-[4.25rem]' : 'w-64',
      )}
    >
      <div className={cn('flex h-16 items-center', collapsed ? 'justify-center' : 'px-5')}>
        <Link
          href={home}
          aria-label="GarmentGate"
          className="rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          <Logo iconOnly={collapsed} />
        </Link>
      </div>

      <nav aria-label={t('mainNavigation')} className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-0.5">
          {items.map((item) => {
            const active = pathname !== null && isActive(pathname, item.href, home);
            const link = (
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group relative flex h-9 items-center gap-3 rounded-lg px-2.5 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/40',
                  active
                    ? 'bg-card text-foreground shadow-xs ring-1 ring-border'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground',
                  collapsed && 'justify-center px-0',
                )}
              >
                <item.icon
                  className={cn(
                    'size-[1.125rem] shrink-0 transition-colors',
                    active
                      ? 'text-primary-ink'
                      : 'text-subtle-foreground group-hover:text-foreground',
                  )}
                  aria-hidden="true"
                />
                <span className={cn('truncate', collapsed && 'sr-only')}>{t(item.label)}</span>
                {item.label === 'messages' ? (
                  <UnreadBadge
                    dot={collapsed}
                    className={collapsed ? 'absolute top-1.5 end-1.5' : 'ms-auto'}
                  />
                ) : null}
              </Link>
            );
            return (
              <li key={item.href}>
                {collapsed ? (
                  <Tooltip>
                    <TooltipTrigger render={link} />
                    <TooltipContent side="right">{t(item.label)}</TooltipContent>
                  </Tooltip>
                ) : (
                  link
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={cn('border-t p-3', collapsed && 'flex justify-center')}>
        <Button
          variant="ghost"
          size={collapsed ? 'icon-sm' : 'sm'}
          className={cn(!collapsed && 'w-full justify-start')}
          onClick={onToggle}
          aria-label={collapsed ? t('expand') : t('collapse')}
          aria-expanded={!collapsed}
        >
          {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          {collapsed ? null : <span>{t('collapse')}</span>}
        </Button>
      </div>
    </aside>
  );
}
