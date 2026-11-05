'use client';

import {
  type Hub,
  type HubDto,
  type HubInput,
  HubInputSchema,
  type LogisticsPartner,
  type LogisticsPartnerDto,
  type LogisticsPartnerInput,
  LogisticsPartnerInputSchema,
  LogisticsPartnerKindSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Pencil, Plus, UserPlus, Warehouse } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { CountrySelect } from '@/features/onboarding/components/pickers';
import { applyServerErrors } from '@/lib/form-errors';
import { countryName } from '@/lib/countries';
import {
  useHubs,
  useInvitePartnerUser,
  usePartners,
  usePartnerUsers,
  useSaveHub,
  useSavePartner,
} from '../api';
import { OptionSelect } from './form-bits';

// ── Partners ────────────────────────────────────────────────────────────────

export function PartnersTab() {
  const t = useTranslations('logistics.partners');
  const tk = useTranslations('logistics.partnerKinds');
  const locale = useLocale();
  const partners = usePartners();
  const [editing, setEditing] = useState<LogisticsPartner | 'new' | null>(null);
  const [people, setPeople] = useState<LogisticsPartner | null>(null);
  const columns = useMemo<DataColumn<LogisticsPartner>[]>(
    () => [
      {
        id: 'name',
        header: t('columns.name'),
        value: (p) => `${p.code} ${p.name}`,
        cell: (p) => (
          <span>
            <span className="font-medium">{p.name}</span>
            <span className="text-muted-foreground block font-mono text-xs">{p.code}</span>
          </span>
        ),
      },
      { id: 'kind', header: t('columns.kind'), value: (p) => tk(p.kind) },
      { id: 'country', header: t('columns.country'), value: (p) => countryName(p.country, locale) },
      {
        id: 'contact',
        header: t('columns.contact'),
        value: (p) => [p.contactEmail, p.contactPhone].filter(Boolean).join(' · '),
        hideOnMobile: true,
      },
      {
        id: 'rateCards',
        header: t('columns.rateCards'),
        value: (p) => p.rateCards,
        align: 'end',
        searchable: false,
      },
      {
        id: 'status',
        header: t('columns.status'),
        value: (p) => (p.active ? t('active') : t('inactive')),
        cell: (p) => (
          <Badge variant={p.active ? 'success' : 'neutral'}>
            {p.active ? t('active') : t('inactive')}
          </Badge>
        ),
      },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (p) => (
          <span className="flex justify-end gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={t('users')}
              onClick={() => setPeople(p)}
            >
              <UserPlus />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={t('edit')}
              onClick={() => setEditing(p)}
            >
              <Pencil />
            </Button>
          </span>
        ),
        sortable: false,
        searchable: false,
        csv: false,
        align: 'end',
      },
    ],
    [t, tk, locale],
  );
  return (
    <div className="space-y-4">
      <Toolbar description={t('description')} add={t('add')} onAdd={() => setEditing('new')} />
      <DataTable
        data={partners.data}
        columns={columns}
        loading={partners.isPending}
        error={partners.isError}
        onRetry={() => void partners.refetch()}
        retrying={partners.isFetching}
        filters={[{ column: 'kind', label: t('columns.kind') }]}
        initialSort={{ id: 'name', desc: false }}
        csvName="logistics-partners"
        empty={{ icon: Building2, title: t('empty'), description: t('emptyBody') }}
      />
      <PartnerUsersDialog partner={people} onClose={() => setPeople(null)} />
      <Dialog open={editing !== null} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
          {editing !== null ? (
            <PartnerForm
              key={editing === 'new' ? 'new' : editing.id}
              partner={editing === 'new' ? null : editing}
              onClose={() => setEditing(null)}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PartnerForm({
  partner,
  onClose,
}: {
  partner: LogisticsPartner | null;
  onClose: () => void;
}) {
  const t = useTranslations('logistics.partners');
  const tk = useTranslations('logistics.partnerKinds');
  const tc = useTranslations('common');
  const save = useSavePartner();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<LogisticsPartnerInput, unknown, LogisticsPartnerDto>({
    resolver: zodResolver(LogisticsPartnerInputSchema),
    defaultValues: {
      name: partner?.name ?? '',
      kind: partner?.kind ?? 'FORWARDER',
      country: partner?.country ?? '',
      contactEmail: partner?.contactEmail ?? '',
      contactPhone: partner?.contactPhone ?? '',
      notes: partner?.notes ?? '',
      active: partner?.active ?? true,
    },
  });
  const { errors, isSubmitting } = form.formState;
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await save.mutateAsync({ id: partner?.id ?? null, dto });
      toast.success(t('saved'));
      onClose();
    } catch (error) {
      setFormError(
        applyServerErrors(error, form.setError, ['name', 'contactEmail'], tc('networkError')),
      );
    }
  });
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <DialogHeader>
        <DialogTitle>
          {partner ? t('editTitle', { code: partner.code }) : t('newTitle')}
        </DialogTitle>
        <DialogDescription>{t('dialogDescription')}</DialogDescription>
      </DialogHeader>
      <FormAlert message={formError} />
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="lp-name">{t('fields.name')}</FieldLabel>
          <Input id="lp-name" {...form.register('name')} />
          <FieldError errors={[errors.name]} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="lp-kind">{t('fields.kind')}</FieldLabel>
            <Controller
              control={form.control}
              name="kind"
              render={({ field }) => (
                <OptionSelect
                  id="lp-kind"
                  value={field.value}
                  onChange={(v) => {
                    const kind = LogisticsPartnerKindSchema.safeParse(v);
                    if (kind.success) field.onChange(kind.data);
                  }}
                  options={LogisticsPartnerKindSchema.options.map((k) => ({
                    value: k,
                    label: tk(k),
                  }))}
                />
              )}
            />
          </Field>
          <Field data-invalid={!!errors.country}>
            <FieldLabel htmlFor="lp-country">{t('fields.country')}</FieldLabel>
            <Controller
              control={form.control}
              name="country"
              render={({ field }) => (
                <CountrySelect
                  id="lp-country"
                  value={field.value || undefined}
                  onChange={field.onChange}
                  placeholder={t('choose')}
                  invalid={!!errors.country}
                />
              )}
            />
            <FieldError errors={[errors.country]} />
          </Field>
          <Field data-invalid={!!errors.contactEmail}>
            <FieldLabel htmlFor="lp-email">{t('fields.email')}</FieldLabel>
            <Input id="lp-email" type="email" {...form.register('contactEmail')} />
            <FieldError errors={[errors.contactEmail]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="lp-phone">{t('fields.phone')}</FieldLabel>
            <Input id="lp-phone" type="tel" {...form.register('contactPhone')} />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="lp-notes">{t('fields.notes')}</FieldLabel>
          <Textarea id="lp-notes" rows={2} {...form.register('notes')} />
        </Field>
        <Controller
          control={form.control}
          name="active"
          render={({ field }) => (
            <ActiveCheckbox
              id="lp-active"
              label={t('fields.active')}
              checked={field.value ?? true}
              onChange={field.onChange}
            />
          )}
        />
      </FieldGroup>
      <Footer onClose={onClose} pending={isSubmitting} save={t('save')} />
    </form>
  );
}

