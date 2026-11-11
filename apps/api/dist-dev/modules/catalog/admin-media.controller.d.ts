import { type MediaReviewDecisionDto, type MediaReviewItem, type MediaReviewKind } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { MediaService } from '../media/media.service.js';
import { RfqFilesService } from '../rfq/rfq-files.service.js';
import { StorageService } from '../storage/storage.service.js';
export declare class AdminMediaController {
    private readonly prisma;
    private readonly media;
    private readonly rfqFiles;
    private readonly audit;
    private readonly storage;
    constructor(prisma: PrismaService, media: MediaService, rfqFiles: RfqFilesService, audit: AuditService, storage: StorageService);
    pending(): Promise<MediaReviewItem[]>;
    approve(admin: AuthenticatedUser, kind: MediaReviewKind, id: string): Promise<void>;
    reject(admin: AuthenticatedUser, kind: MediaReviewKind, id: string, body: MediaReviewDecisionDto): Promise<void>;
    private decide;
}
