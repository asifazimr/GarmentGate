import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  commissionAmount,
  lateness,
  needsDelayAlert,
  type OrderException,
  type OrderStatus,
  releaseTranches,
  REPLACEABLE_STATUSES,
  type ReplaceFactoryDto,
} from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { OrdersService } from '../orders/orders.service.js';
import { FxService } from '../payments/fx.service.js';
import { LedgerService } from '../payments/ledger.service.js';

const MAKING: OrderStatus[] = ['IN_PRODUCTION', 'QC', 'READY_TO_SHIP'];
const stageLabel = (stage: string) =>
  stage === 'SHIP_DATE' ? 'the ship date' : stage.toLowerCase().replaceAll('_', ' ');

const watchSelect = {
  id: true,
  code: true,
  status: true,
  currency: true,
  requestedShipDate: true,
  delayAlertedAt: true,
  buyerCompanyId: true,
  buyerCompany: { select: { legalName: true, buyerProfile: { select: { publicCode: true } } } },
  manufacturerProfile: {
    select: { publicCode: true, company: { select: { id: true, legalName: true } } },
  },
  milestones: { select: { stage: true, status: true, plannedAt: true } },
  hubReceipts: { select: { id: true }, take: 1 },
  _count: { select: { factoryChanges: true } },
} as const;

/**
 * The exception flow (business model): orders a week or more behind plan, final inspections
 * that failed and samples the buyer rejected, for staff to act on (rework, discount, refund or
 * another factory). Late orders raise an alert to staff, the factory and the buyer, weekly.
 */
