'use client';

import { LogOut, Monitor, Moon, Sun, UserRound } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useLogout, useMe } from '@/features/auth/api';
import { useIsClient } from '@/lib/client-hooks';

export function ProfileMenu() {
  const t = useTranslations('shell');
  const me = useMe();
  const logout = useLogout();
  const { theme, setTheme } = useTheme();
  // The theme is only known on the client; avoid a hydration mismatch on its state.
  const mounted = useIsClient();

  const user = me.data;
  const initials = user ? `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase() : '';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label={t('profile.open')}
            className="focus-visible:ring-ring/40 flex size-11 items-center justify-center rounded-full outline-none focus-visible:ring-3 md:size-9"
          />
        }
      >
        {user ? (
          <Avatar className="ring-border size-8 ring-1">
            <AvatarFallback className="bg-primary-soft text-primary-ink text-xs font-semibold">
              {initials || <UserRound className="size-4" />}
            </AvatarFallback>
          </Avatar>
        ) : (
          <Skeleton className="size-8 rounded-full" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col gap-1 py-2 font-normal">
            <span className="text-muted-foreground text-xs">{t('profile.signedInAs')}</span>
            <span className="text-foreground truncate text-sm font-medium">
              {user ? `${user.firstName} ${user.lastName}` : ''}
            </span>
            <span className="text-muted-foreground truncate text-xs">{user?.email}</span>
            <span className="mt-1 flex flex-wrap gap-1.5">
              {user ? <Badge variant="neutral">{t(`roles.${user.role}`)}</Badge> : null}
              {user?.company?.publicCode ? (
                <Badge variant="code">{user.company.publicCode}</Badge>
              ) : null}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground text-xs">
            {t('theme.label')}
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={mounted ? (theme ?? 'system') : 'system'}
            onValueChange={(value: string) => setTheme(value)}
          >
            <DropdownMenuRadioItem value="light">
              <Sun />
              {t('theme.light')}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              <Moon />
              {t('theme.dark')}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">
              <Monitor />
              {t('theme.system')}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
        >
          <LogOut />
          {t('actions.signOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
