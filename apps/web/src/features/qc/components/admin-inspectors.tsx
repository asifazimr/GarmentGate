'use client';

import { type CreateInspectorDto, CreateInspectorSchema } from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardCheck, UserPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { Badge } from '@/components/ui/badge';
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
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { FormAlert } from '@/features/auth/components/form-alert';
import { applyServerErrors } from '@/lib/form-errors';
import { useCreateInspector, useInspectors } from '../api';

/** GarmentGate's inspectors: who they are and how many open inspections each has. */
export function AdminInspectors() {
  const t = useTranslations('qc.inspectors');
  const inspectors = useInspectors();
  const [adding, setAdding] = useState(false);
  const add = (
    <Button onClick={() => setAdding(true)}>
      <UserPlus />
      {t('add')}
    </Button>
  );
  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} actions={add} />
      {inspectors.isPending ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : inspectors.isError ? (
        <ErrorState onRetry={() => void inspectors.refetch()} retrying={inspectors.isFetching} />
      ) : inspectors.data.length === 0 ? (
        <EmptyState
          icon={ClipboardCheck}
          title={t('empty')}
          description={t('emptyBody')}
          action={add}
        />
      ) : (
        <ul className="bg-card divide-y overflow-hidden rounded-xl border shadow-xs">
          {inspectors.data.map((i) => (
            <li key={i.id} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-5">
              <div className="min-w-0 flex-1">
                <p className="font-medium">{i.name}</p>
                <p className="text-muted-foreground truncate text-sm">{i.email}</p>
              </div>
              <Badge variant={i.active ? 'success' : 'neutral'}>
                {i.active ? t('active') : t('inactive')}
              </Badge>
              <span className="text-muted-foreground tabular text-sm">
                {t('open', { count: i.openInspections })}
              </span>
            </li>
          ))}
        </ul>
      )}
      <AddInspectorDialog open={adding} onClose={() => setAdding(false)} />
    </div>
  );
}

function AddInspectorDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('qc.inspectors');
  const tc = useTranslations('common');
  const create = useCreateInspector();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<CreateInspectorDto>({
    resolver: zodResolver(CreateInspectorSchema),
    defaultValues: { email: '', firstName: '', lastName: '' },
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('addTitle')}</DialogTitle>
          <DialogDescription>{t('addBody')}</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-5"
          noValidate
          onSubmit={(e) =>
            void form.handleSubmit(async (dto) => {
              try {
                await create.mutateAsync(dto);
                toast.success(t('added', { email: dto.email }));
                form.reset();
                onClose();
              } catch (err) {
                setError(
                  applyServerErrors(
                    err,
                    form.setError,
                    ['email', 'firstName', 'lastName'],
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
              <Field data-invalid={!!errors.firstName}>
                <FieldLabel htmlFor="ins-first">{t('firstName')}</FieldLabel>
                <Input id="ins-first" autoComplete="off" {...form.register('firstName')} />
                <FieldError errors={[errors.firstName]} />
              </Field>
              <Field data-invalid={!!errors.lastName}>
                <FieldLabel htmlFor="ins-last">{t('lastName')}</FieldLabel>
                <Input id="ins-last" autoComplete="off" {...form.register('lastName')} />
                <FieldError errors={[errors.lastName]} />
              </Field>
            </div>
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="ins-email">{t('email')}</FieldLabel>
              <Input id="ins-email" type="email" autoComplete="off" {...form.register('email')} />
              <FieldError errors={[errors.email]} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {tc('cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {t('create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
