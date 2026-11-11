import { type CapacitySlot, type CapacitySlotDto, type CapacitySlotUpdateDto, type LineCalendar, type LineCalendarQuery, type ManufacturerClaim, type ManufacturerLine, type PresignClaimEvidenceDto, type PresignUploadResponse, type ProductionLineDto, type SupplierClaimDto } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { ManufacturerContextService } from '../manufacturer/manufacturer-context.service.js';
import { FilesService } from '../storage/files.service.js';
import { ClaimsService } from './claims.service.js';
import { LinesService } from './lines.service.js';
export declare class ManufacturerCapacityController {
    private readonly context;
    private readonly lines;
    private readonly claims;
    private readonly files;
    constructor(context: ManufacturerContextService, lines: LinesService, claims: ClaimsService, files: FilesService);
    listLines(user: AuthenticatedUser): Promise<ManufacturerLine[]>;
    createLine(user: AuthenticatedUser, dto: ProductionLineDto): Promise<ManufacturerLine>;
    updateLine(user: AuthenticatedUser, id: string, dto: ProductionLineDto): Promise<ManufacturerLine>;
    deleteLine(user: AuthenticatedUser, id: string): Promise<void>;
    calendar(user: AuthenticatedUser, query: LineCalendarQuery): Promise<LineCalendar>;
    openSlot(user: AuthenticatedUser, dto: CapacitySlotDto): Promise<CapacitySlot>;
    updateSlot(user: AuthenticatedUser, id: string, dto: CapacitySlotUpdateDto): Promise<CapacitySlot>;
    deleteSlot(user: AuthenticatedUser, id: string): Promise<void>;
    presignEvidence(user: AuthenticatedUser, dto: PresignClaimEvidenceDto): Promise<PresignUploadResponse>;
    listClaims(user: AuthenticatedUser): Promise<ManufacturerClaim[]>;
    createClaim(user: AuthenticatedUser, dto: SupplierClaimDto): Promise<ManufacturerClaim>;
    deleteClaim(user: AuthenticatedUser, id: string): Promise<void>;
}
