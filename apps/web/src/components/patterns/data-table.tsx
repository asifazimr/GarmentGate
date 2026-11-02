'use client';

import { toCsv } from '@garmentgate/shared';
import {
  type ColumnDef,
  type RowData,
  columnFacetingFeature,
  columnFilteringFeature,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_equalsString,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  tableFeatures,
  useTable,
} from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  type LucideIcon,
  Search,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type ReactNode, useMemo } from 'react';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DURATION, EASE_OUT_EXPO } from '@/lib/motion';
import { cn } from '@/lib/utils';

const MotionBody = motion.create(TableBody);

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  columnFacetingFeature,
  rowSortingFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: { includesString: filterFn_includesString, equalsString: filterFn_equalsString },
  sortFns: { alphanumeric: sortFn_alphanumeric, basic: sortFn_basic },
});

type Plain = string | number | null;

/** One column: a plain value (sorting, search, filters, CSV) and an optional richer cell. */
export interface DataColumn<T extends RowData> {
  id: string;
  header: string;
  value: (row: T) => Plain;
  cell?: (row: T) => ReactNode;
  /** Numbers and money read best right-aligned. */
  align?: 'start' | 'end';
  sortable?: boolean;
  /** Part of the search box (text columns by default). */
  searchable?: boolean;
  /** Left out of the CSV (e.g. action buttons). */
  csv?: boolean;
  /** Hidden below `md`, to keep phones to the essentials. */
  hideOnMobile?: boolean;
  className?: string;
}

/** A select filter on a column; options default to the column's distinct values. */
export interface DataFilter {
  column: string;
  label: string;
  options?: { value: string; label: string }[];
}

/**
 * The admin list: search across columns, select filters, sortable headers, pagination and CSV
 * export of everything that matches (not just the page). Loading shows skeleton rows, errors a
 * retry, and an empty list the next step.
 */
