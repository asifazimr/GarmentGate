import { type AddInspectionPhotoDto, type AssignInspectionDto, type BookInspectionDto, type CreateInspectorDto, type InspectionReportDto, type Inspector, type InspectorJob, type InspectorJobDetail, type PresignInspectionFileDto, type PresignUploadResponse } from '@garmentgate/shared';
import { GigService } from './gig.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { AuthenticatedUser } from '../auth/auth.decorators.js';
import { AuthService } from '../auth/auth.service.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import { MediaService } from '../media/media.service.js';
import { OrdersService } from '../orders/orders.service.js';
import { FilesService } from '../storage/files.service.js';
import { PerformanceService } from '../trust/performance.service.js';
export declare class InspectionsService {
    private readonly prisma;
    private readonly notifier;
    private readonly orders;
    private readonly files;
    private readonly media;
    private readonly auth;
    private readonly audit;
    private readonly performance;
    private readonly gig;
    constructor(prisma: PrismaService, notifier: Notifier, orders: OrdersService, files: FilesService, media: MediaService, auth: AuthService, audit: AuditService, performance: PerformanceService, gig: GigService);
    book(actor: ChatActor, code: string, dto: BookInspectionDto): Promise<{
        id: string;
    }>;
    inspectors(): Promise<Inspector[]>;
    createInspector(adminId: string, dto: CreateInspectorDto): Promise<{
        id: string;
    }>;
    assign(adminId: string, id: string, dto: AssignInspectionDto): Promise<void>;
    jobs(user: AuthenticatedUser): Promise<InspectorJob[]>;
    jobDetail(user: AuthenticatedUser, id: string): Promise<InspectorJobDetail>;
    presign(user: AuthenticatedUser, id: string, dto: PresignInspectionFileDto): Promise<PresignUploadResponse>;
    addPhoto(user: AuthenticatedUser, id: string, dto: AddInspectionPhotoDto): Promise<void>;
    report(user: AuthenticatedUser, id: string, dto: InspectionReportDto): Promise<void>;
    private reportable;
    private loadJob;
    private job;
    private announce;
}
