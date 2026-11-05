import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  type AdminLogisticsOrder,
  type BookPickupDto,
  cartonVolumeLitres,
  dateOnly,
  estimatedCargo,
  type FactoryOrderLogistics,
  filterContactDetails,
  type HubAddress,
  type HubReceiptDto,
  isoDate,
  type OrderPackingDto,
  type OrderStatus,
  type PresignHubPhotoDto,
  type PresignUploadResponse,
  type UpdatePickupDto,
} from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import type { Hub } from '../../generated/prisma/client.js';
import { forwarderOf } from './logistics-params.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import { MediaService } from '../media/media.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { actorOf, OrdersService } from '../orders/orders.service.js';
import { FilesService } from '../storage/files.service.js';
import { renderCartonMarkings } from './logistics-documents.js';
import { LogisticsSettingsService } from './logistics-settings.service.js';

const PACKABLE: readonly OrderStatus[] = ['IN_PRODUCTION', 'QC', 'READY_TO_SHIP'];
const HUB_PHOTO_MAX_BYTES = 15 * 1024 * 1024;

/** Is this order shipped by GarmentGate (the buyer accepted a shipping option)? */
export async function isManaged(prisma: PrismaService, orderId: string): Promise<boolean> {
  return (await prisma.logisticsQuote.count({ where: { orderId, status: 'ACCEPTED' } })) > 0;
}

const hubAddress = (h: Hub): HubAddress => ({
  id: h.id,
  code: h.code,
  name: h.name,
  addressLine1: h.addressLine1,
  addressLine2: h.addressLine2,
  city: h.city,
  postalCode: h.postalCode,
  country: h.country,
});

/**
 * From the factory floor to a GarmentGate hub. The factory gives packing details, books a
 * pickup to a hub (never anywhere else) and prints GarmentGate's carton markings; staff
 * schedule the pickup and record what arrives. Nothing here tells the factory who the buyer is.
 */
