import { type AdminLead, type LeadDto, type PublicDirectory, type PublicPricing, type PublicStats, type UpdateLeadDto } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { PublicSiteService } from './public-site.service.js';
export declare class PublicSiteController {
    private readonly site;
    constructor(site: PublicSiteService);
    stats(): Promise<PublicStats>;
    pricing(): Promise<PublicPricing>;
    directory(): Promise<PublicDirectory>;
    lead(dto: LeadDto): Promise<void>;
}
export declare class AdminLeadsController {
    private readonly site;
    constructor(site: PublicSiteService);
    list(): Promise<AdminLead[]>;
    update(user: AuthenticatedUser, id: string, dto: UpdateLeadDto): Promise<void>;
}
