import type { Meilisearch } from 'meilisearch';
import type { Prisma, PrismaClient } from '../../generated/prisma/client.js';
type Client = PrismaClient | Prisma.TransactionClient;
export declare class SearchIndexer {
    private readonly prisma;
    private readonly meili;
    constructor(prisma: Client, meili: Meilisearch, prefix?: string);
    readonly productsIndex: string;
    readonly manufacturersIndex: string;
    ensureIndexes(): Promise<void>;
    reindexAll(): Promise<{
        products: number;
        manufacturers: number;
    }>;
    syncProduct(productId: string): Promise<void>;
    syncManufacturer(profileId: string): Promise<void>;
    private productDoc;
    private manufacturerDoc;
}
export {};
