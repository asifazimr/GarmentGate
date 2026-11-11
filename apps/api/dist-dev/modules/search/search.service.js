var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SearchService_1;
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Meilisearch } from 'meilisearch';
import { PrismaService } from '../../prisma/prisma.service.js';
import { publicManufacturerInclude, publicProductInclude } from '../catalog/catalog.queries.js';
import { toPublicManufacturer, toPublicProduct } from '../catalog/public.serializer.js';
import { MediaService } from '../media/media.service.js';
import { manufacturerFilter, manufacturerSort, productFilter, productSort, } from './search-filters.js';
import { SearchIndexer } from './search-indexer.js';
import { SEARCH_QUEUE } from './search.constants.js';
const facetCounts = (dist, key) => dist?.[key] ?? {};
let SearchService = SearchService_1 = class SearchService {
    prisma;
    media;
    queue;
    logger = new Logger(SearchService_1.name);
    meili;
    indexer;
    constructor(prisma, media, config, queue) {
        this.prisma = prisma;
        this.media = media;
        this.queue = queue;
        this.meili = new Meilisearch({
            host: config.get('MEILISEARCH_HOST', { infer: true }),
            apiKey: config.get('MEILISEARCH_API_KEY', { infer: true }),
        });
        this.indexer = new SearchIndexer(prisma, this.meili, config.get('MEILISEARCH_INDEX_PREFIX', { infer: true }));
    }
    async onApplicationBootstrap() {
        try {
            await this.indexer.ensureIndexes();
            await this.enqueue({ kind: 'reindex' });
        }
        catch (error) {
            this.logger.error({ err: error }, 'Search indexes unavailable; search will retry on next sync');
        }
    }
    syncProduct(id) {
        return this.enqueue({ kind: 'product', id });
    }
    syncManufacturer(profileId) {
        return this.enqueue({ kind: 'manufacturer', profileId });
    }
    async enqueue(job) {
        const jobId = job.kind === 'product'
            ? `p-${job.id}`
            : job.kind === 'manufacturer'
                ? `m-${job.profileId}`
                : 'reindex';
        try {
            await this.queue.add(job.kind, job, {
                jobId: `${jobId}-${String(Math.floor(Date.now() / 2_000))}`,
                attempts: 5,
                backoff: { type: 'exponential', delay: 1_000 },
                removeOnComplete: 500,
                removeOnFail: 1_000,
            });
        }
        catch (error) {
            this.logger.error({ err: error, job }, 'Failed to enqueue search sync');
        }
    }
    async searchProducts(query) {
        const result = await this.meili
            .index(this.indexer.productsIndex)
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
    async searchManufacturers(query) {
        const result = await this.meili
            .index(this.indexer.manufacturersIndex)
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
};
SearchService = SearchService_1 = __decorate([
    Injectable(),
    __param(3, InjectQueue(SEARCH_QUEUE)),
    __metadata("design:paramtypes", [PrismaService,
        MediaService,
        ConfigService, Function])
], SearchService);
export { SearchService };
//# sourceMappingURL=search.service.js.map