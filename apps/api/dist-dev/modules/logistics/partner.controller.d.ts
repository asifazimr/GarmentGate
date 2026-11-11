import { StreamableFile } from '@nestjs/common';
import { type AttachShipmentUploadDto, type PartnerLeg, PartnerDocumentTypeSchema, type PartnerLegRefsDto, type PresignShipmentUploadDto, type PresignUploadResponse, type TrackingEventDto } from '@garmentgate/shared';
import type { Response } from 'express';
import { z } from 'zod';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { PartnerPortalService } from './partner-portal.service.js';
export declare class PartnerController {
    private readonly portal;
    constructor(portal: PartnerPortalService);
    legs(user: AuthenticatedUser): Promise<PartnerLeg[]>;
    leg(user: AuthenticatedUser, legId: string): Promise<PartnerLeg>;
    accept(user: AuthenticatedUser, legId: string): Promise<void>;
    refs(user: AuthenticatedUser, legId: string, dto: PartnerLegRefsDto): Promise<void>;
    event(user: AuthenticatedUser, legId: string, dto: TrackingEventDto): Promise<void>;
    presign(user: AuthenticatedUser, legId: string, dto: PresignShipmentUploadDto): Promise<PresignUploadResponse>;
    attach(user: AuthenticatedUser, legId: string, dto: AttachShipmentUploadDto): Promise<void>;
    document(user: AuthenticatedUser, legId: string, type: z.infer<typeof PartnerDocumentTypeSchema>, res: Response): Promise<StreamableFile>;
}
