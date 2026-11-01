'use client';

import {
  IncotermSchema,
  RFQ_FILE_MAX_BYTES,
  RFQ_FILE_TYPES,
  RFQ_MAX_FILES,
  type RfqDto,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  ImageIcon,
  Send,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FileDropzone } from '@/components/patterns/file-dropzone';
import { PageHeader } from '@/components/patterns/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { useMe } from '@/features/auth/api';
import { useCategories } from '@/features/onboarding/api';
import { CountrySelect } from '@/features/onboarding/components/pickers';
import { StepProgress } from '@/features/onboarding/components/step-progress';
import { countryName } from '@/lib/countries';
import { applyServerErrors } from '@/lib/form-errors';
import { formatBytes, formatMoney, toMinor } from '@/lib/format';
import { uploadRfqFile, useCreateRfq } from '../api';
import { RFQ_STEPS, RfqFormSchema, type RfqFormValues } from '../forms';

const KINDS = ['TECH_PACK', 'REFERENCE_IMAGE', 'SIZE_CHART', 'OTHER'] as const;
const CURRENCIES = ['USD', 'EUR', 'GBP'] as const;
const FIELDS = [...RFQ_STEPS[0], ...RFQ_STEPS[1], 'attachments'] as const;

/** What → how many and when → review. Files upload as soon as they're dropped. */
export function RfqWizard() {
  const t = useTranslations('rfq.wizard');
  const tc = useTranslations('common');
  const router = useRouter();
  const me = useMe();
  const create = useCreateRfq();
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [uploading, setUploading] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<RfqFormValues, unknown, RfqDto>({
    resolver: zodResolver(RfqFormSchema),
    defaultValues: {
      categoryId: '',
      title: '',
      description: '',
      attachments: [],
      quantity: '',
      targetPrice: '',
      currency: 'USD',
      deadline: '',
      requiredDeliveryDate: '',
      destinationCountry: '',
      incoterm: 'FOB',
    },
  });
  const files = useFieldArray({ control: form.control, name: 'attachments', keyName: 'key' });
  const { errors, isSubmitting } = form.formState;

  // Ship to the buyer's own country unless they say otherwise (BYR-US-0012 → US).
  const homeCountry = me.data?.company?.publicCode?.split('-')[1];
  useEffect(() => {
    if (homeCountry && form.getValues('destinationCountry') === '') {
      form.setValue('destinationCountry', homeCountry);
    }
  }, [form, homeCountry]);

  const steps = [
    { label: t('steps.what') },
    { label: t('steps.when') },
    { label: t('steps.review') },
  ];

  const next = async () => {
    const fields = RFQ_STEPS[step] ?? [];
    if (fields.length > 0 && !(await form.trigger([...fields]))) return;
    const to = step + 1;
    setStep(to);
    setReached((r) => Math.max(r, to));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addFile = (file: File) => {
    if (files.fields.length >= RFQ_MAX_FILES) return;
    setUploading(0);
    uploadRfqFile(file, setUploading)
      .then((fileId) =>
        files.append({
          fileId,
          name: file.name,
          sizeBytes: file.size,
          kind: file.type === 'application/pdf' ? 'TECH_PACK' : 'REFERENCE_IMAGE',
        }),
      )
      .catch(() => toast.error(t('uploadFailed')))
      .finally(() => setUploading(null));
  };

  const onSubmit = form.handleSubmit(
    async (dto) => {
      setFormError(null);
      try {
        const { code } = await create.mutateAsync(dto);
        toast.success(t('published', { code }));
        router.push(`/buyer/rfqs/${code}`);
      } catch (error) {
        setFormError(applyServerErrors(error, form.setError, FIELDS, tc('networkError')));
      }
    },
    () => setFormError(t('fixErrors')),
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <StepProgress steps={steps} current={step} reached={reached} onSelect={setStep} />
      <form onSubmit={(e) => void onSubmit(e)} noValidate>
        <Card>
          <CardContent className="space-y-6 pt-6">
            <FormAlert message={formError} />
            {step === 0 ? (
              <WhatStep form={form} files={files} uploading={uploading} onFile={addFile} />
            ) : step === 1 ? (
              <WhenStep form={form} />
            ) : (
              <ReviewStep values={form.getValues()} onEdit={setStep} />
            )}
          </CardContent>
        </Card>
        <div className="mt-4 flex items-center justify-between gap-3">
          {step > 0 ? (
            <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="rtl:rotate-180" />
              {tc('back')}
            </Button>
          ) : (
            <span />
          )}
          {/* Distinct keys: reusing one <button> would turn the click on "Continue" into a submit. */}
          {step < 2 ? (
            <Button
              key="next"
              type="button"
              onClick={() => void next()}
              disabled={uploading !== null}
            >
              {tc('continue')}
              <ArrowRight className="rtl:rotate-180" />
            </Button>
          ) : (
            <Button key="publish" type="submit" disabled={isSubmitting}>
              <Send />
              {isSubmitting ? t('publishing') : t('publish')}
            </Button>
          )}
        </div>
        {Object.keys(errors).length > 0 && step === 2 ? (
          <p className="text-danger-ink mt-3 text-sm">{t('fixErrors')}</p>
        ) : null}
      </form>
    </div>
  );
}

type Form = ReturnType<typeof useForm<RfqFormValues, unknown, RfqDto>>;

function WhatStep({
  form,
  files,
  uploading,
  onFile,
}: {
  form: Form;
  files: ReturnType<typeof useFieldArray<RfqFormValues, 'attachments', 'key'>>;
  uploading: number | null;
  onFile: (file: File) => void;
}) {
  const t = useTranslations('rfq.wizard');
  const locale = useLocale();
  const categories = useCategories();
  const { errors } = form.formState;
  const parents = new Map((categories.data ?? []).map((c) => [c.id, c.name]));
  const items = (categories.data ?? [])
    .filter((c) => c.parentId !== null)
    .map((c) => ({ value: c.id, label: `${parents.get(c.parentId ?? '') ?? ''} › ${c.name}` }));

  return (
    <FieldGroup>
      <Field data-invalid={!!errors.categoryId}>
        <FieldLabel htmlFor="rfq-category">{t('category')}</FieldLabel>
        <Controller
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <Select
              items={items}
              value={field.value || null}
              onValueChange={(v) => field.onChange(typeof v === 'string' ? v : '')}
            >
              <SelectTrigger
                id="rfq-category"
                className="w-full"
                aria-invalid={!!errors.categoryId}
              >
                <SelectValue placeholder={t('categoryPlaceholder')} />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.categoryId]} />
      </Field>
      <Field data-invalid={!!errors.title}>
        <FieldLabel htmlFor="rfq-title">{t('rfqTitle')}</FieldLabel>
        <Input
          id="rfq-title"
          placeholder={t('titlePlaceholder')}
          aria-invalid={!!errors.title}
          {...form.register('title')}
        />
        <FieldError errors={[errors.title]} />
      </Field>
      <Field data-invalid={!!errors.description}>
        <FieldLabel htmlFor="rfq-description">{t('descriptionLabel')}</FieldLabel>
        <Textarea
          id="rfq-description"
          rows={6}
          placeholder={t('descriptionPlaceholder')}
          aria-invalid={!!errors.description}
          {...form.register('description')}
        />
        <FieldDescription>{t('descriptionHint')}</FieldDescription>
        <FieldError errors={[errors.description]} />
      </Field>
      <Field>
        <FieldLabel>{t('files')}</FieldLabel>
        {files.fields.length > 0 ? (
          <ul className="divide-y rounded-lg border">
            {files.fields.map((f, i) => (
              <li key={f.key} className="flex flex-wrap items-center gap-3 p-3">
                {f.name.toLowerCase().endsWith('.pdf') ? (
                  <FileText className="text-muted-foreground size-5 shrink-0" aria-hidden="true" />
                ) : (
                  <ImageIcon className="text-muted-foreground size-5 shrink-0" aria-hidden="true" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{f.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {formatBytes(f.sizeBytes, locale)}
                  </p>
                </div>
                <Controller
                  control={form.control}
                  name={`attachments.${i}.kind`}
                  render={({ field }) => (
                    <Select
                      items={KINDS.map((k) => ({ value: k, label: t(`kinds.${k}`) }))}
                      value={field.value}
                      onValueChange={(v) => {
                        const kind = KINDS.find((k) => k === v);
                        if (kind) field.onChange(kind);
                      }}
                    >
                      <SelectTrigger className="w-40" aria-label={t('fileKind', { name: f.name })}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {KINDS.map((k) => (
                          <SelectItem key={k} value={k}>
                            {t(`kinds.${k}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={t('removeFile', { name: f.name })}
                  onClick={() => files.remove(i)}
                >
                  <Trash2 />
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
        {files.fields.length < RFQ_MAX_FILES ? (
          <FileDropzone
            multiple
            compact={files.fields.length > 0}
            accept={RFQ_FILE_TYPES}
            maxBytes={RFQ_FILE_MAX_BYTES}
            progress={uploading}
            label={t('filesCta')}
            hint={t('filesHint', { max: RFQ_MAX_FILES })}
            onFile={onFile}
          />
        ) : null}
        <p className="text-muted-foreground flex gap-2 text-xs leading-relaxed">
          <ShieldCheck className="text-primary-ink size-4 shrink-0" aria-hidden="true" />
          {t('filesPrivacy')}
        </p>
      </Field>
    </FieldGroup>
  );
}

function WhenStep({ form }: { form: Form }) {
  const t = useTranslations('rfq.wizard');
  const tc = useTranslations('common');
  const { errors } = form.formState;
  const incoterms = IncotermSchema.options;
  return (
    <FieldGroup>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field data-invalid={!!errors.quantity}>
          <FieldLabel htmlFor="rfq-qty">{t('quantity')}</FieldLabel>
          <Input
            id="rfq-qty"
            inputMode="numeric"
            aria-invalid={!!errors.quantity}
            {...form.register('quantity')}
          />
          <FieldError errors={[errors.quantity]} />
        </Field>
        <div className="grid grid-cols-[minmax(0,1fr)_6.5rem] gap-2">
          <Field data-invalid={!!errors.targetPrice}>
            <FieldLabel htmlFor="rfq-price">{t('targetPrice')}</FieldLabel>
            <Input
              id="rfq-price"
              inputMode="decimal"
              placeholder={tc('optional')}
              aria-invalid={!!errors.targetPrice}
              {...form.register('targetPrice')}
            />
            <FieldError errors={[errors.targetPrice]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="rfq-currency">{t('currency')}</FieldLabel>
            <Controller
              control={form.control}
              name="currency"
              render={({ field }) => (
                <Select
                  items={CURRENCIES.map((c) => ({ value: c, label: c }))}
                  value={field.value}
                  onValueChange={(v) => {
                    const c = CURRENCIES.find((x) => x === v);
                    if (c) field.onChange(c);
                  }}
                >
                  <SelectTrigger id="rfq-currency" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </div>
        <Field data-invalid={!!errors.deadline}>
          <FieldLabel htmlFor="rfq-deadline">{t('deadline')}</FieldLabel>
          <Input
            id="rfq-deadline"
            type="date"
            aria-invalid={!!errors.deadline}
            {...form.register('deadline')}
          />
          <FieldDescription>{t('deadlineHint')}</FieldDescription>
          <FieldError errors={[errors.deadline]} />
        </Field>
        <Field data-invalid={!!errors.requiredDeliveryDate}>
          <FieldLabel htmlFor="rfq-delivery">{t('delivery')}</FieldLabel>
          <Input
            id="rfq-delivery"
            type="date"
            aria-invalid={!!errors.requiredDeliveryDate}
            {...form.register('requiredDeliveryDate')}
          />
          <FieldDescription>{t('deliveryHint')}</FieldDescription>
          <FieldError errors={[errors.requiredDeliveryDate]} />
        </Field>
        <Field data-invalid={!!errors.destinationCountry}>
          <FieldLabel htmlFor="rfq-country">{t('destination')}</FieldLabel>
          <Controller
            control={form.control}
            name="destinationCountry"
            render={({ field }) => (
              <CountrySelect
                id="rfq-country"
                value={field.value || undefined}
                onChange={field.onChange}
                placeholder={t('destinationPlaceholder')}
                invalid={!!errors.destinationCountry}
              />
            )}
          />
          <FieldError errors={[errors.destinationCountry]} />
        </Field>
        <Field data-invalid={!!errors.incoterm}>
          <FieldLabel htmlFor="rfq-incoterm">{t('incoterm')}</FieldLabel>
          <Controller
            control={form.control}
            name="incoterm"
            render={({ field }) => (
              <Select
                items={incoterms.map((i) => ({ value: i, label: `${i} · ${t(`incoterms.${i}`)}` }))}
                value={field.value || null}
                onValueChange={(v) => field.onChange(typeof v === 'string' ? v : '')}
              >
                <SelectTrigger
                  id="rfq-incoterm"
                  className="w-full"
                  aria-invalid={!!errors.incoterm}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {incoterms.map((i) => (
                    <SelectItem key={i} value={i}>
                      {i} · {t(`incoterms.${i}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.incoterm]} />
        </Field>
      </div>
    </FieldGroup>
  );
}

function ReviewStep({ values, onEdit }: { values: RfqFormValues; onEdit: (step: number) => void }) {
  const t = useTranslations('rfq.wizard');
  const locale = useLocale();
  const categories = useCategories();
  const category = categories.data?.find((c) => c.id === values.categoryId)?.name ?? '—';
  const date = (v: string) =>
    v
      ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(
          new Date(`${v}T00:00:00Z`),
        )
      : '—';
  const qty = Number(values.quantity);
  const target = values.targetPrice ? toMinor(values.targetPrice, values.currency) : Number.NaN;

  const sections = [
    {
      step: 0,
      title: t('steps.what'),
      rows: [
        [t('category'), category],
        [t('rfqTitle'), values.title],
        [t('descriptionLabel'), values.description],
        [
          t('files'),
          values.attachments.length > 0 ? values.attachments.map((a) => a.name).join(', ') : '—',
        ],
      ],
    },
    {
      step: 1,
      title: t('steps.when'),
      rows: [
        [t('quantity'), Number.isFinite(qty) ? qty.toLocaleString(locale) : values.quantity],
        [
          t('targetPrice'),
          Number.isNaN(target) ? '—' : formatMoney(target, values.currency, locale),
        ],
        [t('deadline'), date(values.deadline)],
        [t('delivery'), date(values.requiredDeliveryDate)],
        [
          t('destination'),
          values.destinationCountry ? countryName(values.destinationCountry, locale) : '—',
        ],
        [t('incoterm'), values.incoterm],
      ],
    },
  ];
  return (
    <div className="space-y-6">
      {sections.map((s) => (
        <section key={s.step} className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{s.title}</h2>
            <Button type="button" variant="link" size="sm" onClick={() => onEdit(s.step)}>
              {t('edit')}
            </Button>
          </div>
          <dl className="divide-y rounded-lg border">
            {s.rows.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 px-3 py-2.5 text-sm sm:grid-cols-[10rem_minmax(0,1fr)]"
              >
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="break-words whitespace-pre-line">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
      <p className="text-muted-foreground bg-surface rounded-lg border p-3 text-sm">
        {t('reviewNote')}
      </p>
    </div>
  );
}
