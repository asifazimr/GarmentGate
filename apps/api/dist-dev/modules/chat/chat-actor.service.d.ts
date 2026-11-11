import type { Role } from '@garmentgate/shared';
import type { Conversation } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
export interface ChatActor {
    userId: string;
    role: Role;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    companyId: string | null;
    companyType: 'BUYER' | 'MANUFACTURER' | null;
    companyCode: string | null;
    manufacturerProfileId: string | null;
}
export declare class ChatActorService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    resolve(userId: string): Promise<ChatActor>;
    conversation(actor: ChatActor, id: string): Promise<Conversation>;
}
