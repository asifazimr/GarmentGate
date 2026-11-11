import { type AdminContract, type BuyerContract, type CallOffDto, type CreateContractDto, type ManufacturerContract, type Merchandiser } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { OrdersService } from '../orders/orders.service.js';
export declare class ContractsService {
    private readonly prisma;
    private readonly orders;
    private readonly codes;
    private readonly notifier;
    private readonly audit;
    constructor(prisma: PrismaService, orders: OrdersService, codes: PublicCodeService, notifier: Notifier, audit: AuditService);
    create(adminId: string, dto: CreateContractDto): Promise<{
        code: string;
    }>;
    end(adminId: string, code: string, status: 'ENDED' | 'CANCELLED'): Promise<void>;
    adminList(): Promise<AdminContract[]>;
    buyerList(actor: ChatActor): Promise<BuyerContract[]>;
    callOff(actor: ChatActor, code: string, dto: CallOffDto): Promise<{
        orderCode: string;
    }>;
    factoryList(actor: ChatActor): Promise<ManufacturerContract[]>;
    setMerchandiser(adminId: string, buyerCode: string, userId: string | null): Promise<void>;
    merchandiserOf(companyId: string): Promise<(Merchandiser & {
        id: string;
    }) | null>;
    accountMerchandiser(buyerCode: string): Promise<{
        userId: string;
        name: string;
    } | null>;
    buyerMerchandiser(actor: ChatActor): Promise<Merchandiser | null>;
    private notifyMerchandiser;
    private side;
    private factoryIdentities;
    private shared;
}
