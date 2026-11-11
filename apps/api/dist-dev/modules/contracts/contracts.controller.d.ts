import { type AdminContract, type BuyerContract, type CallOffDto, type CreateContractDto, type ManufacturerContract, type Merchandiser, type SetMerchandiserDto } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { ContractsService } from './contracts.service.js';
export declare class ContractsController {
    private readonly contracts;
    private readonly actors;
    constructor(contracts: ContractsService, actors: ChatActorService);
    buyerList(user: AuthenticatedUser): Promise<BuyerContract[]>;
    callOff(user: AuthenticatedUser, code: string, dto: CallOffDto): Promise<{
        orderCode: string;
    }>;
    merchandiser(user: AuthenticatedUser): Promise<Merchandiser | null>;
    factoryList(user: AuthenticatedUser): Promise<ManufacturerContract[]>;
}
export declare class AdminContractsController {
    private readonly contracts;
    constructor(contracts: ContractsService);
    list(): Promise<AdminContract[]>;
    create(user: AuthenticatedUser, dto: CreateContractDto): Promise<{
        code: string;
    }>;
    end(user: AuthenticatedUser, code: string): Promise<void>;
    merchandiser(code: string): Promise<{
        userId: string;
        name: string;
    } | null>;
    setMerchandiser(user: AuthenticatedUser, code: string, dto: SetMerchandiserDto): Promise<void>;
}
