import type { AdminCertification, CertificationStatus, RejectCertificationDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { SearchService } from '../search/search.service.js';
import { StorageService } from '../storage/storage.service.js';
export declare class AdminCertificationsService {
    private readonly prisma;
    private readonly storage;
    private readonly search;
    private readonly notifier;
    private readonly audit;
    constructor(prisma: PrismaService, storage: StorageService, search: SearchService, notifier: Notifier, audit: AuditService);
    list(status: CertificationStatus | undefined): Promise<AdminCertification[]>;
    verify(adminId: string, id: string): Promise<void>;
    reject(adminId: string, id: string, dto: RejectCertificationDto): Promise<void>;
    private decide;
}
