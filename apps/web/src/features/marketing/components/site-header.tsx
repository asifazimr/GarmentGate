'use client';

import { ChevronDown, ChevronRight, MapPin, Menu } from 'lucide-react';
import Link from 'next/link';
import { useMessages, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { MENU, type MenuPanel } from './menu';
import { RegionPicker } from './region-picker';

const TRACK_ORDER = '/login?next=/buyer/orders';

/** One panel's copy (`marketing.menu.<audience>`), looked up by the keys in `MENU`. */
const PanelCopy = z.object({
  tab: z.string(),
  steps: z.record(z.string(), z.string()),
  columns: z.record(z.string(), z.string()),
  links: z.record(z.string(), z.string()),
  promo: z.object({ title: z.string(), cta: z.string() }),
});

function usePanelCopy(key: MenuPanel['key']) {
  const copy = PanelCopy.parse(useMessages().marketing.menu[key]);
  return {
    ...copy,
    label: (group: 'steps' | 'columns' | 'links', id: string) => copy[group][id] ?? id,
  };
}
const START_PROJECT = '/register?as=buyer';

/**
 * Public site header. Top row: logo, language and currency, track order, sign in and "Start a
 * project". Second row: one tab per audience, each opening a panel with its journey in steps,
 * three columns of links and a highlight card. Phones get the same content in collapsible
 * sections.
 */
export function SiteHeader({ locales }: { locales: string[] }) {
  const t = useTranslations('marketing');
  const [open, setOpen] = useState<MenuPanel['key'] | null>(null);
  const [mobile, setMobile] = useState(false);
  const header = useRef<HTMLElement>(null);
  const triggers = useRef<Partial<Record<MenuPanel['key'], HTMLButtonElement | null>>>({});
  const panel = MENU.find((p) => p.key === open);

  // Close on Escape (back to its tab) or a click outside the header.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      triggers.current[open]?.focus();
      setOpen(null);
    };
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Node && !header.current?.contains(e.target)) setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <header
      ref={header}
      className="bg-background/90 supports-backdrop-filter:bg-background/75 sticky z-40 border-b backdrop-blur-xl"
      style={{ top: 'env(safe-area-inset-top, 0px)' }}
    >
      {/* ── Top row ─────────────────────────────────────────── */}
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link
          href="/"
          aria-label={t('nav.home')}
          className="focus-visible:ring-ring/40 rounded-md outline-none focus-visible:ring-3"
        >
          <Logo />
        </Link>
        <div className="ms-auto flex items-center gap-1 sm:gap-2">
          <RegionPicker locales={locales} className="hidden md:inline-flex" />
          <Link
            href={TRACK_ORDER}
            className="text-muted-foreground hover:text-foreground hidden min-h-9 items-center gap-1.5 rounded-md px-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/40 md:inline-flex"
          >
            <MapPin className="size-4" aria-hidden="true" />
            {t('nav.trackOrder')}
          </Link>
          <Button
            variant="outline"
            className="hidden sm:inline-flex"
            render={<Link href="/login" />}
          >
            {t('nav.signIn')}
          </Button>
          <Button render={<Link href={START_PROJECT} />}>{t('nav.startProject')}</Button>
          <MobileMenu open={mobile} onOpenChange={setMobile} locales={locales} />
        </div>
      </div>

      {/* ── Audience tabs ───────────────────────────────────── */}
      <nav aria-label={t('nav.audiences')} className="hidden border-t lg:block">
        <ul className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:px-6">
          {MENU.map(({ key, Icon }) => (
            <li key={key}>
              <button
                ref={(el) => {
                  triggers.current[key] = el;
                }}
                type="button"
                aria-expanded={open === key}
                aria-controls="site-menu-panel"
                onClick={() => setOpen((o) => (o === key ? null : key))}
                onMouseEnter={() => {
                  if (open && open !== key) setOpen(key);
                }}
                className={cn(
                  'inline-flex min-h-10 items-center gap-2 rounded-xl border px-4 text-[0.9375rem] font-medium transition-[background-color,border-color,color] outline-none focus-visible:ring-3 focus-visible:ring-ring/40',
                  open === key
                    ? 'border-primary/40 bg-primary-soft text-primary-ink'
                    : 'bg-card text-foreground hover:border-border-strong',
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {t(`menu.${key}.tab`)}
                <ChevronDown
                  className={cn(
                    'size-3.5 opacity-60 transition-transform motion-reduce:transition-none',
                    open === key && 'rotate-180',
                  )}
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Panel ───────────────────────────────────────────── */}
      {panel ? (
        <div
          id="site-menu-panel"
          className="bg-background animate-in fade-in-0 slide-in-from-top-1 absolute inset-x-0 top-full hidden border-b shadow-lg duration-150 motion-reduce:animate-none lg:block"
        >
          <PanelBody panel={panel} onNavigate={() => setOpen(null)} />
        </div>
      ) : null}
    </header>
  );
}

/** Steps strip, three link columns and the highlight card of one audience. */
function PanelBody({ panel, onNavigate }: { panel: MenuPanel; onNavigate: () => void }) {
  const copy = usePanelCopy(panel.key);
  const PromoIcon = panel.promo.Icon;
  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 pb-8 sm:px-6">
      <ol className="flex items-start">
        {panel.steps.map((step, i) => (
          <li key={step} className="flex flex-1 items-start">
            <span className="flex flex-1 flex-col items-center gap-2 text-center">
              <span className="bg-primary-soft text-primary-ink flex size-10 items-center justify-center rounded-full font-medium tabular-nums">
                {i + 1}
              </span>
              <span className="text-muted-foreground text-sm">{copy.label('steps', step)}</span>
            </span>
            {i < panel.steps.length - 1 ? (
              <ChevronRight
                className="text-muted-foreground mt-3 size-4 shrink-0 rtl:rotate-180"
                aria-hidden="true"
              />
            ) : null}
          </li>
        ))}
      </ol>
      <div className="mt-6 grid grid-cols-[1fr_1fr_1fr_1.15fr] gap-8 border-t pt-6">
        {panel.columns.map((column) => (
          <div key={column.key}>
            <h2 className="text-muted-foreground text-sm font-medium">
              {copy.label('columns', column.key)}
            </h2>
            <ul className="mt-3 grid gap-1">
              {column.links.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className="hover:text-primary-ink focus-visible:text-primary-ink -mx-2 block rounded-md px-2 py-1.5 text-[0.9375rem] transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                  >
                    {copy.label('links', link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="bg-primary-soft flex flex-col items-start gap-4 rounded-2xl p-6">
          <PromoIcon className="text-primary-ink size-7" aria-hidden="true" />
          <p className="text-primary-ink text-lg leading-snug font-medium text-balance">
            {copy.promo.title}
          </p>
          <Button
            variant="outline"
            className="border-primary/30 text-primary-ink mt-auto bg-transparent"
            render={<Link href={panel.promo.href} onClick={onNavigate} />}
          >
            {copy.promo.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Phones and tablets: everything in a sheet, one collapsible section per audience. */
function MobileMenu({
  open,
  onOpenChange,
  locales,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locales: string[];
}) {
  const t = useTranslations('marketing');
  const close = () => onOpenChange(false);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t('nav.menu')} />
        }
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side="right" className="w-full overflow-y-auto p-5 sm:max-w-md">
        <SheetTitle className="sr-only">{t('nav.menu')}</SheetTitle>
        <Logo />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <RegionPicker locales={locales} />
          <Link
            href={TRACK_ORDER}
            onClick={close}
            className="text-muted-foreground inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-sm font-medium"
          >
            <MapPin className="size-4" aria-hidden="true" />
            {t('nav.trackOrder')}
          </Link>
        </div>
        <nav aria-label={t('nav.audiences')} className="divide-y border-y">
          {MENU.map((panel) => (
            <MobileSection key={panel.key} panel={panel} onNavigate={close} />
          ))}
        </nav>
        <div className="grid gap-2">
          <Button render={<Link href={START_PROJECT} onClick={close} />}>
            {t('nav.startProject')}
          </Button>
          <Button variant="outline" render={<Link href="/login" onClick={close} />}>
            {t('nav.signIn')}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MobileSection({ panel, onNavigate }: { panel: MenuPanel; onNavigate: () => void }) {
  const copy = usePanelCopy(panel.key);
  const Icon = panel.Icon;
  return (
    <details className="group">
      <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 font-medium outline-none focus-visible:underline [&::-webkit-details-marker]:hidden">
        <Icon className="text-primary-ink size-4" aria-hidden="true" />
        {copy.tab}
        <ChevronDown
          className="text-muted-foreground ms-auto size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </summary>
      <div className="grid gap-4 pb-4">
        {panel.columns.map((column) => (
          <div key={column.key}>
            <p className="text-muted-foreground text-xs font-medium">
              {copy.label('columns', column.key)}
            </p>
            <ul className="mt-1 grid">
              {column.links.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className="flex min-h-11 items-center text-[0.9375rem]"
                  >
                    {copy.label('links', link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link
          href={panel.promo.href}
          onClick={onNavigate}
          className="bg-primary-soft text-primary-ink rounded-xl p-4 text-sm font-medium"
        >
          {copy.promo.title} →
        </Link>
      </div>
    </details>
  );
}
