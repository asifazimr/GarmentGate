import { type OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type ManufacturerSearchQuery, type ManufacturerSearchResult, type ProductSearchQuery, type ProductSearchResult } from '@garmentgate/shared';
import type { Queue } from 'bullmq';
import { Meilisearch } from 'meilisearch';
import type { Env } from '../../config/env.schema.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MediaService } from '../media/media.service.js';
import { SearchIndexer } from './search-indexer.js';
import { type SearchJob } from './search.constants.js';
export declare class SearchService implements OnApplicationBootstrap {
    private readonly prisma;
    private readonly media;
    private readonly queue;
    private readonly logger;
    readonly meili: Meilisearch;
    readonly indexer: SearchIndexer;
    constructor(prisma: PrismaService, media: MediaService, config: ConfigService<Env, true>, queue: Queue<SearchJob>);
    onApplicationBootstrap(): Promise<void>;
    syncProduct(id: string): Promise<void>;
    syncManufacturer(profileId: string): Promise<void>;
    private enqueue;
    searchProducts(query: ProductSearchQuery): Promise<ProductSearchResult>;
    searchManufacturers(query: ManufacturerSearchQuery): Promise<ManufacturerSearchResult>;
}