// ── Hubs ────────────────────────────────────────────────────────────────────

export function HubsTab() {
  const t = useTranslations('logistics.hubs');
  const locale = useLocale();
  const hubs = useHubs();
  const [editing, setEditing] = useState<Hub | 'new' | null>(null);
  const columns = useMemo<DataColumn<Hub>[]>(
    () => [
      {
        id: 'hub',
        header: t('columns.hub'),
        value: (h) => `${h.code} ${h.name}`,
        cell: (h) => (
          <span>
            <Badge variant="code">{h.code}</Badge>
            <span className="text-muted-foreground block text-xs">{h.name}</span>
          </span>
        ),
      },
      {
        id: 'place',
        header: t('columns.place'),
        value: (h) => `${h.city}, ${countryName(h.country, locale)}`,
        cell: (h) => (
          <span>
            {h.city}, {countryName(h.country, locale)}
            <span className="text-muted-foreground block text-xs">{h.addressLine1}</span>
          </span>
        ),
      },
      {
        id: 'port',
        header: t('columns.port'),
        value: (h) => h.port ?? '—',
        className: 'font-mono text-xs',
      },
      {
        id: 'operator',
        header: t('columns.operator'),
        value: (h) => (h.partner ? h.partner.name : t('garmentGate')),
        hideOnMobile: true,
      },
      {
        id: 'status',
        header: t('columns.status'),
        value: (h) => (h.active ? t('active') : t('inactive')),
        cell: (h) => (
          <Badge variant={h.active ? 'success' : 'neutral'}>
            {h.active ? t('active') : t('inactive')}
          </Badge>
        ),
      },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (h) => (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={t('edit')}
            onClick={() => setEditing(h)}
          >
            <Pencil />
          </Button>
        ),
        sortable: false,
        searchable: false,
        csv: false,
        align: 'end',
      },
    ],
    [t, locale],
  );
  return (
    <div className="space-y-4">
      <Toolbar description={t('description')} add={t('add')} onAdd={() => setEditing('new')} />
      <DataTable
        data={hubs.data}
        columns={columns}
        loading={hubs.isPending}
        error={hubs.isError}
        onRetry={() => void hubs.refetch()}
        retrying={hubs.isFetching}
        initialSort={{ id: 'hub', desc: false }}
        csvName="hubs"
        empty={{ icon: Warehouse, title: t('empty'), description: t('emptyBody') }}
      />
      <Dialog open={editing !== null} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
          {editing !== null ? (
            <HubForm
              key={editing === 'new' ? 'new' : editing.id}
              hub={editing === 'new' ? null : editing}
              onClose={() => setEditing(null)}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function HubForm({ hub, onClose }: { hub: Hub | null; onClose: () => void }) {
  const t = useTranslations('logistics.hubs');
  const tc = useTranslations('common');
  const save = useSaveHub();
  const partners = usePartners();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<HubInput, unknown, HubDto>({
    resolver: zodResolver(HubInputSchema),
    defaultValues: {
      code: hub?.code ?? '',
      name: hub?.name ?? '',
      operator: hub?.operator ?? 'GARMENT_GATE',
      partnerId: hub?.partner?.id ?? '',
      country: hub?.country ?? '',
      city: hub?.city ?? '',
      addressLine1: hub?.addressLine1 ?? '',
      addressLine2: hub?.addressLine2 ?? '',
      postalCode: hub?.postalCode ?? '',
      port: hub?.port ?? '',
      active: hub?.active ?? true,
    },
  });
  const { errors, isSubmitting } = form.formState;
  const operator = useWatch({ control: form.control, name: 'operator' });
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await save.mutateAsync({ id: hub?.id ?? null, dto });
      toast.success(t('saved'));
      onClose();
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, ['code'], tc('networkError')));
    }
  });
  const text = (
    name: 'code' | 'name' | 'city' | 'addressLine1' | 'addressLine2' | 'postalCode' | 'port',
    mono = false,
  ) => (
    <Field data-invalid={!!errors[name]}>
      <FieldLabel htmlFor={`hub-${name}`}>{t(`fields.${name}`)}</FieldLabel>
      <Input
        id={`hub-${name}`}
        className={mono ? 'font-mono uppercase' : undefined}
        {...form.register(name)}
      />
      <FieldError errors={[errors[name]]} />
    </Field>
  );
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <DialogHeader>
        <DialogTitle>{hub ? t('editTitle', { code: hub.code }) : t('newTitle')}</DialogTitle>
        <DialogDescription>{t('dialogDescription')}</DialogDescription>
      </DialogHeader>
      <FormAlert message={formError} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          {text('code', true)}
          {text('name')}
          <Field data-invalid={!!errors.country}>
            <FieldLabel htmlFor="hub-country">{t('fields.country')}</FieldLabel>
            <Controller
              control={form.control}
              name="country"
              render={({ field }) => (
                <CountrySelect
                  id="hub-country"
                  value={field.value || undefined}
                  onChange={field.onChange}
                  placeholder={t('choose')}
                  invalid={!!errors.country}
                />
              )}
            />
            <FieldError errors={[errors.country]} />
          </Field>
          {text('city')}
          {text('addressLine1')}
          {text('addressLine2')}
          {text('postalCode')}
          {text('port', true)}
          <Field>
            <FieldLabel htmlFor="hub-operator">{t('fields.operator')}</FieldLabel>
            <Controller
              control={form.control}
              name="operator"
              render={({ field }) => (
                <OptionSelect
                  id="hub-operator"
                  value={field.value}
                  onChange={(v) => field.onChange(v === 'PARTNER' ? 'PARTNER' : 'GARMENT_GATE')}
                  options={[
                    { value: 'GARMENT_GATE', label: t('garmentGate') },
                    { value: 'PARTNER', label: t('partner') },
                  ]}
                />
              )}
            />
          </Field>
          {operator === 'PARTNER' ? (
            <Field data-invalid={!!errors.partnerId}>
              <FieldLabel htmlFor="hub-partner">{t('fields.partner')}</FieldLabel>
              <Controller
                control={form.control}
                name="partnerId"
                render={({ field }) => (
                  <OptionSelect
                    id="hub-partner"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    placeholder={t('choose')}
                    options={(partners.data ?? []).map((p) => ({
                      value: p.id,
                      label: `${p.code} · ${p.name}`,
                    }))}
                    invalid={!!errors.partnerId}
                  />
                )}
              />
              <FieldError errors={[errors.partnerId]} />
            </Field>
          ) : null}
        </div>
        <Controller
          control={form.control}
          name="active"
          render={({ field }) => (
            <ActiveCheckbox
              id="hub-active"
              label={t('fields.active')}
              checked={field.value ?? true}
              onChange={field.onChange}
            />
          )}
        />
      </FieldGroup>
      <Footer onClose={onClose} pending={isSubmitting} save={t('save')} />
    </form>
  );
}

