'use client';

/*
 * Developer-only gallery of the design system (route: /dev/ui, 404 in production).
 * Sample copy is inline on purpose: this page is tooling, not product UI, so it is exempt
 * from the "all copy through next-intl" rule.
 */

import {
  STATUS_DOMAINS,
  type StatusDomain,
  UPLOAD_CONTENT_TYPES,
  UPLOAD_MAX_BYTES,
} from '@garmentgate/shared';
import {
  ArrowRight,
  Banknote,
  Bell,
  Download,
  Factory,
  FileText,
  Inbox,
  Monitor,
  Moon,
  Package,
  Plus,
  Search,
  Settings,
  Sun,
  Trash2,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { type ReactNode, useState } from 'react';
import { toast } from 'sonner';
import { Logo } from '@/components/logo';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { FileDropzone } from '@/components/patterns/file-dropzone';
import { PageHeader } from '@/components/patterns/page-header';
import { StatCard } from '@/components/patterns/stat-card';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Timeline } from '@/components/patterns/timeline';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Kbd } from '@/components/ui/kbd';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatMoney } from '@/lib/format';
import { useIsClient } from '@/lib/client-hooks';
import { cn } from '@/lib/utils';

const SECTIONS = [
  ['colors', 'Colour'],
  ['type', 'Typography'],
  ['elevation', 'Radius & elevation'],
  ['buttons', 'Buttons'],
  ['forms', 'Form controls'],
  ['badges', 'Badges & status'],
  ['cards', 'Cards'],
  ['tabs', 'Tabs'],
  ['table', 'Table'],
  ['overlays', 'Dialog, Sheet, Command'],
  ['feedback', 'Toasts, tooltips, skeletons'],
  ['patterns', 'Patterns'],
] as const;

