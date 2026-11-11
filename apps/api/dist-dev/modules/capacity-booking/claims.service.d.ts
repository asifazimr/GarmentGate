import { type AdminClaim, type ManufacturerClaim, type RejectClaimDto, type SupplierClaimDto, type SupplierClaimStatus } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ManufacturerContext } from '../manufacturer/manufacturer-context.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { SearchService } from '../search/search.service.js';
import { FilesService } from '../storage/files.service.js';
import { StorageService } from '../storage/storage.service.js';
export declare class ClaimsService {
    private readonly prisma;
    private readonly files;
    private readonly storage;
    private readonly search;
    private readonly notifier;
    private readonly audit;
    constructor(prisma: PrismaService, files: FilesService, storage: StorageService, search: SearchService, notifier: Notifier, audit: AuditService);
    list(ctx: ManufacturerContext): Promise<ManufacturerClaim[]>;
    create(ctx: ManufacturerContext, dto: SupplierClaimDto): Promise<ManufacturerClaim>;
    remove(ctx: ManufacturerContext, id: string): Promise<void>;
    adminList(status: SupplierClaimStatus | undefined): Promise<AdminClaim[]>;
    verify(adminId: string, id: string, note: string | undefined): Promise<void>;
    reject(adminId: string, id: string, dto: RejectClaimDto): Promise<void>;
    private decide;
    private view;
}
