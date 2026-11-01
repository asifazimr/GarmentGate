'use client';

import { CurrencySchema, type ManufacturerProduct, type ProductDto } from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { useCategories } from '@/features/onboarding/api';
import { OptionalTag } from '@/features/onboarding/components/step-layout';
import { applyServerErrors } from '@/lib/form-errors';
import { currencyDigits } from '@/lib/format';
import { cn } from '@/lib/utils';
import {
  useAddProductImage,
  useProduct,
  useRemoveProductImage,
  useReorderProductImages,
  useSaveProduct,
} from '../api';
import {
  EMPTY_PRODUCT,
  ProductFormSchema,
  type ProductFormValues,
  toFormValues,
} from '../product-form';
import { ImageManager } from './image-manager';

const MAX_IMAGES = 8;
const FIELDS = [
  'title',
  'categoryId',
  'description',
  'fabric',
  'composition',
  'gsm',
  'moqPcs',
  'leadTimeDays',
  'currency',
  'priceTiers',
  'status',
];

/** Edit an existing product (loads it first). */
export function EditProduct({ id }: { id: string }) {
  const product = useProduct(id);
  if (product.isPending) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-9 w-64" />
        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <Skeleton className="h-[32rem] rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }
  if (product.isError)
    return <ErrorState onRetry={() => void product.refetch()} retrying={product.isFetching} />;
  return <ProductEditor product={product.data} />;
}

