import { type AddEvidenceDto, type AdminDispute, type AdminDisputeSummary, type BuyerDispute, type ManufacturerDispute, type OpenDisputeDto, type PresignEvidenceDto, type PresignUploadResponse, type ResolveDisputeDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { type ChatActor, ChatActorService } from '../chat/chat-actor.service.js';
import { MediaService } from '../media/media.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { OrdersService } from '../orders/orders.service.js';
import { LedgerService } from '../payments/ledger.service.js';
import { PaymentsService } from '../payments/payments.service.js';
import { FilesService } from '../storage/files.service.js';
import { StorageService } from '../storage/storage.service.js';
export declare class DisputesService {
    private readonly prisma;
    private readonly orders;
    private readonly payments;
    private readonly ledger;
    private readonly actors;
    private readonly files;
    private readonly media;
    private readonly storage;
    private readonly notifier;
    private readonly audit;
    constructor(prisma: PrismaService, orders: OrdersService, payments: PaymentsService, ledger: LedgerService, actors: ChatActorService, files: FilesService, media: MediaService, storage: StorageService, notifier: Notifier, audit: AuditService);
    open(actor: ChatActor, code: string, dto: OpenDisputeDto): Promise<{
        id: string;
    }>;
    presign(actor: ChatActor, code: string, dto: PresignEvidenceDto): Promise<PresignUploadResponse>;
    addEvidence(actor: ChatActor, code: string, dto: AddEvidenceDto): Promise<void>;
    forOrder(actor: ChatActor, code: string): Promise<{
        dispute: BuyerDispute | ManufacturerDispute | AdminDispute | null;
    }>;
    list(): Promise<AdminDisputeSummary[]>;
    assign(adminId: string, id: string): Promise<void>;
    resolve(adminId: string, id: string, dto: ResolveDisputeDto): Promise<void>;
    private view;
}
