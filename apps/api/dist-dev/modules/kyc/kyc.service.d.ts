import { type AddCertificationDto, type AddCompanyDocumentDto, type PresignUploadDto, type PresignUploadResponse } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { AuthenticatedUser } from '../auth/auth.decorators.js';
import { FilesService } from '../storage/files.service.js';
import { StorageService } from '../storage/storage.service.js';
export declare class KycService {
    private readonly prisma;
    private readonly storage;
    private readonly files;
    private readonly audit;
    constructor(prisma: PrismaService, storage: StorageService, files: FilesService, audit: AuditService);
    presignUpload(userId: string, dto: PresignUploadDto): Promise<PresignUploadResponse>;
    addDocument(userId: string, dto: AddCompanyDocumentDto): Promise<void>;
    removeDocument(userId: string, documentId: string): Promise<void>;
    addCertification(userId: string, dto: AddCertificationDto): Promise<void>;
    removeCertification(userId: string, certificationId: string): Promise<void>;
    downloadUrl(user: AuthenticatedUser, fileId: string): Promise<{
        url: string;
    }>;
    private editableCompany;
    private confirmUpload;
}
