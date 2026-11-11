import type { OrderActor, OrderStatus } from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import type { OrderRow } from './order-views.js';
export interface OrderHook {
    before?(order: OrderRow, to: OrderStatus, who: OrderActor): Promise<void>;
    within?(tx: Prisma.TransactionClient, order: OrderRow, to: OrderStatus): Promise<void>;
    after?(order: OrderRow, to: OrderStatus): Promise<void>;
}
export declare class OrderHooks {
    private readonly hooks;
    register(hook: OrderHook): void;
    before(order: OrderRow, to: OrderStatus, who: OrderActor): Promise<void>;
    within(tx: Prisma.TransactionClient, order: OrderRow, to: OrderStatus): Promise<void>;
    after(order: OrderRow, to: OrderStatus): Promise<void>;
}