export function DataTable<T extends RowData>({
  data,
  columns,
  loading,
  error,
  onRetry,
  retrying,
  filters = [],
  empty,
  csvName,
  rowHref,
  initialSort,
  pageSize = 20,
  toolbar,
}: {
  data: T[] | undefined;
  columns: DataColumn<T>[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  retrying?: boolean;
  filters?: DataFilter[];
  empty: { icon: LucideIcon; title: string; description: string; action?: ReactNode };
  /** File name without extension; the date is appended. */
  csvName: string;
  /** Rows link here (Enter or click), e.g. the order's page. */
  rowHref?: (row: T) => string;
  initialSort?: { id: string; desc: boolean };
  pageSize?: number;
  /** Extra controls next to the search box. */
  toolbar?: ReactNode;
}) {
  const t = useTranslations('patterns.dataTable');
  const router = useRouter();
  const rows = useMemo(() => data ?? [], [data]);
  const defs = useMemo<ColumnDef<typeof features, T>[]>(
    () =>
      columns.map((c) => ({
        id: c.id,
        header: c.header,
        accessorFn: (row: T) => c.value(row),
        cell: ({ row }) => (c.cell ? c.cell(row.original) : (c.value(row.original) ?? '—')),
        enableSorting: c.sortable ?? true,
        enableGlobalFilter: c.searchable ?? true,
        filterFn: 'equalsString' as const,
        sortFn: 'alphanumeric' as const,
        sortUndefined: 'last' as const,
      })),
    [columns],
  );
  const table = useTable({
    features,
    columns: defs,
    data: rows,
    globalFilterFn: 'includesString',
    getColumnCanGlobalFilter: (column) =>
      columns.find((c) => c.id === column.id)?.searchable ?? true,
    initialState: {
      pagination: { pageIndex: 0, pageSize },
      sorting: initialSort ? [initialSort] : [],
    },
  });
  const byId = new Map(columns.map((c) => [c.id, c]));
  const filtered = table.getFilteredRowModel().rows.length;
  const { pageIndex } = table.state.pagination;
  const pageCount = Math.max(1, table.getPageCount());

  const exportCsv = () => {
    const exported = columns.filter((c) => c.csv ?? true);
    const csv = toCsv(
      exported.map((c) => c.header),
      table.getSortedRowModel().rows.map((r) => exported.map((c) => c.value(r.original))),
    );
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${csvName}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1 basis-56">
          <Search
            className="text-subtle-foreground pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <Input
            type="search"
            className="ps-9"
            placeholder={t('search')}
            aria-label={t('search')}
            value={String(table.state.globalFilter ?? '')}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
          />
        </div>
        {filters.map((f) => {
          const column = table.getColumn(f.column);
          if (!column) return null;
          const options =
            f.options ??
            [...column.getFacetedUniqueValues().keys()]
              .filter((v): v is string | number => v !== null && v !== undefined && v !== '')
              .map((v) => ({ value: String(v), label: String(v) }))
              .sort((a, b) => a.label.localeCompare(b.label));
          const current = column.getFilterValue();
          return (
            <Select
              key={f.column}
              items={[{ value: '', label: f.label }, ...options]}
              value={typeof current === 'string' ? current : ''}
              onValueChange={(v) =>
                column.setFilterValue(typeof v === 'string' && v ? v : undefined)
              }
            >
              <SelectTrigger aria-label={f.label} className="min-w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('all', { label: f.label })}</SelectItem>
                {options.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        })}
        {toolbar}
        <Button variant="outline" onClick={exportCsv} disabled={loading || error || filtered === 0}>
          <Download />
          {t('export')}
        </Button>
      </div>

      {error ? (
        <ErrorState onRetry={onRetry} retrying={retrying} />
      ) : loading ? (
        <div className="space-y-2" aria-busy="true" aria-label={t('loading')}>
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-12 rounded-lg" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <EmptyState
          icon={empty.icon}
          title={empty.title}
          description={empty.description}
          action={empty.action}
        />
      ) : (
        <>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((group) => (
                <TableRow key={group.id}>
                  {group.headers.map((header) => {
                    const col = byId.get(header.column.id);
                    const sorted = header.column.getIsSorted();
                    const label = col?.header ?? header.column.id;
                    return (
                      <TableHead
                        key={header.id}
                        aria-sort={
                          sorted === 'asc'
                            ? 'ascending'
                            : sorted === 'desc'
                              ? 'descending'
                              : undefined
                        }
                        className={cn(
                          col?.align === 'end' && 'text-end',
                          col?.hideOnMobile && 'hidden md:table-cell',
                        )}
                      >
                        {header.column.getCanSort() ? (
                          <button
                            type="button"
                            className={cn(
                              'hover:text-foreground focus-visible:ring-ring/40 -mx-1 inline-flex min-h-8 items-center gap-1 rounded px-1 outline-none focus-visible:ring-3',
                              col?.align === 'end' && 'flex-row-reverse',
                            )}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {label}
                            {sorted === 'asc' ? (
                              <ArrowUp className="size-3.5" aria-hidden="true" />
                            ) : sorted === 'desc' ? (
                              <ArrowDown className="size-3.5" aria-hidden="true" />
                            ) : (
                              <ArrowUpDown className="size-3.5 opacity-40" aria-hidden="true" />
                            )}
                          </button>
                        ) : (
                          label
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            {/* Paging, sorting and filtering cross-fade the rows instead of swapping them. */}
            <MotionBody
              key={`${String(pageIndex)}:${String(filtered)}:${JSON.stringify(table.state.sorting)}`}
              initial={{ opacity: 0.35 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO }}
            >
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-muted-foreground py-10 text-center"
                  >
                    {t('noMatches')}
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => {
                  const href = rowHref?.(row.original);
                  return (
                    <TableRow
                      key={row.id}
                      className={cn(href && 'cursor-pointer')}
                      onClick={(e) => {
                        // Buttons and links inside a row keep their own behaviour.
                        if (!href || (e.target as HTMLElement).closest('a,button,[role=menuitem]'))
                          return;
                        router.push(href);
                      }}
                    >
                      {row.getAllCells().map((cell, i) => {
                        const col = byId.get(cell.column.id);
                        return (
                          <TableCell
                            key={cell.id}
                            className={cn(
                              col?.align === 'end' && 'text-end',
                              col?.hideOnMobile && 'hidden md:table-cell',
                              col?.className,
                            )}
                          >
                            {/* The first cell carries the link, so rows are keyboard reachable. */}
                            {i === 0 && href ? (
                              <a
                                href={href}
                                className="focus-visible:ring-ring/40 rounded outline-none focus-visible:ring-3"
                                onClick={(e) => {
                                  e.preventDefault();
                                  router.push(href);
                                }}
                              >
                                <table.FlexRender cell={cell} />
                              </a>
                            ) : (
                              <table.FlexRender cell={cell} />
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              )}
            </MotionBody>
          </Table>
          <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-2 text-sm">
            <p className="tabular" aria-live="polite">
              {t('count', { shown: filtered, total: rows.length })}
            </p>
            <div className="flex items-center gap-2">
              <span className="tabular">
                {t('page', { page: pageIndex + 1, pages: pageCount })}
              </span>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label={t('previous')}
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              >
                <ChevronLeft className="rtl:rotate-180" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label={t('next')}
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
              >
                <ChevronRight className="rtl:rotate-180" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