@Injectable()
export class ExceptionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orders: OrdersService,
    private readonly ledger: LedgerService,
    private readonly fx: FxService,
    private readonly notifier: Notifier,
    private readonly audit: AuditService,
  ) {}

  async list(now = new Date()): Promise<OrderException[]> {
    const [making, failed, rejected] = await Promise.all([
      this.prisma.order.findMany({ where: { status: { in: MAKING } }, select: watchSelect }),
      this.prisma.order.findMany({
        where: {
          status: 'QC',
          inspections: { some: { type: 'PRE_SHIPMENT', result: 'FAIL' } },
        },
        select: {
          ...watchSelect,
          inspections: {
            where: { type: 'PRE_SHIPMENT', result: { in: ['PASS', 'FAIL'] } },
            orderBy: { inspectedAt: 'desc' },
            take: 1,
            select: { result: true, inspectedAt: true },
          },
        },
      }),
      this.prisma.order.findMany({
        where: { status: { in: ['SAMPLING', 'SAMPLE_APPROVED'] } },
        select: {
          ...watchSelect,
          samples: {
            orderBy: { round: 'desc' },
            take: 2,
            select: { status: true, updatedAt: true },
          },
        },
      }),
    ]);
    type Row = (typeof making)[number];
    const base = (o: Row) => ({
      orderCode: o.code,
      status: o.status,
      currency: o.currency,
      buyer: {
        code: o.buyerCompany.buyerProfile?.publicCode ?? 'BYR',
        name: o.buyerCompany.legalName,
      },
      manufacturer: {
        code: o.manufacturerProfile.publicCode,
        name: o.manufacturerProfile.company.legalName,
      },
      delayAlertedAt: o.delayAlertedAt?.toISOString() ?? null,
      factoryChanges: o._count.factoryChanges,
    });
    const rows: OrderException[] = [];
    for (const o of making) {
      const late = lateness({ ...o, atHub: o.hubReceipts.length > 0 }, now);
      if (late && late.daysLate >= 7)
        rows.push({
          ...base(o),
          kind: 'DELAY',
          daysLate: late.daysLate,
          stage: late.stage,
          since: null,
        });
    }
    for (const o of failed)
      if (o.inspections[0]?.result === 'FAIL')
        rows.push({
          ...base(o),
          kind: 'INSPECTION_FAILED',
          daysLate: null,
          stage: null,
          since: o.inspections[0].inspectedAt?.toISOString() ?? null,
        });
    for (const o of rejected) {
      // A rejected round followed by a new request: the buyer asked for another sample.
      const rejectedRound = o.samples.find((s) => s.status === 'REJECTED');
      if (rejectedRound)
        rows.push({
          ...base(o),
          kind: 'SAMPLE_REJECTED',
          daysLate: null,
          stage: null,
          since: rejectedRound.updatedAt.toISOString(),
        });
    }
    return rows.sort((a, b) => (b.daysLate ?? 0) - (a.daysLate ?? 0));
  }

  /** Weekly alerts for orders a week or more late. Run by the exceptions sweep. */
  async sweep(now = new Date()): Promise<number> {
    const making = await this.prisma.order.findMany({
      where: { status: { in: MAKING } },
      select: watchSelect,
    });
    let alerted = 0;
    for (const o of making) {
      const late = lateness({ ...o, atHub: o.hubReceipts.length > 0 }, now);
      if (!late || !needsDelayAlert(late, o.delayAlertedAt, now)) continue;
      // Claim the alert first, so two instances never send it twice.
      const { count } = await this.prisma.order.updateMany({
        where: { id: o.id, delayAlertedAt: o.delayAlertedAt },
        data: { delayAlertedAt: now },
      });
      if (count !== 1) continue;
      const days = String(late.daysLate);
      const stage = stageLabel(late.stage);
      await this.notifier.notify({
        to: 'ADMINS',
        type: 'ORDER_UPDATE',
        title: `${o.code}: ${days} days late`,
        body: `${o.manufacturerProfile.publicCode} is ${days} days behind on ${stage}. Rework, discount, refund or another factory?`,
        link: { orderCode: o.code },
      });
      await this.notifier.notify({
        to: { companyId: o.manufacturerProfile.company.id },
        type: 'ORDER_UPDATE',
        title: `${o.code}: ${days} days behind plan`,
        body: `${stage[0]?.toUpperCase() ?? ''}${stage.slice(1)} is ${days} days late. Update the stage or tell GarmentGate your new date.`,
        link: { orderCode: o.code },
      });
      await this.notifier.notify({
        to: { companyId: o.buyerCompanyId },
        type: 'ORDER_UPDATE',
        title: `${o.code}: running late`,
        body: 'Production is behind plan. GarmentGate is on it and will update you with a new date.',
        link: { orderCode: o.code },
      });
      alerted += 1;
    }
    return alerted;
  }

  /**
   * Staff move an order to another verified factory. What was already released to the old
   * factory stays with it; GarmentGate funds that amount back into escrow (revenue → escrow) so
   * the new factory's releases, recomputed on its price, add up. Production starts over.
   */
  async replaceFactory(adminId: string, code: string, dto: ReplaceFactoryDto): Promise<void> {
    const order = await this.prisma.order.findUnique({
      where: { code },
      include: {
        manufacturerProfile: { select: { id: true, publicCode: true, companyId: true } },
        hubReceipts: { select: { id: true }, take: 1 },
        releases: true,
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (!REPLACEABLE_STATUSES.includes(order.status) || order.hubReceipts.length > 0)
      throw new ConflictException('The goods are already with GarmentGate: too late to move');
    const next = await this.prisma.manufacturerProfile.findUnique({
      where: { publicCode: dto.manufacturerCode },
      select: {
        id: true,
        publicCode: true,
        companyId: true,
        company: { select: { kycStatus: true } },
      },
    });
    if (next?.company.kycStatus !== 'VERIFIED')
      throw new BadRequestException('Pick a verified factory');
    if (next.id === order.manufacturerProfileId)
      throw new BadRequestException('That is the current factory');
    if (dto.manufacturerUnitPriceMinor > order.buyerUnitPriceMinor)
      throw new BadRequestException('The new factory price is above what the buyer pays');

    const newTotal = BigInt(dto.manufacturerUnitPriceMinor) * BigInt(order.quantity);
    const commission = commissionAmount(newTotal, order.commissionBps);
    const remake = (MAKING as readonly OrderStatus[]).includes(order.status);
    let funded = 0n;

    await this.prisma.$transaction(async (tx) => {
      await this.ledger.lockOrder(tx, order.id);
      const { count } = await tx.order.updateMany({
        where: { id: order.id, manufacturerProfileId: order.manufacturerProfileId },
        data: {
          manufacturerProfileId: next.id,
          manufacturerUnitPriceMinor: dto.manufacturerUnitPriceMinor,
          manufacturerTotalMinor: newTotal,
          commissionMinor: commission,
          ...(remake && { status: 'IN_PRODUCTION', delayAlertedAt: null }),
        },
      });
      if (count !== 1) throw new ConflictException('The order just changed: try again');

      // Releases: keep what the old factory got, re-plan the rest for the new factory.
      const released = order.releases.filter(
        (r) => r.supersededAt === null && (r.status === 'RELEASED' || r.status === 'PAID'),
      );
      funded = released.reduce((a, r) => a + r.buyerMinor, 0n);
      if (order.releases.length > 0) {
        // The old factory's releases are superseded: what it got stays its (payouts still
        // run); what it hadn't got is cancelled.
        const now = new Date();
        await tx.orderRelease.updateMany({
          where: { orderId: order.id, supersededAt: null, status: { in: ['SCHEDULED', 'DUE'] } },
          data: { status: 'CANCELLED', supersededAt: now },
        });
        await tx.orderRelease.updateMany({
          where: { orderId: order.id, supersededAt: null },
          data: { supersededAt: now },
        });
        const schedule = order.releases
          .filter((r) => r.supersededAt === null)
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        const seen = new Set<string>();
        const plan = schedule.filter((r) => !seen.has(r.trigger) && seen.add(r.trigger));
        const tranches = releaseTranches(
          order.buyerTotalMinor,
          newTotal - commission,
          plan.map((r) => r.bps),
        );
        const reached = (trigger: string) =>
          trigger === 'PRODUCTION_START' &&
          (order.status === 'IN_PRODUCTION' ||
            order.status === 'QC' ||
            order.status === 'READY_TO_SHIP');
        await tx.orderRelease.createMany({
          data: plan.map((r, i) => ({
            orderId: order.id,
            trigger: r.trigger,
            bps: r.bps,
            currency: order.currency,
            buyerMinor: tranches[i]?.buyerMinor ?? 0n,
            manufacturerMinor: tranches[i]?.manufacturerMinor ?? 0n,
            commissionMinor: tranches[i]?.commissionMinor ?? 0n,
            manufacturerProfileId: next.id,
            // The new factory needs its material advance now.
            ...(reached(r.trigger) && { status: 'DUE' as const, dueAt: new Date() }),
          })),
        });
      }
      const change = await tx.orderFactoryChange.create({
        data: {
          orderId: order.id,
          fromProfileId: order.manufacturerProfileId,
          toProfileId: next.id,
          fromUnitPriceMinor: order.manufacturerUnitPriceMinor,
          toUnitPriceMinor: dto.manufacturerUnitPriceMinor,
          fundedMinor: funded,
          reason: dto.reason,
          createdById: adminId,
        },
      });
      if (funded > 0n) {
        const { rates } = await this.fx.snapshot(order.currency, tx);
        await this.ledger.post(tx, {
          kind: 'COMMISSION',
          key: `factory-change:${change.id}`,
          orderId: order.id,
          currency: order.currency,
          rates,
          description: `${order.code}: GarmentGate funds what the replaced factory already received`,
          lines: [
            {
              account: 'PLATFORM_REVENUE',
              companyId: null,
              direction: 'DEBIT',
              amountMinor: funded,
            },
            {
              account: 'BUYER_ESCROW',
              companyId: order.buyerCompanyId,
              direction: 'CREDIT',
              amountMinor: funded,
            },
          ],
        });
      }
      if (remake) {
        await this.orders.replanProduction(tx, order);
        if (order.status !== 'IN_PRODUCTION')
          await tx.orderEvent.create({
            data: {
              orderId: order.id,
              fromStatus: order.status,
              toStatus: 'IN_PRODUCTION',
              actorUserId: adminId,
              note: 'Moved to another factory: production starts over',
            },
          });
      }
      // The old factory's packing and pickups no longer apply.
      await tx.pickupRequest.updateMany({
        where: { orderId: order.id, status: { in: ['REQUESTED', 'SCHEDULED'] } },
        data: { status: 'CANCELLED' },
      });
      await tx.orderPacking.deleteMany({ where: { orderId: order.id } });
    });

    await this.audit.log({
      actorUserId: adminId,
      action: 'order.factory_replaced',
      entityType: 'Order',
      entityId: order.id,
      metadata: {
        from: order.manufacturerProfile.publicCode,
        to: next.publicCode,
        fundedMinor: funded.toString(),
        reason: dto.reason,
      },
    });
    await this.notifier.notify({
      to: { companyId: order.manufacturerProfile.companyId },
      type: 'ORDER_UPDATE',
      title: `${order.code}: moved to another factory`,
      body: 'GarmentGate has moved this order. Contact GarmentGate about anything already made or paid.',
    });
    await this.notifier.notify({
      to: { companyId: next.companyId },
      type: 'ORDER_UPDATE',
      title: `${order.code}: a new order for you`,
      body: 'GarmentGate has placed this order with you. Check the specification and the production plan.',
      link: { orderCode: order.code },
    });
    await this.notifier.notify({
      to: { companyId: order.buyerCompanyId },
      type: 'ORDER_UPDATE',
      title: `${order.code}: moved to another verified factory`,
      body: `GarmentGate moved your order to ${next.publicCode} to keep it on track. Your price doesn’t change.`,
      link: { orderCode: order.code },
    });
  }
}
