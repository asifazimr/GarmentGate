import { type AdminBankAccount, type BankDetails, type FactoryBankAccountDto, type FactoryBankAccountView, type ReviewBankAccountDto } from '@garmentgate/shared';
import type { FactoryBankAccount, Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import { Notifier } from '../notifications/notifier.service.js';
export declare function bankDetails(a: FactoryBankAccount): BankDetails;
export declare class BankAccountsService {
    private readonly prisma;
    private readonly notifier;
    private readonly audit;
    constructor(prisma: PrismaService, notifier: Notifier, audit: AuditService);
    mine(actor: ChatActor): Promise<FactoryBankAccountView | null>;
    submit(actor: ChatActor, dto: FactoryBankAccountDto): Promise<void>;
    list(): Promise<AdminBankAccount[]>;
    review(adminId: string, id: string, dto: ReviewBankAccountDto): Promise<void>;
    verifiedFor(companyId: string, client?: Prisma.TransactionClient): Promise<FactoryBankAccount | null>;
    private factoryCompany;
}
