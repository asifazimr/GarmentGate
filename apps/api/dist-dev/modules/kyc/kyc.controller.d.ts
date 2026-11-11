import { type AddCertificationDto, type AddCompanyDocumentDto, type PresignUploadDto, type PresignUploadResponse } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { KycService } from './kyc.service.js';
export declare class KycController {
    private readonly kyc;
    constructor(kyc: KycService);
    presign(user: AuthenticatedUser, dto: PresignUploadDto): Promise<PresignUploadResponse>;
    addDocument(user: AuthenticatedUser, dto: AddCompanyDocumentDto): Promise<void>;
    removeDocument(user: AuthenticatedUser, id: string): Promise<void>;
    addCertification(user: AuthenticatedUser, dto: AddCertificationDto): Promise<void>;
    removeCertification(user: AuthenticatedUser, id: string): Promise<void>;
    downloadUrl(user: AuthenticatedUser, fileId: string): Promise<{
        url: string;
    }>;
}
