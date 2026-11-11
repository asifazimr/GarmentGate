import { type AdminClaim, type RejectClaimDto, type SupplierClaimStatus } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { ClaimsService } from './claims.service.js';
export declare class AdminClaimsController {
    private readonly claims;
    constructor(claims: ClaimsService);
    list(query: {
        status?: SupplierClaimStatus;
    }): Promise<AdminClaim[]>;
    verify(admin: AuthenticatedUser, id: string, dto: {
        note?: string;
    }): Promise<void>;
    reject(admin: AuthenticatedUser, id: string, dto: RejectClaimDto): Promise<void>;
}
