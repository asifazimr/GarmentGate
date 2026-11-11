import { type FactoryPhotoDto, type ManufacturerProduct, type ProductDto, type ReorderDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MediaService } from '../media/media.service.js';
import { PlansService } from '../plans/plans.service.js';
import { SearchService } from '../search/search.service.js';
import { FilesService } from '../storage/files.service.js';
import { type ManufacturerContext } from './manufacturer-context.service.js';
export declare class ManufacturerProductsService {
    private readonly prisma;
    private readonly media;
    private readonly files;
    private readonly search;
    private readonly plans;
    constructor(prisma: PrismaService, media: MediaService, files: FilesService, search: SearchService, plans: PlansService);
    list(ctx: ManufacturerContext): Promise<ManufacturerProduct[]>;
    get(ctx: ManufacturerContext, id: string): Promise<ManufacturerProduct>;
    create(ctx: ManufacturerContext, dto: ProductDto): Promise<ManufacturerProduct>;
    update(ctx: ManufacturerContext, id: string, dto: ProductDto): Promise<ManufacturerProduct>;
    remove(ctx: ManufacturerContext, id: string): Promise<void>;
    addImage(ctx: ManufacturerContext, id: string, dto: FactoryPhotoDto): Promise<ManufacturerProduct>;
    removeImage(ctx: ManufacturerContext, id: string, imageId: string): Promise<void>;
    reorderImages(ctx: ManufacturerContext, id: string, dto: ReorderDto): Promise<void>;
    private find;
    private productData;
    private priceTiers;
    private toView;
}
