import { ConfigService } from '@nestjs/config';
import { type AdminShipment, type AdminShipmentRow, type CreateShipmentDto, type LogisticsDocumentType, type UpdateLegDto, type UpdateShipmentDto, type ShipmentUploadKind } from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { LogisticsSettingsService } from './logistics-settings.service.js';
import { MediaService } from '../media/media.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { StorageService } from '../storage/storage.service.js';
export declare class ShipmentsService {
    private readonly prisma;
    private readonly settings;
    private readonly codes;
    private readonly audit;
    private readonly config;
    private readonly storage;
    private readonly notifier;
    private readonly media;
    constructor(prisma: PrismaService, settings: LogisticsSettingsService, codes: PublicCodeService, audit: AuditService, config: ConfigService<Env, true>, storage: StorageService, notifier: Notifier, media: MediaService);
    create(adminId: string, dto: CreateShipmentDto): Promise<{
        code: string;
    }>;
    private plannedLegs;
    list(): Promise<AdminShipmentRow[]>;
    detail(code: string): Promise<AdminShipment>;
    update(adminId: string, code: string, dto: UpdateShipmentDto): Promise<void>;
    updateLeg(adminId: string, code: string, legId: string, dto: UpdateLegDto): Promise<void>;
    document(adminId: string, code: string, type: LogisticsDocumentType): Promise<{
        file: Buffer;
        name: string;
    }>;
    private platform;
    private toOrder;
    private buyerParty;
    private render;
    private load;
    publishUpload(adminId: string, code: string, uploadId: string, buyerVisible: boolean): Promise<void>;
    buyerPapers(shipmentId: string): Promise<{
        id: string;
        kind: ShipmentUploadKind;
        name: string;
        url: string | null;
    }[]>;
    private view;
}
