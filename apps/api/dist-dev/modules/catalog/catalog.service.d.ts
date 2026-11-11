import type { PublicManufacturer, PublicProduct } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MediaService } from '../media/media.service.js';
export declare class CatalogService {
    private readonly prisma;
    private readonly media;
    constructor(prisma: PrismaService, media: MediaService);
    manufacturers(filter: {
        category?: string | undefined;
        country?: string | undefined;
    }): Promise<PublicManufacturer[]>;
    manufacturer(publicCode: string): Promise<PublicManufacturer>;
    products(filter: {
        category?: string | undefined;
        manufacturer?: string | undefined;
    }): Promise<PublicProduct[]>;
    product(id: string): Promise<PublicProduct>;
}
