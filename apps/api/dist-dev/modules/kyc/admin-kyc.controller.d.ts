import { type AdminKycCompany, type AdminKycCompanyDetail, type KycStatus, type ApproveKycDto, type RejectKycDto } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { AdminKycService } from './admin-kyc.service.js';
export declare class AdminKycController {
    private readonly adminKyc;
    constructor(adminKyc: AdminKycService);
    list(status: KycStatus): Promise<AdminKycCompany[]>;
    detail(id: string): Promise<AdminKycCompanyDetail>;
    approve(admin: AuthenticatedUser, id: string, dto: ApproveKycDto): Promise<void>;
    reject(admin: AuthenticatedUser, id: string, dto: RejectKycDto): Promise<void>;
}
