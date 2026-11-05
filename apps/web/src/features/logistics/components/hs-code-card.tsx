'use client';

import { HsCodeSchema } from '@garmentgate/shared';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ApiError } from '@/lib/api';
import { useSetHsCode } from '../order-api';

/** Staff set the order's HS code when confirming terms: documents and duty estimates use it. */
export function HsCodeCard({ code, hsCode }: { code: string; hsCode: string | null }) {
  const t = useTranslations('logistics.hsCode');
  const save = useSetHsCode(code);
  const [value, setValue] = useState(hsCode ?? '');
  const [error, setError] = useState<string | null>(null);
  const submit = async () => {
    const parsed = HsCodeSchema.safeParse(value);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? null);
      return;
    }
    try {
      await save.mutateAsync(parsed.data);
      toast.success(t('saved'));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : t('failed'));
    }
  };
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex items-end gap-2"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <Field data-invalid={!!error} className="flex-1">
            <FieldLabel htmlFor="hs-code" className="sr-only">
              {t('title')}
            </FieldLabel>
            <Input
              id="hs-code"
              inputMode="numeric"
              className="font-mono"
              placeholder="6109.10"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(null);
              }}
            />
            <FieldError>{error}</FieldError>
          </Field>
          <Button type="submit" variant="outline" disabled={save.isPending}>
            {t('save')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
