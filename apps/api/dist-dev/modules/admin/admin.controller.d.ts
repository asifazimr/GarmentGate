import { type AdminCertification, type AdminOverview, type AdminOverviewQuery, type AdminUser, type AuditEntry, type AuditQuery, type CertificationStatus, type OverrideOrderStatusDto, type RejectCertificationDto, type SuspendUserDto, type WarnUserDto } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { OrdersService } from '../orders/orders.service.js';
import { AdminAuditService } from './admin-audit.service.js';
import { AdminCertificationsService } from './admin-certifications.service.js';
import { AdminOverviewService } from './admin-overview.service.js';
import { AdminUsersService } from './admin-users.service.js';
export declare class AdminController {
    private readonly overviewService;
    private readonly users;
    private readonly auditLog;
    private readonly certifications;
    private readonly orders;
    private readonly actors;
    constructor(overviewService: AdminOverviewService, users: AdminUsersService, auditLog: AdminAuditService, certifications: AdminCertificationsService, orders: OrdersService, actors: ChatActorService);
    overview(query: AdminOverviewQuery): Promise<AdminOverview>;
    listUsers(): Promise<AdminUser[]>;
    suspend(admin: AuthenticatedUser, id: string, dto: SuspendUserDto): Promise<void>;
    reactivate(admin: AuthenticatedUser, id: string): Promise<void>;
    warn(admin: AuthenticatedUser, id: string, dto: WarnUserDto): Promise<void>;
    audit(query: AuditQuery): Promise<AuditEntry[]>;
    listCertifications(query: {
        status?: CertificationStatus;
    }): Promise<AdminCertification[]>;
    verifyCertification(admin: AuthenticatedUser, id: string): Promise<void>;
    rejectCertification(admin: AuthenticatedUser, id: string, dto: RejectCertificationDto): Promise<void>;
    override(admin: AuthenticatedUser, code: string, dto: OverrideOrderStatusDto): Promise<void>;
}
