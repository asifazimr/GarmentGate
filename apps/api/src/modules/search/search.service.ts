import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger, type OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  type ManufacturerSearchQuery,
  type ManufacturerSearchResult,
  type ProductSearchQuery,
  type ProductSearchResult,
} from '@garmentgate/shared';
import type { Queue } from 'bullmq';
import { Meilisearch } from 'meilisearch';
import type { Env } from '../../config/env.schema.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { publicManufacturerInclude, publicProductInclude } from '../catalog/catalog.queries.js';
import { toPublicManufacturer, toPublicProduct } from '../catalog/public.serializer.js';
import { MediaService } from '../media/media.service.js';
import { type ManufacturerDocument, type ProductDocument } from './search-documents.js';
import {
  manufacturerFilter,
  manufacturerSort,
  productFilter,
  productSort,
} from './search-filters.js';
import { SearchIndexer } from './search-indexer.js';
import { SEARCH_QUEUE, type SearchJob } from './search.constants.js';

const facetCounts = (dist: Record<string, Record<string, number>> | undefined, key: string) =>
  dist?.[key] ?? {};

@Injectable()
export class SearchService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SearchService.name);
  readonly meili: Meilisearch;
  readonly indexer: SearchIndexer;

  constructor(
    private readonly prisma: PrismaService,
    private readonly media: MediaService,
    config: ConfigService<Env, true>,
    @InjectQueue(SEARCH_QUEUE) private readonly queue: Queue<SearchJob>,
  ) {
    this.meili = new Meilisearch({
      host: config.get('MEILISEARCH_HOST', { infer: true }),
      apiKey: config.get('MEILISEARCH_API_KEY', { infer: true }),
    });
    this.indexer = new SearchIndexer(
      prisma,
      this.meili,
      config.get('MEILISEARCH_INDEX_PREFIX', { infer: true }),
    );
  }

  /** Index settings are code: apply them on boot, then rebuild in the background. */
  async onApplicationBootstrap(): Promise<void> {
    try {
      await this.indexer.ensureIndexes();
      await this.enqueue({ kind: 'reindex' });
    } catch (error) {
      this.logger.error(
        { err: error },
        'Search indexes unavailable; search will retry on next sync',
      );
    }
  }

  syncProduct(id: string): Promise<void> {
    return this.enqueue({ kind: 'product', id });
  }

  syncManufacturer(profileId: string): Promise<void> {
    return this.enqueue({ kind: 'manufacturer', profileId });
  }

  private async enqueue(job: SearchJob): Promise<void> {
    const jobId =
      job.kind === 'product'
        ? `p-${job.id}`
        : job.kind === 'manufacturer'
          ? `m-${job.profileId}`
          : 'reindex';
    try {
      // Same id while queued: bursts of edits collapse into one sync.
      await this.queue.add(job.kind, job, {
        jobId: `${jobId}-${String(Math.floor(Date.now() / 2_000))}`,
        attempts: 5,
        backoff: { type: 'exponential', delay: 1_000 },
        removeOnComplete: 500,
        removeOnFail: 1_000,
      });
    } catch (error) {
      this.logger.error({ err: error, job }, 'Failed to enqueue search sync');
    }
  }

  // ── Queries: Meilisearch finds ids, the public serializer renders them ─────

  async searchProducts(query: ProductSearchQuery): Promise<ProductSearchResult> {
    const result = await this.meili
      .index<ProductDocument>(this.indexer.productsIndex)
      .search(query.q ?? '', {
        filter: productFilter(query),
        sort: productSort(query.sort),
        facets: ['categories', 'fabric', 'country', 'certifications', 'minPrice'],
        page: query.page,
        hitsPerPage: query.pageSize,
        attributesToRetrieve: ['id', 'currency'],
      });
    const ids = result.hits.map((h) => h.id);
    const rows = await this.prisma.product.findMany({
      where: { id: { in: ids }, status: 'PUBLISHED', deletedAt: null },
      include: publicProductInclude,
    });
    const urls = await this.media.urlMap(rows.flatMap((r) => r.images.map((i) => i.file)));
    const byId = new Map(rows.map((r) => [r.id, toPublicProduct(r, urls)]));
    const stats = result.facetStats?.minPrice;
    return {
      hits: ids.flatMap((id) => {
        const product = byId.get(id);
        return product ? [product] : [];
      }),
      total: result.totalHits,
      page: result.page,
      pageSize: result.hitsPerPage,
      facets: {
        category: facetCounts(result.facetDistribution, 'categories'),
        fabric: facetCounts(result.facetDistribution, 'fabric'),
        country: facetCounts(result.facetDistribution, 'country'),
        certifications: facetCounts(result.facetDistribution, 'certifications'),
      },
      priceRange: stats ? { min: Math.floor(stats.min), max: Math.ceil(stats.max) } : null,
    };
  }

  async searchManufacturers(query: ManufacturerSearchQuery): Promise<ManufacturerSearchResult> {
    const result = await this.meili
      .index<ManufacturerDocument>(this.indexer.manufacturersIndex)
      .search(query.q ?? '', {
        filter: manufacturerFilter(query),
        sort: manufacturerSort(query.sort),
        facets: ['categories', 'country', 'certifications'],
        page: query.page,
        hitsPerPage: query.pageSize,
        attributesToRetrieve: ['publicCode'],
      });
    const codes = result.hits.map((h) => h.publicCode);
    const rows = await this.prisma.manufacturerProfile.findMany({
      where: { publicCode: { in: codes }, isListed: true },
      include: publicManufacturerInclude,
    });
    const urls = await this.media.urlMap(rows.flatMap((r) => r.photos.map((p) => p.file)));
    const byCode = new Map(rows.map((r) => [r.publicCode, toPublicManufacturer(r, urls)]));
    return {
      hits: codes.flatMap((code) => {
        const m = byCode.get(code);
        return m ? [m] : [];
      }),
      total: result.totalHits,
      page: result.page,
      pageSize: result.hitsPerPage,
      facets: {
        category: facetCounts(result.facetDistribution, 'categories'),
        country: facetCounts(result.facetDistribution, 'country'),
        certifications: facetCounts(result.facetDistribution, 'certifications'),
      },
    };
  }
}
