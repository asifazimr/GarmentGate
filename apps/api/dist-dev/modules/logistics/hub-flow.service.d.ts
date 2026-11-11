import { ConfigService } from '@nestjs/config';
import { type AdminLogisticsOrder, type BookPickupDto, type FactoryOrderLogistics, type HubReceiptDto, type OrderPackingDto, type PresignHubPhotoDto, type PresignUploadResponse, type UpdatePickupDto } from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import { MediaService } from '../media/media.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { OrdersService } from '../orders/orders.service.js';
import { FilesService } from '../storage/files.service.js';
import { LogisticsSettingsService } from './logistics-settings.service.js';
export declare function isManaged(prisma: PrismaService, orderId: string): Promise<boolean>;
export declare class HubFlowService {
    private readonly prisma;
    private readonly orders;
    private readonly settings;
    private readonly files;
    private readonly media;
    private readonly notifier;
    private readonly audit;
    private readonly config;
    constructor(prisma: PrismaService, orders: OrdersService, settings: LogisticsSettingsService, files: FilesService, media: MediaService, notifier: Notifier, audit: AuditService, config: ConfigService<Env, true>);
    factoryView(actor: ChatActor, code: string): Promise<FactoryOrderLogistics>;
    savePacking(actor: ChatActor, code: string, dto: OrderPackingDto): Promise<void>;
    bookPickup(actor: ChatActor, code: string, dto: BookPickupDto): Promise<void>;
    cartonMarkings(actor: ChatActor, code: string): Promise<{
        file: Buffer;
        name: string;
    }>;
    board(): Promise<AdminLogisticsOrder[]>;
    updatePickup(adminId: string, id: string, dto: UpdatePickupDto): Promise<void>;
    presignHubPhoto(adminId: string, dto: PresignHubPhotoDto): Promise<PresignUploadResponse>;
    receive(adminId: string, dto: HubReceiptDto): Promise<void>;
    private livePickup;
    private factoryOrder;
}
