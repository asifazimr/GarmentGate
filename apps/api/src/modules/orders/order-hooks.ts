import { Injectable } from '@nestjs/common';
import type { OrderActor, OrderStatus } from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import type { OrderRow } from './order-views.js';

/**
 * Lets other modules take part in status changes without the orders module depending on them
 * (payments schedules escrow releases and blocks shipping until the balance is paid).
 */
export interface OrderHook {
  /** May throw to refuse the move (e.g. "the balance isn't paid yet"). */
  before?(order: OrderRow, to: OrderStatus, who: OrderActor): Promise<void>;
  /** Runs inside the transaction that moves the order, so its writes commit or roll back with it. */
  within?(tx: Prisma.TransactionClient, order: OrderRow, to: OrderStatus): Promise<void>;
}

@Injectable()
export class OrderHooks {
  private readonly hooks: OrderHook[] = [];

  register(hook: OrderHook): void {
    this.hooks.push(hook);
  }

  async before(order: OrderRow, to: OrderStatus, who: OrderActor): Promise<void> {
    for (const h of this.hooks) await h.before?.(order, to, who);
  }

  async within(tx: Prisma.TransactionClient, order: OrderRow, to: OrderStatus): Promise<void> {
    for (const h of this.hooks) await h.within?.(tx, order, to);
  }
}