export function ProductEditor({ product }: { product?: ManufacturerProduct }) {
  const t = useTranslations('manufacturer.editor');
  const tc = useTranslations('common');
  const router = useRouter();
  const categories = useCategories();
  const save = useSaveProduct(product?.id ?? null);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<ProductFormValues, unknown, ProductDto>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: product ? toFormValues(product) : EMPTY_PRODUCT,
  });
  const tiers = useFieldArray({ control: form.control, name: 'priceTiers' });
  const { errors, isSubmitting, isDirty } = form.formState;
  const currency = useWatch({ control: form.control, name: 'currency' });

  // Leaf categories only (children), grouped under their parent in the label.
  const categoryItems = useMemo(() => {
    const all = categories.data ?? [];
    const parents = new Map(all.filter((c) => c.parentId === null).map((c) => [c.id, c.name]));
    return all
      .filter((c) => c.parentId !== null || !all.some((child) => child.parentId === c.id))
      .map((c) => ({
        value: c.id,
        label: c.parentId ? `${parents.get(c.parentId) ?? ''} · ${c.name}` : c.name,
      }));
  }, [categories.data]);

  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      const saved = await save.mutateAsync(dto);
      form.reset(toFormValues(saved));
      if (product) {
        toast.success(t('saved'));
      } else {
        toast.success(t('created'));
        router.replace(`/manufacturer/products/${saved.id}`);
      }
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, FIELDS, tc('networkError')));
    }
  });

  const text = (
    name: 'title' | 'fabric' | 'composition',
    label: string,
    placeholder?: string,
    optional = false,
  ) => (
    <Field data-invalid={!!errors[name]}>
      <FieldLabel htmlFor={name}>
        {label}
        {optional ? <OptionalTag /> : null}
      </FieldLabel>
      <Input
        id={name}
        placeholder={placeholder}
        aria-invalid={!!errors[name]}
        {...form.register(name)}
      />
      <FieldError errors={[errors[name]]} />
    </Field>
  );
  const number = (name: 'gsm' | 'moqPcs' | 'leadTimeDays', label: string, optional = false) => (
    <Field data-invalid={!!errors[name]}>
      <FieldLabel htmlFor={name}>
        {label}
        {optional ? <OptionalTag /> : null}
      </FieldLabel>
      <Input id={name} inputMode="numeric" aria-invalid={!!errors[name]} {...form.register(name)} />
      <FieldError errors={[errors[name]]} />
    </Field>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="space-y-3">
        <Button
          variant="ghost"
          size="sm"
          className="-ms-2"
          render={<Link href="/manufacturer/products" />}
        >
          <ArrowLeft className="rtl:rotate-180" />
          {t('back')}
        </Button>
        <PageHeader
          title={
            product ? (
              <span className="inline-flex flex-wrap items-center gap-3">
                {product.title}
                <StatusBadge domain="product" status={product.status} />
              </span>
            ) : (
              t('newTitle')
            )
          }
          actions={
            <Button type="submit" disabled={isSubmitting || (product && !isDirty)}>
              {isSubmitting ? t('saving') : product ? t('save') : t('create')}
            </Button>
          }
        />
      </div>
      <FormAlert message={formError} />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('basics')}</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                {text('title', t('titleLabel'), t('titlePlaceholder'))}
                <Field data-invalid={!!errors.categoryId}>
                  <FieldLabel htmlFor="categoryId">{t('category')}</FieldLabel>
                  <Controller
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <Select
                        items={categoryItems}
                        value={field.value || null}
                        onValueChange={(value) =>
                          field.onChange(typeof value === 'string' ? value : '')
                        }
                      >
                        <SelectTrigger
                          id="categoryId"
                          className="w-full"
                          aria-invalid={!!errors.categoryId}
                        >
                          <SelectValue placeholder={t('categoryPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent className="max-h-72">
                          {categoryItems.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.categoryId]} />
                </Field>
                <Field data-invalid={!!errors.description}>
                  <FieldLabel htmlFor="description">
                    {t('descriptionLabel')}
                    <OptionalTag />
                  </FieldLabel>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder={t('descriptionPlaceholder')}
                    {...form.register('description')}
                  />
                  <FieldError errors={[errors.description]} />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('specs')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {text('fabric', t('fabric'), t('fabricPlaceholder'), true)}
                {text('composition', t('composition'), t('compositionPlaceholder'), true)}
                {number('gsm', t('gsm'), true)}
                {number('moqPcs', t('moq'))}
                {number('leadTimeDays', t('leadTime'))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('pricing')}</CardTitle>
              <CardDescription>{t('tiersHint')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field className="max-w-48">
                <FieldLabel htmlFor="currency">{t('currency')}</FieldLabel>
                <Controller
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <Select
                      items={CurrencySchema.options.map((c) => ({ value: c, label: c }))}
                      value={field.value}
                      onValueChange={(value) => {
                        const parsed = CurrencySchema.safeParse(value);
                        if (parsed.success) field.onChange(parsed.data);
                      }}
                    >
                      <SelectTrigger id="currency" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CurrencySchema.options.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
              <div className="overflow-hidden rounded-xl border">
                <div className="bg-surface text-muted-foreground grid grid-cols-[1fr_1fr_auto] gap-3 border-b px-3 py-2 text-xs font-medium tracking-wide uppercase">
                  <span>{t('minQty')}</span>
                  <span>
                    {t('unitPrice')} ({currency})
                  </span>
                  <span className="w-9" />
                </div>
                <ul className="divide-y">
                  {tiers.fields.map((tier, index) => {
                    const tierErrors = errors.priceTiers?.[index];
                    return (
                      <li
                        key={tier.id}
                        className="grid grid-cols-[1fr_1fr_auto] items-start gap-3 p-3"
                      >
                        <div>
                          <Input
                            aria-label={`${t('minQty')} ${String(index + 1)}`}
                            inputMode="numeric"
                            aria-invalid={!!tierErrors?.minQty}
                            {...form.register(`priceTiers.${index}.minQty`)}
                          />
                          <FieldError errors={[tierErrors?.minQty]} />
                        </div>
                        <div>
                          <Input
                            aria-label={`${t('unitPrice')} ${String(index + 1)}`}
                            inputMode="decimal"
                            placeholder={(0).toFixed(currencyDigits(currency))}
                            aria-invalid={!!tierErrors?.price}
                            className="tabular"
                            {...form.register(`priceTiers.${index}.price`)}
                          />
                          <FieldError errors={[tierErrors?.price]} />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={t('removeTier')}
                          disabled={tiers.fields.length === 1}
                          onClick={() => tiers.remove(index)}
                        >
                          <Trash2 />
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <FieldError
                errors={[
                  errors.priceTiers?.root ??
                    (errors.priceTiers?.message
                      ? { message: errors.priceTiers.message }
                      : undefined),
                ]}
              />
              {tiers.fields.length < 6 ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => tiers.append({ minQty: '', price: '' })}
                >
                  <Plus />
                  {t('addTier')}
                </Button>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24">
          <Card size="sm">
            <CardHeader>
              <CardTitle>{t('visibility')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Controller
                control={form.control}
                name="status"
                render={({ field }) => (
                  <div role="radiogroup" aria-label={t('visibility')} className="grid gap-2">
                    {(['DRAFT', 'PUBLISHED'] as const).map((value) => (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={field.value === value}
                        onClick={() => field.onChange(value)}
                        className={cn(
                          'focus-visible:ring-ring/40 rounded-lg border p-3 text-start transition-colors outline-none focus-visible:ring-3',
                          field.value === value
                            ? 'border-primary bg-primary-soft'
                            : 'hover:bg-surface',
                        )}
                      >
                        <span className="block text-sm font-medium">
                          {value === 'DRAFT' ? t('statusDraft') : t('statusPublished')}
                        </span>
                        <span className="text-muted-foreground block text-xs">
                          {value === 'DRAFT' ? t('statusDraftBody') : t('statusPublishedBody')}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              />
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>{t('images')}</CardTitle>
              <CardDescription>{t('imagesHint')}</CardDescription>
            </CardHeader>
            <CardContent>
              {product ? (
                <ProductImages product={product} />
              ) : (
                <FieldDescription>{t('saveFirst')}</FieldDescription>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}

function ProductImages({ product }: { product: ManufacturerProduct }) {
  const add = useAddProductImage(product.id);
  const remove = useRemoveProductImage(product.id);
  const reorder = useReorderProductImages(product.id);
  return (
    <div className="[&_ul]:grid-cols-2 [&_ul]:sm:grid-cols-3 [&_ul]:lg:grid-cols-2">
      <ImageManager
        images={product.images}
        max={MAX_IMAGES}
        onAdd={(file, onProgress) => add.mutateAsync({ file, onProgress })}
        onRemove={(id) => remove.mutate(id)}
        onReorder={(ids) => reorder.mutate(ids)}
        disabled={remove.isPending || reorder.isPending}
      />
    </div>
  );
}
