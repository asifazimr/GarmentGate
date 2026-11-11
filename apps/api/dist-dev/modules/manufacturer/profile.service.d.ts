import { type AddCertificationDto, type Certification, type FactoryPhotoDto, type ManufacturerCapabilitiesDto, type ManufacturerProfileView, type PublicManufacturer, type ReorderDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import { MediaService } from '../media/media.service.js';
import { SearchService } from '../search/search.service.js';
import { FilesService } from '../storage/files.service.js';
import { type ManufacturerContext } from './manufacturer-context.service.js';
export declare class ManufacturerProfileService {
    private readonly prisma;
    private readonly notifier;
    private readonly media;
    private readonly files;
    private readonly audit;
    private readonly search;
    constructor(prisma: PrismaService, notifier: Notifier, media: MediaService, files: FilesService, audit: AuditService, search: SearchService);
    view(ctx: ManufacturerContext): Promise<ManufacturerProfileView & {
        capabilities: ManufacturerCapabilitiesDto | null;
    }>;
    updateCapabilities(ctx: ManufacturerContext, dto: ManufacturerCapabilitiesDto): Promise<void>;
    preview(ctx: ManufacturerContext): Promise<PublicManufacturer>;
    addPhoto(ctx: ManufacturerContext, dto: FactoryPhotoDto): Promise<void>;
    removePhoto(ctx: ManufacturerContext, photoId: string): Promise<void>;
    reorderPhotos(ctx: ManufacturerContext, dto: ReorderDto): Promise<void>;
    certifications(ctx: ManufacturerContext): Promise<Certification[]>;
    addCertification(ctx: ManufacturerContext, dto: AddCertificationDto): Promise<void>;
    removeCertification(ctx: ManufacturerContext, id: string): Promise<void>;
    private notifyAdmins;
}
