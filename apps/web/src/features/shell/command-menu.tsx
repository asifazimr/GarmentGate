'use client';

import type { Role } from '@garmentgate/shared';
import { FilePlus2, LogOut, Monitor, Moon, Search, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { Kbd } from '@/components/ui/kbd';
import { useLogout } from '@/features/auth/api';
import { useIsMac } from '@/lib/client-hooks';
import { cn } from '@/lib/utils';
import { NAV } from './nav';

/** ⌘K / Ctrl+K palette: jump anywhere in two keystrokes. */
export function CommandMenu({ role }: { role: Role }) {
  const t = useTranslations('shell');
  const tn = useTranslations('nav');
  const router = useRouter();
  const { setTheme } = useTheme();
  const logout = useLogout();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const run = (action: () => void) => {
    setOpen(false);
    action();
  };

  return (
    <>
      <SearchTrigger onOpen={() => setOpen(true)} />
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={t('commandTitle')}
        description={t('searchHint')}
      >
        {/* cmdk needs its own root inside the dialog. */}
        <Command>
          <CommandInput placeholder={t('searchHint')} />
          <CommandList>
            <CommandEmpty>{t('noResults')}</CommandEmpty>
            <CommandGroup heading={t('groups.navigate')}>
              {NAV[role].map((item) => (
                <CommandItem
                  key={item.href}
                  value={tn(item.label)}
                  onSelect={() => run(() => router.push(item.href))}
                >
                  <item.icon />
                  {tn(item.label)}
                </CommandItem>
              ))}
            </CommandGroup>
            {role === 'BUYER' ? (
              <CommandGroup heading={t('groups.actions')}>
                <CommandItem onSelect={() => run(() => router.push('/buyer/rfqs'))}>
                  <FilePlus2 />
                  {t('actions.newRfq')}
                </CommandItem>
              </CommandGroup>
            ) : null}
            <CommandSeparator />
            <CommandGroup heading={t('groups.theme')}>
              <CommandItem onSelect={() => run(() => setTheme('light'))}>
                <Sun />
                {t('theme.light')}
              </CommandItem>
              <CommandItem onSelect={() => run(() => setTheme('dark'))}>
                <Moon />
                {t('theme.dark')}
              </CommandItem>
              <CommandItem onSelect={() => run(() => setTheme('system'))}>
                <Monitor />
                {t('theme.system')}
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading={t('groups.account')}>
              <CommandItem onSelect={() => run(() => logout.mutate())}>
                <LogOut />
                {t('actions.signOut')}
                <CommandShortcut />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

function SearchTrigger({ onOpen }: { onOpen: () => void }) {
  const t = useTranslations('shell');
  const isMac = useIsMac();
  return (
    <>
      {/* Desktop: a search field that opens the palette */}
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={t('searchHint')}
        className={cn(
          'hidden h-9 w-full max-w-sm items-center gap-2 rounded-lg border bg-card px-3 text-sm text-subtle-foreground shadow-xs transition-colors outline-none hover:border-border-strong hover:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/30 md:flex',
        )}
      >
        <Search className="size-4" aria-hidden="true" />
        <span className="flex-1 text-start">{t('search')}</span>
        <Kbd>{isMac ? '⌘' : 'Ctrl'}</Kbd>
        <Kbd>K</Kbd>
      </button>
      {/* Mobile: an icon */}
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={t('searchHint')}
        className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-11 items-center justify-center rounded-lg md:hidden"
      >
        <Search className="size-5" aria-hidden="true" />
      </button>
    </>
  );
}