// ── Shared bits ─────────────────────────────────────────────────────────────

export function Toolbar({
  description,
  add,
  onAdd,
}: {
  description: string;
  add: string;
  onAdd: () => void;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <p className="text-muted-foreground max-w-2xl text-sm">{description}</p>
      <Button onClick={onAdd}>
        <Plus />
        {add}
      </Button>
    </div>
  );
}

export function Footer({
  onClose,
  pending,
  save,
}: {
  onClose: () => void;
  pending: boolean;
  save: string;
}) {
  const tc = useTranslations('common');
  return (
    <DialogFooter>
      <Button type="button" variant="outline" onClick={onClose}>
        {tc('cancel')}
      </Button>
      <Button type="submit" disabled={pending}>
        {pending ? tc('saving') : save}
      </Button>
    </DialogFooter>
  );
}

/** The "active" switch on every logistics record. */
export function ActiveCheckbox({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <Field orientation="horizontal">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <FieldLabel htmlFor={id} className="font-normal">
        {label}
      </FieldLabel>
    </Field>
  );
}

/** People at a partner who use the partner portal; inviting sends them a set-password email. */
function PartnerUsersDialog({
  partner,
  onClose,
}: {
  partner: LogisticsPartner | null;
  onClose: () => void;
}) {
  const t = useTranslations('logistics.partners');
  const users = usePartnerUsers(partner?.id ?? null);
  const invite = useInvitePartnerUser(partner?.id ?? '');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const submit = async () => {
    setError(null);
    try {
      await invite.mutateAsync({ email, firstName, lastName });
      toast.success(t('invited'));
      setEmail('');
      setFirstName('');
      setLastName('');
    } catch (e) {
      setError(e instanceof Error ? e.message : t('failed'));
    }
  };
  return (
    <Dialog open={partner !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('usersTitle', { name: partner?.name ?? '' })}</DialogTitle>
          <DialogDescription>{t('usersBody')}</DialogDescription>
        </DialogHeader>
        <ul className="divide-y rounded-lg border text-sm">
          {(users.data ?? []).length === 0 ? (
            <li className="text-muted-foreground p-3">{t('noUsers')}</li>
          ) : (
            (users.data ?? []).map((u) => (
              <li key={u.id} className="flex justify-between gap-3 p-3">
                <span>
                  {u.name}
                  <span className="text-muted-foreground block text-xs">{u.email}</span>
                </span>
                <Badge variant={u.status === 'ACTIVE' ? 'success' : 'neutral'}>
                  {u.status.toLowerCase()}
                </Badge>
              </li>
            ))
          )}
        </ul>
        <FormAlert message={error} />
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="pu-email">{t('fields.email')}</FieldLabel>
            <Input
              id="pu-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="pu-first">{t('firstName')}</FieldLabel>
              <Input
                id="pu-first"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="pu-last">{t('lastName')}</FieldLabel>
              <Input id="pu-last" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Field>
          </div>
        </FieldGroup>
        <DialogFooter>
          <Button type="button" disabled={invite.isPending || !email} onClick={() => void submit()}>
            {t('invite')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
