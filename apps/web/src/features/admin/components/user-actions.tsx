'use client';

import {
  type SuspendUserDto,
  SuspendUserSchema,
  type WarnUserDto,
  type WarnUserInput,
  WarnUserSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ban, RotateCcw, TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { applyServerErrors } from '@/lib/form-errors';
import { cn } from '@/lib/utils';
import { useReactivateUser, useSuspendUser, useWarnUser } from '../api';

export interface ActionTarget {
  id: string;
  name: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED';
}

/** Warn / suspend / reactivate buttons for one account, with their dialogs. */
export function UserActions({ user, size = 'sm' }: { user: ActionTarget; size?: 'sm' | 'xs' }) {
  const t = useTranslations('adminPanel.users.actions');
  const [dialog, setDialog] = useState<'warn' | 'suspend' | null>(null);
  const reactivate = useReactivateUser();
  return (
    <div className="flex flex-wrap justify-end gap-1.5">
      {user.status === 'ACTIVE' ? (
        <>
          <Button variant="outline" size={size} onClick={() => setDialog('warn')}>
            <TriangleAlert />
            {t('warn')}
          </Button>
          <Button
            variant="outline"
            size={size}
            className="text-danger-ink"
            onClick={() => setDialog('suspend')}
          >
            <Ban />
            {t('suspend')}
          </Button>
        </>
      ) : (
        <Button
          variant="outline"
          size={size}
          disabled={reactivate.isPending}
          onClick={() =>
            reactivate.mutate(user.id, {
              onSuccess: () => toast.success(t('reactivated', { name: user.name })),
              onError: () => toast.error(t('failed')),
            })
          }
        >
          <RotateCcw />
          {t('reactivate')}
        </Button>
      )}
      <WarnDialog user={user} open={dialog === 'warn'} onClose={() => setDialog(null)} />
      <SuspendDialog user={user} open={dialog === 'suspend'} onClose={() => setDialog(null)} />
    </div>
  );
}

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
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

function WarnDialog({
  user,
  open,
  onClose,
}: {
  user: ActionTarget;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('adminPanel.users.warn');
  const tc = useTranslations('common');
  const warn = useWarnUser();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<WarnUserInput, unknown, WarnUserDto>({
    resolver: zodResolver(WarnUserSchema),
    defaultValues: { note: '', level: 'WARNING' },
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <Shell
      open={open}
      onClose={onClose}
      title={t('title', { name: user.name })}
      description={t('body')}
    >
      <form
        className="grid gap-5"
        noValidate
        onSubmit={(e) =>
          void form.handleSubmit(async (dto) => {
            try {
              await warn.mutateAsync({ id: user.id, dto });
              toast.success(t('done'));
              form.reset();
              onClose();
            } catch (err) {
              setError(applyServerErrors(err, form.setError, ['note'], tc('networkError')));
            }
          })(e)
        }
      >
        <FormAlert message={error} />
        <FieldGroup>
          <Controller
            control={form.control}
            name="level"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="grid gap-2 sm:grid-cols-2"
                aria-label={t('level')}
              >
                {(['WARNING', 'FINAL_WARNING'] as const).map((level) => (
                  <label
                    key={level}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm',
                      field.value === level && 'border-primary bg-primary-soft/40',
                    )}
                  >
                    <RadioGroupItem value={level} />
                    {t(`levels.${level}`)}
                  </label>
                ))}
              </RadioGroup>
            )}
          />
          <Field data-invalid={!!errors.note}>
            <FieldLabel htmlFor={`warn-${user.id}`}>{t('note')}</FieldLabel>
            <Textarea
              id={`warn-${user.id}`}
              rows={3}
              placeholder={t('placeholder')}
              {...form.register('note')}
            />
            <FieldError errors={[errors.note]} />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {t('action')}
          </Button>
        </DialogFooter>
      </form>
    </Shell>
  );
}

function SuspendDialog({
  user,
  open,
  onClose,
}: {
  user: ActionTarget;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('adminPanel.users.suspend');
  const tc = useTranslations('common');
  const suspend = useSuspendUser();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<SuspendUserDto>({
    resolver: zodResolver(SuspendUserSchema),
    defaultValues: { reason: '' },
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <Shell
      open={open}
      onClose={onClose}
      title={t('title', { name: user.name })}
      description={t('body')}
    >
      <form
        className="grid gap-5"
        noValidate
        onSubmit={(e) =>
          void form.handleSubmit(async (dto) => {
            try {
              await suspend.mutateAsync({ id: user.id, dto });
              toast.success(t('done', { name: user.name }));
              form.reset();
              onClose();
            } catch (err) {
              setError(applyServerErrors(err, form.setError, ['reason'], tc('networkError')));
            }
          })(e)
        }
      >
        <FormAlert message={error} />
        <Field data-invalid={!!errors.reason}>
          <FieldLabel htmlFor={`suspend-${user.id}`}>{t('reason')}</FieldLabel>
          <Textarea id={`suspend-${user.id}`} rows={3} {...form.register('reason')} />
          <FieldError errors={[errors.reason]} />
        </Field>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          <Button type="submit" variant="destructive" disabled={isSubmitting}>
            {t('action')}
          </Button>
        </DialogFooter>
      </form>
    </Shell>
  );
}