export function DesignSystemShowcase() {
  return (
    <div className="min-h-dvh">
      <header className="bg-background/80 sticky top-0 z-30 border-b backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Logo />
          <Badge variant="neutral">Design system</Badge>
          <div className="ms-auto">
            <ThemeSwitch />
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-7xl gap-10 px-4 py-10 sm:px-6">
        <nav aria-label="Sections" className="sticky top-24 hidden h-fit w-48 shrink-0 lg:block">
          <ul className="space-y-0.5 text-sm">
            {SECTIONS.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground block rounded-md px-2.5 py-1.5"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <main className="min-w-0 flex-1 space-y-20">
          <PageHeader
            eyebrow="GarmentGate UI"
            title="Design system"
            description="Tokens, components and patterns. Toggle the theme in the top right to review light and dark."
          />
          <Colors />
          <TypeScale />
          <Elevation />
          <Buttons />
          <Forms />
          <Badges />
          <Cards />
          <TabsDemo />
          <TableDemo />
          <Overlays />
          <Feedback />
          <Patterns />
        </main>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-6">
      <div className="space-y-1 border-b pb-4">
        <h2 className="text-xl font-semibold tracking-[-0.02em]">{title}</h2>
        {description ? <p className="text-muted-foreground text-sm">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Demo({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="space-y-3">
      <p className="text-subtle-foreground text-xs font-medium tracking-wide uppercase">{label}</p>
      <div className={cn('flex flex-wrap items-center gap-3', className)}>{children}</div>
    </div>
  );
}

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  // The theme is only known on the client; avoid a hydration mismatch on its state.
  const mounted = useIsClient();
  const options = [
    ['light', Sun],
    ['dark', Moon],
    ['system', Monitor],
  ] as const;
  return (
    <div role="radiogroup" aria-label="Theme" className="bg-muted flex rounded-lg p-1">
      {options.map(([value, Icon]) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={mounted && theme === value}
          aria-label={value}
          onClick={() => setTheme(value)}
          className={cn(
            'flex size-8 items-center justify-center rounded-md transition-colors',
            mounted && theme === value
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  );
}

// ── Foundations ─────────────────────────────────────────────────────────────

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="space-y-1.5">
      <div className={cn('h-14 rounded-lg border', className)} />
      <p className="font-mono text-[0.6875rem]">{name}</p>
    </div>
  );
}

function Colors() {
  const tones = ['success', 'warning', 'info', 'progress', 'danger', 'neutral'] as const;
  const solid: Record<(typeof tones)[number], string> = {
    success: 'bg-success',
    warning: 'bg-warning',
    info: 'bg-info',
    progress: 'bg-progress',
    danger: 'bg-destructive',
    neutral: 'bg-neutral-ink',
  };
  const soft: Record<(typeof tones)[number], string> = {
    success: 'bg-success-soft text-success-ink',
    warning: 'bg-warning-soft text-warning-ink',
    info: 'bg-info-soft text-info-ink',
    progress: 'bg-progress-soft text-progress-ink',
    danger: 'bg-danger-soft text-danger-ink',
    neutral: 'bg-neutral-soft text-neutral-ink',
  };
  return (
    <Section
      id="colors"
      title="Colour"
      description="Semantic tokens with full light and dark values. Use the names, never raw colours."
    >
      <Demo label="Surfaces" className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        <Swatch name="background" className="bg-background" />
        <Swatch name="surface" className="bg-surface" />
        <Swatch name="card" className="bg-card" />
        <Swatch name="muted" className="bg-muted" />
        <Swatch name="border-strong" className="bg-border-strong" />
        <Swatch name="foreground" className="bg-foreground" />
      </Demo>
      <Demo label="Brand" className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        <Swatch name="primary" className="bg-primary" />
        <Swatch name="primary-soft" className="bg-primary-soft" />
        <Swatch name="primary-ink" className="bg-primary-ink" />
        <Swatch name="brand-deep" className="bg-brand-deep" />
        <Swatch name="brand-gold" className="bg-brand-gold" />
        <Swatch name="ring" className="bg-ring" />
      </Demo>
      <Demo
        label="Status tones (solid · soft + ink)"
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
      >
        {tones.map((tone) => (
          <div key={tone} className="space-y-1.5">
            <div className={cn('h-6 rounded-t-lg', solid[tone])} />
            <div
              className={cn(
                'flex h-10 items-center rounded-b-lg px-3 text-sm font-medium',
                soft[tone],
              )}
            >
              {tone}
            </div>
          </div>
        ))}
      </Demo>
    </Section>
  );
}

function TypeScale() {
  return (
    <Section
      id="type"
      title="Typography"
      description="Instrument Serif for display moments, Instrument Sans for the product, Geist Mono for codes and figures."
    >
      <div className="space-y-6">
        <div>
          <p className="text-subtle-foreground mb-2 font-mono text-xs">
            font-display · text-display-xl
          </p>
          <p className="font-display text-display-lg sm:text-display-xl">
            Source <em className="text-primary-ink">with confidence</em>
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            [
              'Page title · 28px semibold',
              'text-[1.75rem] font-semibold tracking-[-0.025em]',
              'Orders in production',
            ],
            [
              'Section · 20px semibold',
              'text-xl font-semibold tracking-[-0.02em]',
              'Quotes for RFQ-2026-00042',
            ],
            [
              'Card title · 15px semibold',
              'text-[0.9375rem] font-semibold',
              'Heavyweight boxy tee',
            ],
            [
              'Body · 15px',
              'text-[0.9375rem] leading-relaxed',
              'Fabric knitted and dyed, shrinkage within 3%. Cutting starts Monday.',
            ],
            [
              'Small · 13px muted',
              'text-[0.8125rem] text-muted-foreground',
              'Updated 3 hours ago by your sourcing team',
            ],
            ['Mono · codes', 'font-mono text-sm tracking-wide', 'MFR-BD-0421 · ORD-2026-00017'],
          ].map(([label, className, sample]) => (
            <div key={label} className="space-y-1">
              <p className="text-subtle-foreground font-mono text-xs">{label}</p>
              <p className={className}>{sample}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Elevation() {
  return (
    <Section
      id="elevation"
      title="Radius & elevation"
      description="10px base radius. Shadows are layered and soft; in dark mode they deepen rather than glow."
    >
      <Demo label="Shadows" className="grid grid-cols-2 gap-6 sm:grid-cols-5">
        {(['shadow-xs', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl'] as const).map((s) => (
          <div
            key={s}
            className={cn(
              'bg-card flex h-20 items-center justify-center rounded-xl border font-mono text-xs',
              s,
            )}
          >
            {s}
          </div>
        ))}
      </Demo>
      <Demo label="Radius" className="grid grid-cols-3 gap-6 sm:grid-cols-6">
        {(
          [
            'rounded-sm',
            'rounded-md',
            'rounded-lg',
            'rounded-xl',
            'rounded-2xl',
            'rounded-full',
          ] as const
        ).map((r) => (
          <div key={r} className="space-y-1.5">
            <div className={cn('bg-primary-soft border-primary/30 size-16 border', r)} />
            <p className="font-mono text-[0.6875rem]">{r}</p>
          </div>
        ))}
      </Demo>
    </Section>
  );
}

// ── Components ──────────────────────────────────────────────────────────────

function Buttons() {
  return (
    <Section
      id="buttons"
      title="Buttons"
      description="44px touch targets on mobile, compact from md. Press feedback via a subtle scale."
    >
      <Demo label="Variants">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="destructive-soft">Destructive soft</Button>
        <Button variant="link">Link</Button>
      </Demo>
      <Demo label="Sizes & icons">
        <Button size="xs">Extra small</Button>
        <Button size="sm">
          <Plus />
          Small
        </Button>
        <Button>
          Default
          <ArrowRight />
        </Button>
        <Button size="lg">Large</Button>
        <Button size="icon" variant="outline" aria-label="Settings">
          <Settings />
        </Button>
        <Button size="icon-sm" variant="ghost" aria-label="Delete">
          <Trash2 />
        </Button>
      </Demo>
      <Demo label="States">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>
          <Download />
          Disabled outline
        </Button>
      </Demo>
    </Section>
  );
}

function Forms() {
  const [market, setMarket] = useState<string | null>('DE');
  const items = [
    { value: 'US', label: 'United States' },
    { value: 'DE', label: 'Germany' },
    { value: 'GB', label: 'United Kingdom' },
  ];
  return (
    <Section id="forms" title="Form controls">
      <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="ds-qty">Quantity (pieces)</FieldLabel>
            <Input id="ds-qty" inputMode="numeric" placeholder="e.g. 6,000" />
            <FieldDescription>Minimum order is 500 pieces per colour.</FieldDescription>
          </Field>
          <Field data-invalid>
            <FieldLabel htmlFor="ds-email">Work email</FieldLabel>
            <Input id="ds-email" aria-invalid defaultValue="lena@" />
            <FieldError>Enter a valid email address</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="ds-market">Destination market</FieldLabel>
            <Select
              items={items}
              value={market}
              onValueChange={(v) => setMarket(typeof v === 'string' ? v : null)}
            >
              <SelectTrigger id="ds-market" className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="ds-notes">Notes for the factory</FieldLabel>
            <Textarea id="ds-notes" placeholder="Fabric, trims, packaging…" />
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="ds-gots" defaultChecked />
            <FieldLabel htmlFor="ds-gots" className="font-normal">
              GOTS certified fabric required
            </FieldLabel>
          </Field>
          <Field>
            <FieldLabel htmlFor="ds-disabled">Disabled</FieldLabel>
            <Input id="ds-disabled" disabled defaultValue="Read only" />
          </Field>
        </FieldGroup>
      </div>
    </Section>
  );
}

function Badges() {
  return (
    <Section
      id="badges"
      title="Badges & status"
      description="StatusBadge is the only way to show a status. Tones are shared across every domain, so meaning stays consistent."
    >
      <Demo label="Badge variants">
        <Badge>Default</Badge>
        <Badge variant="brand">Brand</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="code">MFR-BD-0421</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="progress">Progress</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="neutral">Neutral</Badge>
      </Demo>
      <div className="space-y-4">
        {(Object.keys(STATUS_DOMAINS) as StatusDomain[]).map((domain) => (
          <div key={domain} className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:items-center">
            <p className="text-subtle-foreground font-mono text-xs">{domain}</p>
            <div className="flex flex-wrap gap-2">
              {STATUS_DOMAINS[domain].options.map((status) => (
                <DomainBadge key={status} domain={domain} status={status} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/** Loosens StatusBadge's generic for iterating over every domain in the gallery. */
function DomainBadge({ domain, status }: { domain: StatusDomain; status: string }) {
  return <StatusBadge domain={domain} status={status as never} />;
}

function Cards() {
  const locale = useLocale();
  return (
    <Section id="cards" title="Cards">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Heavyweight boxy tee</CardTitle>
            <CardDescription>240 GSM · 100% combed cotton</CardDescription>
            <CardAction>
              <StatusBadge domain="order" status="IN_PRODUCTION" />
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p className="tabular text-2xl font-semibold tracking-[-0.02em]">
              {formatMoney(3900000, 'USD', locale)}
            </p>
            <p className="text-muted-foreground">12,000 pcs · FOB Chattogram</p>
          </CardContent>
          <CardFooter>
            <Badge variant="code">MFR-BD-0421</Badge>
            <Button variant="ghost" size="sm" className="ms-auto">
              View order
              <ArrowRight />
            </Button>
          </CardFooter>
        </Card>
        <Card interactive>
          <CardHeader>
            <span className="bg-primary-soft text-primary-ink mb-2 flex size-10 items-center justify-center rounded-lg">
              <FileText className="size-5" />
            </span>
            <CardTitle>Interactive card</CardTitle>
            <CardDescription>Hover to lift. Use for cards that navigate.</CardDescription>
          </CardHeader>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Small card</CardTitle>
            <CardDescription>Tighter padding for dense layouts and side panels.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </Section>
  );
}

function TabsDemo() {
  return (
    <Section id="tabs" title="Tabs">
      <Tabs defaultValue="open">
        <TabsList>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="awarded">Awarded</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>
        <TabsContent value="open" className="text-muted-foreground pt-2 text-sm">
          3 open requests
        </TabsContent>
        <TabsContent value="awarded" className="text-muted-foreground pt-2 text-sm">
          1 awarded request
        </TabsContent>
        <TabsContent value="closed" className="text-muted-foreground pt-2 text-sm">
          No closed requests
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="overview">
        <TabsList variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>
      </Tabs>
    </Section>
  );
}

function TableDemo() {
  const locale = useLocale();
  const rows = [
    {
      code: 'ORD-2026-00017',
      product: 'Heavyweight boxy tee',
      factory: 'MFR-BD-0421',
      qty: 12000,
      total: 3900000,
      status: 'IN_PRODUCTION' as const,
    },
    {
      code: 'ORD-2026-00016',
      product: 'Organic loopback sweatshirt',
      factory: 'MFR-IN-0264',
      qty: 3000,
      total: 2790000,
      status: 'QC' as const,
    },
    {
      code: 'ORD-2026-00012',
      product: 'High-rise sculpt leggings',
      factory: 'MFR-VN-0133',
      qty: 2400,
      total: 1956000,
      status: 'SHIPPED' as const,
    },
    {
      code: 'ORD-2026-00009',
      product: 'Five-pocket slim jeans',
      factory: 'MFR-BD-0587',
      qty: 5000,
      total: 4225000,
      status: 'DEPOSIT_PENDING' as const,
    },
    {
      code: 'ORD-2026-00004',
      product: 'Piqué polo shirt',
      factory: 'MFR-BD-0421',
      qty: 1500,
      total: 727500,
      status: 'DISPUTED' as const,
    },
  ];
  return (
    <Section
      id="table"
      title="Table"
      description="Tabular figures, uppercase micro-headings, quiet row hover. Scrolls horizontally inside its own container on mobile."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Factory</TableHead>
            <TableHead className="text-end">Quantity</TableHead>
            <TableHead className="text-end">Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.code}>
              <TableCell className="font-mono text-xs font-medium">{r.code}</TableCell>
              <TableCell className="font-medium">{r.product}</TableCell>
              <TableCell>
                <Badge variant="code">{r.factory}</Badge>
              </TableCell>
              <TableCell className="text-end">
                {new Intl.NumberFormat(locale).format(r.qty)}
              </TableCell>
              <TableCell className="text-end">{formatMoney(r.total, 'USD', locale)}</TableCell>
              <TableCell>
                <StatusBadge domain="order" status={r.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Section>
  );
}

function Overlays() {
  return (
    <Section
      id="overlays"
      title="Dialog, Sheet, Command"
      description="Dialogs become bottom sheets on mobile. ⌘K opens the command menu inside the app shell."
    >
      <Demo label="Triggers">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Accept this offer?</DialogTitle>
              <DialogDescription>
                MFR-BD-0421 · 6,000 pcs at €11.27. A 30% deposit is held in escrow and released as
                milestones are approved.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Accept and pay deposit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>Open sheet</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter orders</SheetTitle>
              <SheetDescription>Narrow down by status and factory.</SheetDescription>
            </SheetHeader>
            <div className="flex flex-wrap gap-2 px-5">
              <StatusBadge domain="order" status="IN_PRODUCTION" />
              <StatusBadge domain="order" status="SHIPPED" />
              <StatusBadge domain="order" status="DISPUTED" />
            </div>
            <SheetFooter>
              <Button>Apply filters</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Demo>
      <Demo label="Command (inline)" className="block">
        <Command className="max-w-xl rounded-xl border shadow-md">
          <CommandInput placeholder="Search pages and actions" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Go to">
              <CommandItem>
                <Package />
                Orders
              </CommandItem>
              <CommandItem>
                <FileText />
                Requests for quote
              </CommandItem>
              <CommandItem>
                <Factory />
                Factories
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Actions">
              <CommandItem>
                <Plus />
                Create a request for quote
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </Demo>
    </Section>
  );
}

function Feedback() {
  return (
    <Section id="feedback" title="Toasts, tooltips, skeletons">
      <Demo label="Toasts (Sonner)">
        <Button
          variant="outline"
          onClick={() =>
            toast.success('Quote sent to buyer', { description: 'RFQ-2026-00042 · MFR-BD-0421' })
          }
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.error('Upload failed', { description: 'The file is larger than 10 MB.' })
          }
        >
          Error
        </Button>
        <Button variant="outline" onClick={() => toast.info('Inline QC booked for Thursday')}>
          Info
        </Button>
        <Button variant="outline" onClick={() => toast.warning('Deposit due in 2 days')}>
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
              loading: 'Submitting for verification…',
              success: 'Submitted',
              error: 'Failed',
            })
          }
        >
          Promise
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast('Message archived', {
              action: { label: 'Undo', onClick: () => toast.success('Restored') },
            })
          }
        >
          With action
        </Button>
      </Demo>
      <Demo label="Tooltip & keyboard">
        <Tooltip>
          <TooltipTrigger
            render={<Button variant="outline" size="icon" aria-label="Notifications" />}
          >
            <Bell />
          </TooltipTrigger>
          <TooltipContent>
            Notifications <Kbd>N</Kbd>
          </TooltipContent>
        </Tooltip>
        <span className="text-muted-foreground inline-flex items-center gap-1.5 text-sm">
          <Search className="size-4" /> Search <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </span>
      </Demo>
      <Demo label="Skeleton" className="block">
        <div className="bg-card max-w-xl divide-y rounded-xl border">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <Skeleton className="size-10 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
              <Skeleton className="h-6 w-24 rounded-md" />
            </div>
          ))}
        </div>
      </Demo>
      <Alert>
        <Truck />
        <AlertTitle>Alert</AlertTitle>
        <AlertDescription>
          Your shipment ETD moved to 22 Nov. Your sourcing team has updated the plan.
        </AlertDescription>
      </Alert>
    </Section>
  );
}

// ── Patterns ────────────────────────────────────────────────────────────────

function Patterns() {
  const locale = useLocale();
  const [progress, setProgress] = useState<number | null>(null);
  const [uploaded, setUploaded] = useState<string | null>(null);

  const simulateUpload = (file: File) => {
    setUploaded(null);
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = (p ?? 0) + 12;
        if (next >= 100) {
          clearInterval(timer);
          setUploaded(file.name);
          return null;
        }
        return next;
      });
    }, 120);
  };

  return (
    <Section
      id="patterns"
      title="Patterns"
      description="Composed building blocks. Every list in the product uses EmptyState / ErrorState / skeletons."
    >
      <Demo label="PageHeader" className="block">
        <div className="bg-card rounded-xl border p-6">
          <PageHeader
            eyebrow="BYR-DE-0007"
            title="Requests for quote"
            description="Track every request, compare offers side by side and award the best one."
            actions={
              <Button>
                <Plus />
                New request
              </Button>
            }
          />
        </div>
      </Demo>

      <Demo label="StatCard" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Active orders"
          value="8"
          icon={Package}
          delta={{ label: '+2', direction: 'up', sentiment: 'positive' }}
          hint="vs last month"
          trend={[3, 4, 4, 5, 6, 6, 8]}
        />
        <StatCard
          label="In escrow"
          value={formatMoney(11700000, 'USD', locale)}
          icon={Banknote}
          hint="across 3 orders"
        />
        <StatCard
          label="On-time delivery"
          value="94.5%"
          delta={{ label: '−1.2%', direction: 'down', sentiment: 'negative' }}
          trend={[97, 96, 96, 95, 95.5, 94.5]}
        />
        <StatCard label="Open RFQs" value="0" loading />
      </Demo>

      <div className="grid gap-6 lg:grid-cols-2">
        <Demo label="EmptyState" className="block">
          <EmptyState
            icon={Inbox}
            title="No requests yet"
            description="Create your first request for quote and matched factories will start sending offers."
            action={
              <Button>
                <Plus />
                Request a quote
              </Button>
            }
          />
        </Demo>
        <Demo label="ErrorState" className="block">
          <ErrorState onRetry={() => toast.info('Retrying…')} />
        </Demo>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Demo label="FileDropzone" className="block space-y-3">
          <FileDropzone
            accept={UPLOAD_CONTENT_TYPES}
            maxBytes={UPLOAD_MAX_BYTES}
            progress={progress}
            onFile={simulateUpload}
          />
          <FileDropzone
            compact
            accept={UPLOAD_CONTENT_TYPES}
            maxBytes={UPLOAD_MAX_BYTES}
            label="Add another file"
            onFile={simulateUpload}
          />
          {uploaded ? (
            <p className="text-success-ink text-sm">Uploaded {uploaded} (simulated)</p>
          ) : null}
        </Demo>
        <Demo label="Timeline" className="block">
          <div className="bg-card rounded-xl border p-6">
            <Timeline
              items={[
                { id: '1', title: 'Order confirmed', meta: '20 Sep', state: 'done' },
                {
                  id: '2',
                  title: 'Fabric sourced',
                  description: 'Shrinkage within 3%.',
                  meta: '4 Oct',
                  state: 'done',
                },
                {
                  id: '3',
                  title: 'Sewing',
                  description: '62% complete',
                  meta: 'Today',
                  state: 'current',
                },
                {
                  id: '4',
                  title: 'Inline inspection',
                  description: 'Inspector reassigned: new date pending',
                  state: 'warning',
                },
                { id: '5', title: 'Ship', meta: '22 Nov', state: 'upcoming' },
              ]}
            />
          </div>
        </Demo>
      </div>

      <Demo label="App shell">
        <p className="text-muted-foreground text-sm">
          The shell (sidebar, bottom nav, ⌘K, notifications, profile menu) wraps every signed-in
          area. Sign in as a demo user to see it:
        </p>
        <Button variant="outline" size="sm" render={<Link href="/login" />}>
          Sign in
          <ArrowRight />
        </Button>
      </Demo>
    </Section>
  );
}
