'use client';

import {
  IMAGE_CONTENT_TYPES,
  ORDER_IMAGE_MAX_BYTES,
  type OrderSample,
  type OrderStatus,
  type OrderTransitionDto,
  OrderTransitionSchema,
  type ReorderOrderDto,
  type ReorderOrderInput,
  ReorderOrderSchema,
  type RequestSampleDto,
  type RequestSampleInput,
  RequestSampleSchema,
  type SampleDecisionDto,
  type SampleDecisionInput,
  SampleDecisionSchema,
  type ShipSampleDto,
  ShipSampleSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ImagePlus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { FileDropzone } from '@/components/patterns/file-dropzone';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { applyServerErrors } from '@/lib/form-errors';
import { cn } from '@/lib/utils';
import {
  uploadOrderMedia,
  useDecideSample,
  useReorder,
  useRequestSample,
  useShipSample,
  useTransition,
} from '../api';

function Shell({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : (
            <DialogDescription className="sr-only">{title}</DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export function RequestSampleDialog({
  code,
  open,
  onClose,
}: {
  code: string;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('orders.dialogs');
  const tc = useTranslations('common');
  const request = useRequestSample(code);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<RequestSampleInput, unknown, RequestSampleDto>({
    resolver: zodResolver(RequestSampleSchema),
    defaultValues: { quantity: 2, notes: '' },
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <Shell
      open={open}
      onClose={onClose}
      title={t('requestSample')}
      description={t('requestSampleBody')}
    >
      <form
        className="grid gap-5"
        noValidate
        onSubmit={(e) =>
          void form.handleSubmit(async (dto) => {
            try {
              await request.mutateAsync(dto);
              toast.success(t('sampleRequested'));
              onClose();
            } catch (err) {
              setError(
                applyServerErrors(err, form.setError, ['quantity', 'notes'], tc('networkError')),
              );
            }
          })(e)
        }
      >
        <FormAlert message={error} />
        <FieldGroup>
          <Field data-invalid={!!errors.quantity}>
            <FieldLabel htmlFor="s-qty">{t('sampleQuantity')}</FieldLabel>
            <Input id="s-qty" inputMode="numeric" {...form.register('quantity')} />
            <FieldError errors={[errors.quantity]} />
          </Field>
          <Field data-invalid={!!errors.notes}>
            <FieldLabel htmlFor="s-notes">{t('sampleNotes')}</FieldLabel>
            <Textarea
              id="s-notes"
              rows={3}
              placeholder={t('sampleNotesPlaceholder')}
              {...form.register('notes')}
            />
            <FieldError errors={[errors.notes]} />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {t('requestSample')}
          </Button>
        </DialogFooter>
      </form>
    </Shell>
  );
}

export function SampleDecisionDialog({
  code,
  sample,
  open,
  onClose,
}: {
  code: string;
  sample: OrderSample | null;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('orders.dialogs');
  const tc = useTranslations('common');
  const decide = useDecideSample(code);
  const [error, setError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<
    { key: string; name: string; fileId: string | null; progress: number }[]
  >([]);
  const form = useForm<SampleDecisionInput, unknown, SampleDecisionDto>({
    resolver: zodResolver(SampleDecisionSchema),
    defaultValues: { decision: 'APPROVE', comments: '', photoFileIds: [] },
  });
  const { errors, isSubmitting } = form.formState;
  const decision = useWatch({ control: form.control, name: 'decision' });
  const uploading = photos.some((p) => p.fileId === null);

  const addPhoto = (file: File) => {
    const key = `${file.name}-${String(Date.now())}`;
    setPhotos((p) => [...p, { key, name: file.name, fileId: null, progress: 0 }]);
    uploadOrderMedia(code, file, (progress) =>
      setPhotos((p) => p.map((x) => (x.key === key ? { ...x, progress } : x))),
    )
      .then((fileId) => setPhotos((p) => p.map((x) => (x.key === key ? { ...x, fileId } : x))))
      .catch(() => {
        toast.error(t('uploadFailed'));
        setPhotos((p) => p.filter((x) => x.key !== key));
      });
  };

  return (
    <Shell
      open={open}
      onClose={onClose}
      title={t('reviewSample', { round: sample?.round ?? 1 })}
      description={t('reviewSampleBody')}
    >
      <form
        className="grid gap-5"
        noValidate
        onSubmit={(e) =>
          void form.handleSubmit(async (dto) => {
            if (!sample) return;
            try {
              await decide.mutateAsync({
                id: sample.id,
                dto: {
                  ...dto,
                  photoFileIds:
                    dto.decision === 'CHANGES'
                      ? photos.flatMap((p) => (p.fileId ? [p.fileId] : []))
                      : [],
                },
              });
              toast.success(dto.decision === 'APPROVE' ? t('sampleApproved') : t('changesSent'));
              setPhotos([]);
              onClose();
            } catch (err) {
              setError(applyServerErrors(err, form.setError, ['comments'], tc('networkError')));
            }
          })(e)
        }
      >
        <FormAlert message={error} />
        <Controller
          control={form.control}
          name="decision"
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid gap-2 sm:grid-cols-2"
            >
              {(['APPROVE', 'CHANGES'] as const).map((v) => (
                <label
                  key={v}
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm',
                    field.value === v && 'border-primary bg-primary-soft/40',
                  )}
                >
                  <RadioGroupItem value={v} className="mt-0.5" />
                  <span>
                    <span className="font-medium">{t(`decision.${v}`)}</span>
                    <span className="text-muted-foreground block text-xs">
                      {t(`decision.${v}Body`)}
                    </span>
                  </span>
                </label>
              ))}
            </RadioGroup>
          )}
        />
        <Field data-invalid={!!errors.comments}>
          <FieldLabel htmlFor="d-comments">
            {decision === 'CHANGES' ? t('whatToChange') : t('comments')}
          </FieldLabel>
          <Textarea
            id="d-comments"
            rows={4}
            placeholder={decision === 'CHANGES' ? t('changesPlaceholder') : ''}
            {...form.register('comments')}
          />
          <FieldError errors={[errors.comments]} />
        </Field>
        {decision === 'CHANGES' ? (
          <Field>
            <FieldLabel>{t('photos')}</FieldLabel>
            {photos.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {photos.map((p) => (
                  <li
                    key={p.key}
                    className="bg-surface flex items-center gap-2 rounded-lg border px-2 py-1 text-xs"
                  >
                    <ImagePlus className="size-3.5" aria-hidden="true" />
                    <span className="max-w-36 truncate">{p.name}</span>
                    <span className="text-muted-foreground tabular">
                      {p.fileId ? <Check className="size-3.5" /> : `${String(p.progress)}%`}
                    </span>
                    <button
                      type="button"
                      aria-label={t('removePhoto', { name: p.name })}
                      onClick={() => setPhotos((x) => x.filter((y) => y.key !== p.key))}
                    >
                      <X className="size-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            {photos.length < 8 ? (
              <FileDropzone
                multiple
                compact
                accept={IMAGE_CONTENT_TYPES}
                maxBytes={ORDER_IMAGE_MAX_BYTES}
                label={t('addPhotos')}
                hint={t('photosHint')}
                onFile={addPhoto}
              />
            ) : null}
            <FieldDescription>{t('photosReview')}</FieldDescription>
          </Field>
        ) : null}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting || uploading}>
            {decision === 'APPROVE' ? t('approveSample') : t('sendChanges')}
          </Button>
        </DialogFooter>
      </form>
    </Shell>
  );
}

export function ShipSampleDialog({
  code,
  sample,
  open,
  onClose,
}: {
  code: string;
  sample: OrderSample | null;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('orders.dialogs');
  const tc = useTranslations('common');
  const ship = useShipSample(code);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<ShipSampleDto>({
    resolver: zodResolver(ShipSampleSchema),
    defaultValues: { courier: '', trackingNumber: '' },
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <Shell
      open={open}
      onClose={onClose}
      title={t('shipSample', { round: sample?.round ?? 1 })}
      description={t('shipSampleBody')}
    >
      <form
        className="grid gap-5"
        noValidate
        onSubmit={(e) =>
          void form.handleSubmit(async (dto) => {
            if (!sample) return;
            try {
              await ship.mutateAsync({ id: sample.id, dto });
              toast.success(t('sampleShipped'));
              onClose();
            } catch (err) {
              setError(
                applyServerErrors(
                  err,
                  form.setError,
                  ['courier', 'trackingNumber'],
                  tc('networkError'),
                ),
              );
            }
          })(e)
        }
      >
        <FormAlert message={error} />
        <FieldGroup>
          <Field data-invalid={!!errors.courier}>
            <FieldLabel htmlFor="ss-courier">{t('courier')}</FieldLabel>
            <Input id="ss-courier" placeholder="DHL Express" {...form.register('courier')} />
            <FieldError errors={[errors.courier]} />
          </Field>
          <Field data-invalid={!!errors.trackingNumber}>
            <FieldLabel htmlFor="ss-tracking">{t('tracking')}</FieldLabel>
            <Input id="ss-tracking" {...form.register('trackingNumber')} />
            <FieldError errors={[errors.trackingNumber]} />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {t('markShipped')}
          </Button>
        </DialogFooter>
      </form>
    </Shell>
  );
}

/** Confirms a status change; asks for a reason when disputing. Shipments are booked first. */
export function TransitionDialog({
  code,
  to,
  copy,
  onClose,
}: {
  code: string;
  to: OrderStatus | null;
  /** Wording for a move that means something else here (the buyer's rework is → IN_PRODUCTION). */
  copy?: 'REWORK';
  onClose: () => void;
}) {
  const t = useTranslations('orders.dialogs');
  const ts = useTranslations('orders.transitions');
  const tc = useTranslations('common');
  const transition = useTransition(code);
  const [error, setError] = useState<string | null>(null);
  const needsNote = to === 'DISPUTED';
  const form = useForm<{ note: string }>({ defaultValues: { note: '' } });
  return (
    <Shell
      open={to !== null}
      onClose={onClose}
      title={to ? ts(`${copy ?? to}.title`) : ''}
      description={to ? ts(`${copy ?? to}.body`) : ''}
    >
      <form
        className="grid gap-5"
        noValidate
        onSubmit={(e) =>
          void form.handleSubmit(async (values) => {
            if (!to) return;
            const parsed = OrderTransitionSchema.safeParse({
              to,
              note: values.note,
            });
            if (!parsed.success) {
              setError(t('checkFields'));
              return;
            }
            if (needsNote && !parsed.data.note) {
              form.setError('note', { message: t('reasonRequired') });
              return;
            }
            try {
              await transition.mutateAsync(parsed.data satisfies OrderTransitionDto);
              toast.success(ts(`${copy ?? to}.done`));
              form.reset();
              onClose();
            } catch (err) {
              setError(applyServerErrors(err, form.setError, ['note'], tc('networkError')));
            }
          })(e)
        }
      >
        <FormAlert message={error} />
        <Field data-invalid={!!form.formState.errors.note}>
          <FieldLabel htmlFor="t-note">{needsNote ? t('reason') : t('note')}</FieldLabel>
          <Textarea id="t-note" rows={3} {...form.register('note')} />
          <FieldError errors={[form.formState.errors.note]} />
        </Field>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          <Button
            type="submit"
            variant={to === 'CANCELLED' || to === 'DISPUTED' ? 'destructive' : 'default'}
            disabled={form.formState.isSubmitting}
          >
            {to ? ts(`${copy ?? to}.action`) : ''}
          </Button>
        </DialogFooter>
      </form>
    </Shell>
  );
}

export function ReorderDialog({
  code,
  quantity,
  open,
  onClose,
}: {
  code: string;
  quantity: number;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('orders.dialogs');
  const tc = useTranslations('common');
  const router = useRouter();
  const reorder = useReorder(code);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<ReorderOrderInput, unknown, ReorderOrderDto>({
    resolver: zodResolver(ReorderOrderSchema),
    defaultValues: { quantity, requestedShipDate: '', notes: '' },
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <Shell
      open={open}
      onClose={onClose}
      title={t('reorder')}
      description={t('reorderBody', { code })}
    >
      <form
        className="grid gap-5"
        noValidate
        onSubmit={(e) =>
          void form.handleSubmit(async (dto) => {
            try {
              const created = await reorder.mutateAsync(dto);
              toast.success(t('reordered', { code: created.code }));
              onClose();
              router.push(`/buyer/orders/${created.code}`);
            } catch (err) {
              setError(
                applyServerErrors(
                  err,
                  form.setError,
                  ['quantity', 'requestedShipDate', 'notes'],
                  tc('networkError'),
                ),
              );
            }
          })(e)
        }
      >
        <FormAlert message={error} />
        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field data-invalid={!!errors.quantity}>
              <FieldLabel htmlFor="r-qty">{t('quantity')}</FieldLabel>
              <Input id="r-qty" inputMode="numeric" {...form.register('quantity')} />
              <FieldError errors={[errors.quantity]} />
            </Field>
            <Field data-invalid={!!errors.requestedShipDate}>
              <FieldLabel htmlFor="r-date">{t('shipBy')}</FieldLabel>
              <Input id="r-date" type="date" {...form.register('requestedShipDate')} />
              <FieldError errors={[errors.requestedShipDate]} />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="r-notes">{t('changes')}</FieldLabel>
            <Textarea
              id="r-notes"
              rows={3}
              placeholder={t('changesHint')}
              {...form.register('notes')}
            />
          </Field>
        </FieldGroup>
        <p className="text-muted-foreground bg-surface rounded-lg border p-3 text-xs">
          {t('reorderNote')}
        </p>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {t('createReorder')}
          </Button>
        </DialogFooter>
      </form>
    </Shell>
  );
}
