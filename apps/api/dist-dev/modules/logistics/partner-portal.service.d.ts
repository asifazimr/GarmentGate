import { ConfigService } from '@nestjs/config';
import { type AttachShipmentUploadDto, type LogisticsDocumentType, type PartnerLeg, type PartnerLegRefsDto, type PresignShipmentUploadDto, type PresignUploadResponse, type TrackingEventDto } from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MediaService } from '../media/media.service.js';
import { FilesService } from '../storage/files.service.js';
import { ShipmentsService } from './shipments.service.js';
import { TrackingService } from './tracking.service.js';
export declare class PartnerPortalService {
    private readonly prisma;
    private readonly tracking;
    private readonly shipments;
    private readonly files;
    private readonly media;
    private readonly config;
    constructor(prisma: PrismaService, tracking: TrackingService, shipments: ShipmentsService, files: FilesService, media: MediaService, config: ConfigService<Env, true>);
    partnerOf(userId: string): Promise<string>;
    legs(userId: string): Promise<PartnerLeg[]>;
    leg(userId: string, legId: string): Promise<PartnerLeg>;
    accept(userId: string, legId: string): Promise<void>;
    updateRefs(userId: string, legId: string, dto: PartnerLegRefsDto): Promise<void>;
    event(userId: string, legId: string, dto: TrackingEventDto): Promise<void>;
    presign(userId: string, legId: string, dto: PresignShipmentUploadDto): Promise<PresignUploadResponse>;
    attach(userId: string, legId: string, dto: AttachShipmentUploadDto): Promise<void>;
    document(userId: string, legId: string, type: LogisticsDocumentType): Promise<{
        file: Buffer;
        name: string;
    }>;
    private ownLeg;
    private view;
}
