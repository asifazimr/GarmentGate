import type { PresignUploadResponse } from '@garmentgate/shared';
import type { FilePurpose } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { MalwareScanner } from './malware-scanner.js';
import { StorageService } from './storage.service.js';
export declare const MALWARE_SCANNER: unique symbol;
export interface ReserveUpload {
    userId: string;
    companyId: string | null;
    purpose: FilePurpose;
    folder: string;
    fileName: string;
    contentType: string;
    sizeBytes: number;
    maxBytes: number;
}
export declare class FilesService {
    private readonly prisma;
    private readonly storage;
    private readonly scanner;
    private readonly logger;
    constructor(prisma: PrismaService, storage: StorageService, scanner: MalwareScanner | null);
    reserveUpload(input: ReserveUpload): Promise<PresignUploadResponse>;
    confirmUpload(fileId: string, owner: string | {
        userId: string;
    }, purpose: FilePurpose, maxBytes: number): Promise<{
        id: string;
        status: import("../../generated/prisma/enums.js").FileStatus;
        createdAt: Date;
        width: number | null;
        bucket: string;
        storageKey: string;
        sanitizedKey: string | null;
        originalFilename: string;
        mimeType: string;
        sizeBytes: number;
        checksumSha256: string | null;
        purpose: FilePurpose;
        scanStatus: import("../../generated/prisma/enums.js").ScanStatus;
        uploadedById: string | null;
        ownerCompanyId: string | null;
        uploadedAt: Date | null;
        processingStatus: import("../../generated/prisma/enums.js").ImageProcessingStatus | null;
        processingError: string | null;
        processedAt: Date | null;
        height: number | null;
    }>;
    remove(fileId: string): Promise<void>;
}