@Injectable()
export class HubFlowService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orders: OrdersService,
    private readonly settings: LogisticsSettingsService,
    private readonly files: FilesService,
    private readonly media: MediaService,
    private readonly notifier: Notifier,
    private readonly audit: AuditService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  // ── Factory ───────────────────────────────────────────────────────────────

  async factoryView(actor: ChatActor, code: string): Promise<FactoryOrderLogistics> {
    const order = await this.factoryOrder(actor, code);
    const country = order.manufacturerProfile.company.country;
    const [managed, packing, pickup, receipt, onShipment, hubs] = await Promise.all([
      isManaged(this.prisma, order.id),
      this.prisma.orderPacking.findUnique({ where: { orderId: order.id } }),
      this.livePickup(order.id),
      this.prisma.hubReceipt.findFirst({
        where: { orderId: order.id },
        orderBy: { receivedAt: 'desc' },
      }),
      this.prisma.logisticsShipmentOrder.count({ where: { orderId: order.id, active: true } }),
      this.prisma.hub.findMany({ where: { country, active: true }, orderBy: { code: 'asc' } }),
    ]);
    return {
      managed,
      canPack: managed && PACKABLE.includes(order.status) && !receipt && onShipment === 0,
      canBookPickup: managed && order.status === 'READY_TO_SHIP' && packing !== null && !pickup,
      packing: packing
        ? {
            cartons: packing.cartons,
            piecesPerCarton: packing.piecesPerCarton,
            grossWeightGrams: packing.grossWeightGrams,
            netWeightGrams: packing.netWeightGrams,
            volumeLitres: packing.volumeLitres,
            cartonLengthCm: packing.cartonLengthCm,
            cartonWidthCm: packing.cartonWidthCm,
            cartonHeightCm: packing.cartonHeightCm,
          }
        : null,
      pickup: pickup
        ? {
            status: pickup.status,
            pickupDate: isoDate(pickup.pickupDate),
            hub: hubAddress(pickup.hub),
          }
        : null,
      received: receipt
        ? { cartons: receipt.cartonsReceived, receivedAt: receipt.receivedAt.toISOString() }
        : null,
      hubs: managed ? hubs.map(hubAddress) : [],
    };
  }

  async savePacking(actor: ChatActor, code: string, dto: OrderPackingDto): Promise<void> {
    const order = await this.factoryOrder(actor, code);
    const view = await this.factoryView(actor, code);
    if (!view.managed) throw new ConflictException('GarmentGate doesn’t ship this order');
    if (!view.canPack) throw new ConflictException('Packing can’t be changed any more');
    const volumeLitres =
      dto.volumeLitres ??
      cartonVolumeLitres(
        dto.cartons,
        dto.cartonLengthCm ?? 0,
        dto.cartonWidthCm ?? 0,
        dto.cartonHeightCm ?? 0,
      );
    const data = { ...dto, volumeLitres, updatedById: actor.userId };
    await this.prisma.orderPacking.upsert({
      where: { orderId: order.id },
      create: { ...data, orderId: order.id },
      update: data,
    });
  }

  async bookPickup(actor: ChatActor, code: string, dto: BookPickupDto): Promise<void> {
    const order = await this.factoryOrder(actor, code);
    const view = await this.factoryView(actor, code);
    if (!view.canBookPickup)
      throw new ConflictException(
        view.managed
          ? 'Add packing details first, once the order is ready to ship'
          : 'GarmentGate doesn’t ship this order',
      );
    const hub = view.hubs.find((h) => h.id === dto.hubId);
    if (!hub) throw new BadRequestException('Pick one of GarmentGate’s hubs in your country');
    if (dto.pickupDate < isoDate(new Date()))
      throw new BadRequestException('Pick a date from today on');
    const note = dto.note ? filterContactDetails(dto.note) : null;
    try {
      await this.prisma.pickupRequest.create({
        data: {
          orderId: order.id,
          hubId: hub.id,
          pickupDate: dateOnly(dto.pickupDate),
          note: dto.note,
          noteFiltered: note?.filtered ?? null,
          createdById: actor.userId,
        },
      });
    } catch {
      throw new ConflictException('A pickup is already booked for this order');
    }
    await this.notifier.notify({
      to: 'ADMINS',
      type: 'ORDER_UPDATE',
      title: `${order.code}: pickup requested`,
      body: `${order.manufacturerProfile.publicCode} → ${hub.code} on ${dto.pickupDate}`,
      link: { orderCode: order.code },
      email: false,
    });
  }

  /** GarmentGate's carton markings: the hub, the order and the carton count. No buyer details. */
  async cartonMarkings(actor: ChatActor, code: string): Promise<{ file: Buffer; name: string }> {
    const order = await this.orders.load(actor, code);
    if (actorOf(actor) === 'BUYER')
      throw new ForbiddenException('Carton markings are for the factory');
    const [packing, pickup] = await Promise.all([
      this.prisma.orderPacking.findUnique({ where: { orderId: order.id } }),
      this.livePickup(order.id),
    ]);
    if (!packing || !pickup)
      throw new ConflictException('Add packing details and book the pickup first');
    const file = await renderCartonMarkings({
      reference: order.code,
      hub: {
        code: pickup.hub.code,
        name: pickup.hub.name,
        lines: [
          pickup.hub.addressLine1,
          pickup.hub.addressLine2,
          [pickup.hub.postalCode, pickup.hub.city].filter(Boolean).join(' '),
        ].filter((l): l is string => Boolean(l)),
      },
      cartons: packing.cartons,
      piecesPerCarton: packing.piecesPerCarton,
      grossWeightGramsPerCarton: Math.round(packing.grossWeightGrams / packing.cartons),
      originCountry: order.manufacturerProfile.company.country,
    });
    return { file, name: `${order.code}-carton-markings.pdf` };
  }

  // ── Staff ─────────────────────────────────────────────────────────────────

  /** Every order GarmentGate ships, with where its goods are. */
  async board(): Promise<AdminLogisticsOrder[]> {
    const settings = await this.settings.get();
    const quotes = await this.prisma.logisticsQuote.findMany({
      where: { status: 'ACCEPTED', order: { status: { not: 'CANCELLED' } } },
      orderBy: { acceptedAt: 'desc' },
      take: 500,
      include: {
        consolidation: { select: { code: true } },
        order: {
          select: {
            id: true,
            code: true,
            status: true,
            quantity: true,
            buyerCompany: {
              select: { legalName: true, buyerProfile: { select: { publicCode: true } } },
            },
            manufacturerProfile: {
              select: { publicCode: true, company: { select: { legalName: true, country: true } } },
            },
            packing: true,
            pickups: {
              where: { status: { not: 'CANCELLED' } },
              include: { hub: { select: { code: true } } },
              take: 1,
            },
            hubReceipts: {
              orderBy: { receivedAt: 'desc' },
              take: 1,
              include: { hub: { select: { code: true } } },
            },
            logisticsShipments: {
              where: { active: true },
              include: { shipment: { select: { code: true } } },
            },
          },
        },
      },
    });
    const paid = await this.prisma.payment.groupBy({
      by: ['orderId'],
      where: {
        orderId: { in: quotes.map((q) => q.orderId) },
        purpose: 'LOGISTICS',
        direction: 'INBOUND',
        status: 'SUCCEEDED',
      },
      _sum: { amountMinor: true },
    });
    const paidBy = new Map(paid.map((p) => [p.orderId, p._sum.amountMinor ?? 0n]));
    return quotes.map((q) => {
      const o = q.order;
      const estimate = estimatedCargo(o.quantity, settings);
      const pickup = o.pickups[0];
      const receipt = o.hubReceipts[0];
      return {
        code: o.code,
        status: o.status,
        buyer: {
          code: o.buyerCompany.buyerProfile?.publicCode ?? '',
          name: o.buyerCompany.legalName,
        },
        manufacturer: {
          code: o.manufacturerProfile.publicCode,
          name: o.manufacturerProfile.company.legalName,
          country: o.manufacturerProfile.company.country,
        },
        quote: {
          mode: q.mode,
          incoterm: q.incoterm,
          destinationCountry: q.destinationCountry,
          destinationPort: q.destinationPort,
          currency: q.currency,
          totalMinor: Number(q.totalMinor),
          paid: (paidBy.get(o.id) ?? 0n) >= q.totalMinor,
          consolidationCode: q.consolidation?.code ?? null,
          forwarder: forwarderOf(q),
        },
        cargo: {
          estimatedGrams: estimate.weightGrams,
          estimatedLitres: estimate.volumeLitres,
          packedGrams: o.packing?.grossWeightGrams ?? null,
          packedLitres: o.packing?.volumeLitres ?? null,
          cartons: o.packing?.cartons ?? null,
        },
        pickup: pickup
          ? {
              id: pickup.id,
              status: pickup.status,
              pickupDate: isoDate(pickup.pickupDate),
              hubCode: pickup.hub.code,
            }
          : null,
        receipt: receipt
          ? {
              hubCode: receipt.hub.code,
              cartonsReceived: receipt.cartonsReceived,
              condition: receipt.condition,
              receivedAt: receipt.receivedAt.toISOString(),
            }
          : null,
        shipmentCode: o.logisticsShipments[0]?.shipment.code ?? null,
      };
    });
  }

  async updatePickup(adminId: string, id: string, dto: UpdatePickupDto): Promise<void> {
    const pickup = await this.prisma.pickupRequest.findUnique({
      where: { id },
      include: {
        order: { select: { code: true, manufacturerProfileId: true } },
        hub: { select: { code: true } },
      },
    });
    if (!pickup) throw new NotFoundException('Pickup not found');
    const allowed: Record<UpdatePickupDto['status'], ('REQUESTED' | 'SCHEDULED')[]> = {
      SCHEDULED: ['REQUESTED', 'SCHEDULED'],
      COLLECTED: ['SCHEDULED'],
      CANCELLED: ['REQUESTED', 'SCHEDULED'],
    };
    const { count } = await this.prisma.pickupRequest.updateMany({
      where: { id, status: { in: allowed[dto.status] } },
      data: {
        status: dto.status,
        ...(dto.pickupDate && { pickupDate: dateOnly(dto.pickupDate) }),
        ...(dto.status === 'SCHEDULED' && { scheduledAt: new Date(), partnerId: dto.partnerId }),
        ...(dto.status === 'COLLECTED' && { collectedAt: new Date() }),
      },
    });
    if (count !== 1)
      throw new ConflictException(
        `A ${pickup.status.toLowerCase()} pickup can’t become ${dto.status.toLowerCase()}`,
      );
    await this.audit.log({
      actorUserId: adminId,
      action: `logistics.pickup_${dto.status.toLowerCase()}`,
      entityType: 'PickupRequest',
      entityId: id,
    });
    if (dto.status !== 'COLLECTED')
      await this.notifier.notify({
        to: { manufacturerProfileId: pickup.order.manufacturerProfileId },
        type: 'ORDER_UPDATE',
        title: `${pickup.order.code}: pickup ${dto.status === 'SCHEDULED' ? 'scheduled' : 'cancelled'}`,
        body:
          dto.status === 'SCHEDULED'
            ? `GarmentGate collects the goods for ${pickup.hub.code} on ${dto.pickupDate ?? isoDate(pickup.pickupDate)}.`
            : 'GarmentGate will be in touch about a new date.',
        link: { orderCode: pickup.order.code },
      });
  }

  async presignHubPhoto(adminId: string, dto: PresignHubPhotoDto): Promise<PresignUploadResponse> {
    return this.files.reserveUpload({
      userId: adminId,
      companyId: null,
      purpose: 'HUB_PHOTO',
      folder: 'originals',
      fileName: dto.fileName,
      contentType: dto.contentType,
      sizeBytes: dto.sizeBytes,
      maxBytes: HUB_PHOTO_MAX_BYTES,
    });
  }

  /** Records what arrived at a hub: counted, checked, photographed; the pickup is done. */
  async receive(adminId: string, dto: HubReceiptDto): Promise<void> {
    const order = await this.prisma.order.findUnique({
      where: { code: dto.orderCode },
      select: {
        id: true,
        code: true,
        buyerCompanyId: true,
        manufacturerProfileId: true,
        packing: { select: { cartons: true } },
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (!(await isManaged(this.prisma, order.id)))
      throw new ConflictException('GarmentGate doesn’t ship this order');
    const hub = await this.prisma.hub.findFirst({ where: { id: dto.hubId, active: true } });
    if (!hub) throw new NotFoundException('Hub not found');
    const photos: { id: string }[] = [];
    for (const id of dto.photoFileIds)
      photos.push(
        await this.files.confirmUpload(id, { userId: adminId }, 'HUB_PHOTO', HUB_PHOTO_MAX_BYTES),
      );
    const pickup = await this.livePickup(order.id);
    await this.prisma.$transaction(async (tx) => {
      await tx.hubReceipt.create({
        data: {
          hubId: hub.id,
          orderId: order.id,
          pickupId: pickup?.id ?? null,
          receivedById: adminId,
          cartonsExpected: order.packing?.cartons ?? 0,
          cartonsReceived: dto.cartonsReceived,
          grossWeightGrams: dto.grossWeightGrams,
          condition: dto.condition,
          repacked: dto.repacked,
          relabelled: dto.relabelled,
          notes: dto.notes,
          photos: { create: photos.map((p) => ({ fileId: p.id })) },
        },
      });
      if (pickup)
        await tx.pickupRequest.update({ where: { id: pickup.id }, data: { status: 'RECEIVED' } });
    });
    for (const p of photos) await this.media.enqueue(p.id);
    await this.audit.log({
      actorUserId: adminId,
      action: 'logistics.hub_received',
      entityType: 'Order',
      entityId: order.id,
      metadata: { hub: hub.code, cartons: dto.cartonsReceived, condition: dto.condition },
    });
    await this.notifier.notify({
      to: { manufacturerProfileId: order.manufacturerProfileId },
      type: 'ORDER_UPDATE',
      title: `${order.code}: received at ${hub.code}`,
      body: `${String(dto.cartonsReceived)} cartons checked in (${dto.condition.toLowerCase()}).`,
      link: { orderCode: order.code },
    });
    // The buyer hears the goods are with GarmentGate: no hub address, no factory.
    await this.notifier.notify({
      to: { companyId: order.buyerCompanyId },
      type: 'ORDER_UPDATE',
      title: `${order.code}: with GarmentGate`,
      body: `Your goods reached GarmentGate’s hub and were checked in (${String(dto.cartonsReceived)} cartons).`,
      link: { orderCode: order.code },
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private livePickup(orderId: string) {
    return this.prisma.pickupRequest.findFirst({
      where: { orderId, status: { not: 'CANCELLED' } },
      include: { hub: true },
    });
  }

  private async factoryOrder(actor: ChatActor, code: string) {
    const order = await this.orders.load(actor, code);
    if (actorOf(actor) !== 'MANUFACTURER')
      throw new ForbiddenException('This is the factory’s view');
    return order;
  }
}
