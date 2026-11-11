import { ConfigService } from '@nestjs/config';
import { type AddMilestoneMediaDto, type AdminOrder, type AdminOrderSummary, type BuyerOrder, type BuyerOrderSummary, type ManufacturerOrder, type ManufacturerOrderSummary, type MilestoneUpdateDto, type NotificationLink, type OrderActor, type OrderStatus, type OverrideOrderStatusDto, type OrderTransitionDto, type PresignOrderMediaDto, type PresignUploadResponse, type ProductionStage, type ReorderOrderDto, type RequestSampleDto, type SampleDecisionDto, type ShipSampleDto } from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import type { NotificationType, Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import { MediaService } from '../media/media.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { FilesService } from '../storage/files.service.js';
import { StorageService } from '../storage/storage.service.js';
import { type MediaLinks, type OrderRow } from './order-views.js';
import { OrderHooks } from './order-hooks.js';
export declare const actorOf: (actor: ChatActor) => OrderActor;
export declare class OrdersService {
    private readonly prisma;
    private readonly notifier;
    private readonly media;
    private readonly files;
    private readonly codes;
    private readonly audit;
    private readonly config;
    private readonly hooks;
    private readonly storage;
    constructor(prisma: PrismaService, notifier: Notifier, media: MediaService, files: FilesService, codes: PublicCodeService, audit: AuditService, config: ConfigService<Env, true>, hooks: OrderHooks, storage: StorageService);
    load(actor: ChatActor, code: string): Promise<OrderRow>;
    detail(actor: ChatActor, code: string): Promise<BuyerOrder | ManufacturerOrder | AdminOrder>;
    list(actor: ChatActor): Promise<BuyerOrderSummary[] | ManufacturerOrderSummary[] | AdminOrderSummary[]>;
    links(order: OrderRow): Promise<MediaLinks>;
    transition(actor: ChatActor, code: string, dto: OrderTransitionDto, options?: {
        resolvingDispute?: boolean;
    }): Promise<void>;
    move(actor: ChatActor | 'SYSTEM', order: OrderRow, to: OrderStatus, note: string | undefined, effects: (tx: Prisma.TransactionClient) => Promise<Prisma.OrderUpdateManyMutationInput>, options?: {
        override?: boolean;
    }): Promise<void>;
    override(actor: ChatActor, code: string, dto: OverrideOrderStatusDto): Promise<void>;
    advance(orderId: string, to: OrderStatus, note: string): Promise<void>;
    replanProduction(tx: Prisma.TransactionClient, order: Pick<OrderRow, 'id' | 'requestedShipDate'>, start?: Date): Promise<void>;
    private planMilestones;
    requestSample(actor: ChatActor, code: string, dto: RequestSampleDto): Promise<void>;
    shipSample(actor: ChatActor, code: string, sampleId: string, dto: ShipSampleDto): Promise<void>;
    decideSample(actor: ChatActor, code: string, sampleId: string, dto: SampleDecisionDto): Promise<void>;
    updateMilestone(actor: ChatActor, code: string, stage: ProductionStage, dto: MilestoneUpdateDto): Promise<void>;
    presign(actor: ChatActor, code: string, dto: PresignOrderMediaDto): Promise<PresignUploadResponse>;
    addMilestoneMedia(actor: ChatActor, code: string, stage: ProductionStage, dto: AddMilestoneMediaDto): Promise<void>;
    reorder(actor: ChatActor, code: string, dto: ReorderOrderDto): Promise<{
        code: string;
    }>;
    purchaseOrder(actor: ChatActor, code: string, side: 'buyer' | 'manufacturer' | undefined): Promise<{
        file: Buffer;
        name: string;
    }>;
    private announce;
    notifyParty(order: OrderRow, party: 'BUYER' | 'MANUFACTURER' | 'ADMIN', type: NotificationType, title: string, body: string, link?: NotificationLink): Promise<void>;
}
