import { type AddInspectionPhotoDto, type AssignInspectionDto, type BookInspectionDto, type CreateInspectorDto, type InspectionReportDto, type Inspector, type InspectorJob, type InspectorJobDetail, type PresignInspectionFileDto, type PresignUploadResponse } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { InspectionsService } from './inspections.service.js';
export declare class OrderInspectionsController {
    private readonly actors;
    private readonly inspections;
    constructor(actors: ChatActorService, inspections: InspectionsService);
    book(user: AuthenticatedUser, code: string, dto: BookInspectionDto): Promise<{
        id: string;
    }>;
}
export declare class InspectorController {
    private readonly inspections;
    constructor(inspections: InspectionsService);
    jobs(user: AuthenticatedUser): Promise<InspectorJob[]>;
    detail(user: AuthenticatedUser, id: string): Promise<InspectorJobDetail>;
    presign(user: AuthenticatedUser, id: string, dto: PresignInspectionFileDto): Promise<PresignUploadResponse>;
    addPhoto(user: AuthenticatedUser, id: string, dto: AddInspectionPhotoDto): Promise<void>;
    report(user: AuthenticatedUser, id: string, dto: InspectionReportDto): Promise<void>;
}
export declare class AdminInspectionsController {
    private readonly inspections;
    constructor(inspections: InspectionsService);
    inspectors(): Promise<Inspector[]>;
    createInspector(admin: AuthenticatedUser, dto: CreateInspectorDto): Promise<{
        id: string;
    }>;
    assign(admin: AuthenticatedUser, id: string, dto: AssignInspectionDto): Promise<void>;
}
