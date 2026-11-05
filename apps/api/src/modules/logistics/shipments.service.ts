import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  type AdminShipment,
  type AdminShipmentRow,
  type CreateShipmentDto,
  dateOnly,
  documentTypesFor,
  insuredValue,
  isoDate,
  type LogisticsDocumentType,
  type ShipperMode,
  ShipperModeSchema,
  type UpdateLegDto,
  type UpdateShipmentDto,
  type ShipmentUploadKind,
} from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import type { Prisma, ShipmentLegKind } from '../../generated/prisma/client.js';
import { forwarderOf } from './logistics-params.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { money as formatAmount, postalAddress, type PoParty } from '../orders/purchase-order.js';
import {
  countryName,
  type DocumentData,
  renderCartonMarkings,
  renderLogisticsDocument,
  renderShippingLabel,
} from './logistics-documents.js';
import { LogisticsSettingsService } from './logistics-settings.service.js';
import { fileWithRenditions, MediaService } from '../media/media.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { StorageService } from '../storage/storage.service.js';

const shipmentInclude = {
  buyerCompany: {
    select: {
      legalName: true,
      addressLine1: true,
      addressLine2: true,
      postalCode: true,
      city: true,
      country: true,
      taxId: true,
      buyerProfile: { select: { publicCode: true } },
    },
  },
  originHub: true,
  consolidation: { select: { code: true } },
  orders: {
    where: { active: true },
    include: {
      order: {
        select: {
          code: true,
          title: true,
          quantity: true,
          hsCode: true,
          buyerUnitPriceMinor: true,
          currency: true,
          logisticsQuotes: {
            where: { status: 'ACCEPTED' },
            select: { forwarderName: true, forwarderContact: true, forwarderReference: true },
          },
          manufacturerProfile: {
            select: {
              publicCode: true,
              company: {
                select: {
                  legalName: true,
                  addressLine1: true,
                  addressLine2: true,
                  postalCode: true,
                  city: true,
                  country: true,
                },
              },
            },
          },
          packing: true,
        },
      },
    },
  },
  legs: {
    orderBy: { sequence: 'asc' },
    include: { partner: { select: { id: true, code: true, name: true } } },
  },
  documents: { orderBy: { createdAt: 'asc' } },
  events: { orderBy: { occurredAt: 'desc' } },
  uploads: {
    orderBy: { createdAt: 'desc' },
    include: {
      file: {
        select: {
          storageKey: true,
          originalFilename: true,
          status: true,
          mimeType: true,
          processingStatus: true,
        },
      },
      leg: { select: { sequence: true } },
    },
  },
} satisfies Prisma.LogisticsShipmentInclude;
type ShipmentRow = Prisma.LogisticsShipmentGetPayload<{ include: typeof shipmentInclude }>;

const DOC_PREFIX: Record<LogisticsDocumentType, string> = {
  COMMERCIAL_INVOICE: 'CI',
  PACKING_LIST: 'PL',
  BILL_OF_LADING: 'BL',
  ORIGINAL_BILL_OF_LADING: 'OBL',
  CERTIFICATE_OF_ORIGIN: 'CO',
  INSURANCE_CERTIFICATE: 'IC',
  SHIPPING_LABEL: 'SL',
  CARTON_MARKING: 'CM',
};
const DOC_TITLE: Record<LogisticsDocumentType, string> = {
  COMMERCIAL_INVOICE: 'COMMERCIAL INVOICE',
  PACKING_LIST: 'PACKING LIST',
  BILL_OF_LADING: 'BILL OF LADING',
  ORIGINAL_BILL_OF_LADING: 'BILL OF LADING (ORIGINAL)',
  CERTIFICATE_OF_ORIGIN: 'CERTIFICATE OF ORIGIN',
  INSURANCE_CERTIFICATE: 'CERTIFICATE OF INSURANCE',
  SHIPPING_LABEL: 'SHIPPING LABEL',
  CARTON_MARKING: 'CARTON MARKINGS',
};
const SEA_OR_AIR = new Set(['SEA_FCL', 'SEA_LCL', 'AIR', 'DDP']);
/** Delivered terms end at the buyer's door; the others at the destination port. */
const DOOR_TERMS = new Set(['DAP', 'DPU', 'DDP']);
const n = (v: bigint) => Number(v);
const kg = (g: number) => (g / 1000).toFixed(1);

/**
 * Staff build shipments from orders received at a hub (one buyer per shipment, enforced by a
 * database trigger), track their legs, and issue documents under the configured shipper mode.
 * Partner-facing papers (B/L, label, markings, packing list) consign "to order of GarmentGate";
 * only the buyer's commercial papers name the buyer, and only the staff-held original B/L of a
 * switch names the factory.
 */
@Injectable()
export class ShipmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly settings: LogisticsSettingsService,
    private readonly codes: PublicCodeService,
    private readonly audit: AuditService,
    private readonly config: ConfigService<Env, true>,
    private readonly storage: StorageService,
    private readonly notifier: Notifier,
    private readonly media: MediaService,
  ) {}

  async create(adminId: string, dto: CreateShipmentDto): Promise<{ code: string }> {
    const orders = await this.prisma.order.findMany({
      where: { code: { in: dto.orderCodes } },
      include: {
        logisticsQuotes: { where: { status: 'ACCEPTED' } },
        packing: true,
        hubReceipts: { orderBy: { receivedAt: 'desc' }, take: 1 },
        logisticsShipments: { where: { active: true } },
        manufacturerProfile: { select: { company: { select: { country: true } } } },
      },
    });
    if (orders.length !== dto.orderCodes.length) throw new NotFoundException('Order not found');
    const quotes = orders.map((o) => {
      const q = o.logisticsQuotes[0];
      if (!q) throw new ConflictException(`${o.code}: the buyer hasn’t chosen shipping`);
      if (o.logisticsShipments.length > 0)
        throw new ConflictException(`${o.code} is already on a shipment`);
      if (!o.hubReceipts[0]) throw new ConflictException(`${o.code} hasn’t arrived at a hub`);
      return q;
    });
    const [first] = orders;
    const [q0] = quotes;
    if (!first || !q0) throw new BadRequestException('Pick the orders');
    const same = (pick: (i: number) => unknown, what: string) => {
      if (orders.some((_, i) => pick(i) !== pick(0)))
        throw new ConflictException(`Orders on one shipment need the same ${what}`);
    };
    same((i) => orders[i]?.buyerCompanyId, 'buyer');
    same((i) => quotes[i]?.mode, 'mode');
    same((i) => quotes[i]?.incoterm, 'delivery terms');
    same((i) => quotes[i]?.destinationCountry, 'destination');
    same((i) => quotes[i]?.currency, 'currency');
    same((i) => orders[i]?.manufacturerProfile.company.country, 'origin country');
    // One hand-over goes to one forwarder.
    same((i) => quotes[i]?.forwarderName?.trim().toLowerCase() ?? null, 'forwarder');
    const hubId = dto.originHubId ?? first.hubReceipts[0]?.hubId ?? null;
    if (orders.some((o) => o.hubReceipts[0]?.hubId !== hubId))
      throw new ConflictException('All orders must be at the shipment’s hub');
    const hub = hubId ? await this.prisma.hub.findUnique({ where: { id: hubId } }) : null;

    const settings = await this.settings.get();
    const destinationPort = quotes.find((q) => q.destinationPort)?.destinationPort ?? null;
    const cargo = orders.map((o, i) => ({
      cartons: o.packing?.cartons ?? o.hubReceipts[0]?.cartonsReceived ?? 0,
      grossWeightGrams:
        o.hubReceipts[0]?.grossWeightGrams ??
        o.packing?.grossWeightGrams ??
        quotes[i]?.weightGrams ??
        0,
      volumeLitres: o.packing?.volumeLitres ?? quotes[i]?.volumeLitres ?? 0,
    }));
    const consolidationIds = new Set(quotes.map((q) => q.consolidationId));
    const legs = this.plannedLegs(
      q0.mode,
      q0.incoterm,
      hub?.code ?? null,
      hub?.port ?? null,
      destinationPort,
      q0.destinationCountry,
    );
    const year = new Date().getUTCFullYear();

    const shipment = await this.prisma.$transaction(async (tx) => {
      const code = await this.codes.sequential(`SHP-${String(year)}`, 5, tx);
      const created = await tx.logisticsShipment.create({
        data: {
          code,
          buyerCompanyId: first.buyerCompanyId,
          mode: q0.mode,
          incoterm: q0.incoterm,
          shipperMode: settings.shipperMode,
          originHubId: hubId,
          originCountry: first.manufacturerProfile.company.country,
          destinationCountry: q0.destinationCountry,
          destinationPort,
          consolidationId: consolidationIds.size === 1 ? ([...consolidationIds][0] ?? null) : null,
          currency: q0.currency,
          buyerPriceMinor: quotes.reduce((a, q) => a + q.freightMinor, 0n),
          partnerCostMinor: quotes.reduce((a, q) => a + q.partnerCostMinor, 0n),
          insuranceMinor: quotes.reduce((a, q) => a + q.insuranceMinor, 0n),
          cartons: cargo.reduce((a, c) => a + c.cartons, 0),
          grossWeightGrams: cargo.reduce((a, c) => a + c.grossWeightGrams, 0),
          volumeLitres: cargo.reduce((a, c) => a + c.volumeLitres, 0),
          etd: dto.etd ? dateOnly(dto.etd) : null,
          eta: dto.eta ? dateOnly(dto.eta) : null,
          createdById: adminId,
          orders: {
            create: orders.map((o, i) => ({
              orderId: o.id,
              cartons: cargo[i]?.cartons ?? 0,
              grossWeightGrams: cargo[i]?.grossWeightGrams ?? 0,
              volumeLitres: cargo[i]?.volumeLitres ?? 0,
              buyerShareMinor: quotes[i]?.freightMinor ?? 0n,
              costShareMinor: quotes[i]?.partnerCostMinor ?? 0n,
            })),
          },
          legs: { create: legs },
          events: {
            create: {
              source: 'SYSTEM',
              status: 'PLANNED',
              publicNote: 'Shipment planned by GarmentGate',
              location: hub ? countryName(hub.country) : null,
              occurredAt: new Date(),
              createdById: adminId,
            },
          },
        },
      });
      return created;
    });
    await this.audit.log({
      actorUserId: adminId,
      action: 'logistics.shipment_created',
      entityType: 'LogisticsShipment',
      entityId: shipment.id,
      metadata: { orders: dto.orderCodes },
    });
    return { code: shipment.code };
  }

  /** The legs a mode and incoterm need. The factory leg is already done (goods are at the hub). */
  private plannedLegs(
    mode: string,
    incoterm: string,
    hubCode: string | null,
    originPort: string | null,
    destinationPort: string | null,
    destinationCountry: string,
  ): Prisma.ShipmentLegCreateWithoutShipmentInput[] {
    const hub = hubCode ?? 'Origin hub';
    const destination = destinationPort ?? countryName(destinationCountry);
    const legs: { kind: ShipmentLegKind; from: string; to: string; status?: 'COMPLETED' }[] = [
      { kind: 'FACTORY_TO_HUB', from: 'Factory', to: hub, status: 'COMPLETED' },
    ];
    if (mode === 'HANDOVER')
      legs.push({ kind: 'HUB_HANDOVER', from: hub, to: 'Buyer’s forwarder' });
    else if (SEA_OR_AIR.has(mode)) {
      const port = originPort ?? 'Origin port';
      legs.push({ kind: 'HUB_TO_PORT', from: hub, to: port });
      legs.push({ kind: 'PORT_TO_PORT', from: port, to: destination });
      if (DOOR_TERMS.has(incoterm))
        legs.push({ kind: 'PORT_TO_BUYER', from: destination, to: 'Destination' });
    } else legs.push({ kind: 'PORT_TO_BUYER', from: hub, to: 'Destination' });
    return legs.map((l, i) => ({
      sequence: i + 1,
      kind: l.kind,
      fromLabel: l.from,
      toLabel: l.to,
      status: l.status ?? 'PENDING',
    }));
  }

  async list(): Promise<AdminShipmentRow[]> {
    const rows = await this.prisma.logisticsShipment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 500,
      include: {
        buyerCompany: {
          select: { legalName: true, buyerProfile: { select: { publicCode: true } } },
        },
        _count: { select: { orders: { where: { active: true } } } },
      },
    });
    return rows.map((s) => ({
      code: s.code,
      status: s.status,
      historical: s.historical,
      mode: s.mode,
      buyer: {
        code: s.buyerCompany.buyerProfile?.publicCode ?? '',
        name: s.buyerCompany.legalName,
      },
      originCountry: s.originCountry,
      destinationCountry: s.destinationCountry,
      destinationPort: s.destinationPort,
      currency: s.currency,
      buyerPriceMinor: n(s.buyerPriceMinor),
      partnerCostMinor: n(s.partnerCostMinor),
      marginMinor: n(s.buyerPriceMinor - s.partnerCostMinor),
      cartons: s.cartons,
      etd: s.etd ? isoDate(s.etd) : null,
      eta: s.eta ? isoDate(s.eta) : null,
      createdAt: s.createdAt.toISOString(),
      orders: s._count.orders,
    }));
  }

  async detail(code: string): Promise<AdminShipment> {
    const s = await this.load(code);
    // Staff download partner uploads through short-lived links (sanitized copies come from the media worker).
    const urls = await Promise.all(
      s.uploads.map((u) =>
        u.file.status === 'UPLOADED'
          ? this.storage.presignDownload(u.file.storageKey, u.file.originalFilename)
          : Promise.resolve(null),
      ),
    );
    return this.view(s, urls);
  }

  async update(adminId: string, code: string, dto: UpdateShipmentDto): Promise<void> {
    const s = await this.load(code);
    if (s.historical)
      throw new ConflictException(
        'This is a historical shipment (shipped on the factory’s booking): it can’t change',
      );
    if (['DELIVERED', 'CANCELLED'].includes(s.status))
      throw new ConflictException('This shipment is closed');
    if (dto.status === 'CANCELLED' && s.departedAt)
      throw new ConflictException('The goods have left: it can’t be cancelled');
    await this.prisma.$transaction(async (tx) => {
      await tx.logisticsShipment.update({
        where: { id: s.id },
        data: {
          ...(dto.status && { status: dto.status }),
          ...(dto.etd !== undefined && { etd: dto.etd ? dateOnly(dto.etd) : null }),
          ...(dto.eta !== undefined && { eta: dto.eta ? dateOnly(dto.eta) : null }),
        },
      });
      // A cancelled shipment frees its orders for another one.
      if (dto.status === 'CANCELLED')
        await tx.logisticsShipmentOrder.updateMany({
          where: { shipmentId: s.id },
          data: { active: false },
        });
      if (dto.status && dto.status !== s.status)
        await tx.shipmentEvent.create({
          data: {
            shipmentId: s.id,
            source: 'STAFF',
            status: dto.status,
            publicNote:
              dto.status === 'BOOKED'
                ? 'Space booked with the carrier'
                : dto.status === 'CANCELLED'
                  ? 'Shipment cancelled'
                  : null,
            occurredAt: new Date(),
            createdById: adminId,
          },
        });
    });
    await this.audit.log({
      actorUserId: adminId,
      action: 'logistics.shipment_updated',
      entityType: 'LogisticsShipment',
      entityId: s.id,
      metadata: { ...(dto.status && { status: dto.status }) },
    });
  }

  async updateLeg(adminId: string, code: string, legId: string, dto: UpdateLegDto): Promise<void> {
    const s = await this.load(code);
    if (s.historical)
      throw new ConflictException(
        'This is a historical shipment (shipped on the factory’s booking): it can’t change',
      );
    const leg = s.legs.find((l) => l.id === legId);
    if (!leg) throw new NotFoundException('Leg not found');
    if (dto.partnerId) {
      const partner = await this.prisma.logisticsPartner.findFirst({
        where: { id: dto.partnerId, active: true },
      });
      if (!partner) throw new NotFoundException('Partner not found');
    }
    await this.prisma.shipmentLeg.update({
      where: { id: leg.id },
      data: {
        ...(dto.status && { status: dto.status }),
        ...(dto.partnerId !== undefined && { partnerId: dto.partnerId }),
        ...(dto.carrier !== undefined && { carrier: dto.carrier }),
        ...(dto.trackingNumber !== undefined && { trackingNumber: dto.trackingNumber }),
        ...(dto.containerNumber !== undefined && { containerNumber: dto.containerNumber }),
        ...(dto.transportDocNo !== undefined && { transportDocNo: dto.transportDocNo }),
        ...(dto.costMinor !== undefined && {
          costMinor: dto.costMinor === null ? null : BigInt(dto.costMinor),
        }),
        ...(dto.etd !== undefined && { etd: dto.etd ? dateOnly(dto.etd) : null }),
        ...(dto.eta !== undefined && { eta: dto.eta ? dateOnly(dto.eta) : null }),
      },
    });
    // Once every leg has a cost, the shipment's partner cost is their sum.
    const legs = await this.prisma.shipmentLeg.findMany({
      where: { shipmentId: s.id, kind: { not: 'FACTORY_TO_HUB' } },
    });
    if (legs.every((l) => l.costMinor !== null))
      await this.prisma.logisticsShipment.update({
        where: { id: s.id },
        data: { partnerCostMinor: legs.reduce((a, l) => a + (l.costMinor ?? 0n), 0n) },
      });
    // A partner newly given this leg hears about it (GarmentGate is the only customer they see).
    if (dto.partnerId && dto.partnerId !== leg.partner?.id) {
      const users = await this.prisma.user.findMany({
        where: { logisticsPartnerId: dto.partnerId, status: 'ACTIVE' },
        select: { id: true },
      });
      if (users.length > 0)
        await this.notifier.notify({
          to: { userIds: users.map((u) => u.id) },
          type: 'ORDER_UPDATE',
          title: `New booking ${s.code}`,
          body: `GarmentGate booked you for ${leg.fromLabel} → ${leg.toLabel}. Accept it in your partner portal.`,
        });
    }
    await this.audit.log({
      actorUserId: adminId,
      action: 'logistics.leg_updated',
      entityType: 'ShipmentLeg',
      entityId: leg.id,
    });
  }

  /** Renders a document for the shipment and records its number. */
  async document(
    adminId: string,
    code: string,
    type: LogisticsDocumentType,
  ): Promise<{ file: Buffer; name: string }> {
    const s = await this.load(code);
    const shipperMode = ShipperModeSchema.parse(s.shipperMode);
    if (
      !documentTypesFor(shipperMode, { mode: s.mode, insured: s.insuranceMinor > 0n }).includes(
        type,
      )
    )
      throw new BadRequestException('This shipper mode doesn’t issue that document');
    const number = `${s.code}-${DOC_PREFIX[type]}`;
    const file = await this.render(s, type, number, shipperMode);
    // Recorded once; concurrent requests for the same document must not race on the number.
    await this.prisma.logisticsDocument.createMany({
      data: [{ shipmentId: s.id, type, number, issuedById: adminId }],
      skipDuplicates: true,
    });
    return { file, name: `${number}.pdf` };
  }

  // ── Documents ─────────────────────────────────────────────────────────────

  private platform(): PoParty {
    return {
      role: 'Shipper / Exporter',
      name: this.config.get('PLATFORM_LEGAL_NAME', { infer: true }),
      lines: [
        this.config.get('PLATFORM_ADDRESS', { infer: true }),
        this.config.get('PLATFORM_EMAIL', { infer: true }),
      ],
    };
  }

  /** Partner-facing consignee: the goods are held to GarmentGate's order, not the buyer's name. */
  private toOrder(): PoParty {
    const name = this.config.get('PLATFORM_LEGAL_NAME', { infer: true });
    return {
      role: 'Consignee',
      name: `To order of ${name}`,
      lines: [
        'Notify: GarmentGate destination desk',
        this.config.get('PLATFORM_EMAIL', { infer: true }),
      ],
    };
  }

  private buyerParty(s: ShipmentRow, role: string): PoParty {
    const b = s.buyerCompany;
    return {
      role,
      name: b.legalName,
      lines: [...postalAddress(b), ...(b.taxId ? [`Tax ID ${b.taxId}`] : [])],
    };
  }

  private async render(
    s: ShipmentRow,
    type: LogisticsDocumentType,
    number: string,
    shipperMode: ShipperMode,
  ): Promise<Buffer> {
    const destination = `${s.destinationPort ? `${s.destinationPort}, ` : ''}${countryName(s.destinationCountry)}`;
    if (type === 'SHIPPING_LABEL')
      return renderShippingLabel({
        shipmentCode: s.code,
        shipper: this.platform(),
        consignee: this.toOrder(),
        destination,
        mode: s.mode.replace('_', ' '),
        cartons: s.cartons,
        grossWeightGrams: s.grossWeightGrams,
        originHub: s.originHub?.code ?? null,
      });
    if (type === 'CARTON_MARKING')
      return renderCartonMarkings({
        reference: s.code,
        referenceLabel: 'SHIPMENT',
        heading: 'DESTINATION',
        hub: {
          code: s.destinationPort ?? s.destinationCountry,
          name: countryName(s.destinationCountry),
          lines: [`To order of ${this.config.get('PLATFORM_LEGAL_NAME', { infer: true })}`],
        },
        cartons: Math.max(1, s.cartons),
        piecesPerCarton: null,
        grossWeightGramsPerCarton: s.cartons ? Math.round(s.grossWeightGrams / s.cartons) : null,
        originCountry: s.originCountry,
      });

    const lastLeg = s.legs.findLast((l) => l.kind === 'PORT_TO_PORT') ?? s.legs.at(-1);
    const details: [string, string][] = [
      ['Shipment', s.code],
      ['Mode', s.mode.replace('_', ' ')],
      ['Terms', `${s.incoterm} ${destination}`],
      ['Origin', countryName(s.originCountry)],
      ['Cartons', String(s.cartons)],
      ['Gross weight', `${kg(s.grossWeightGrams)} kg`],
      ['Volume', `${(s.volumeLitres / 1000).toFixed(2)} CBM`],
      ['Vessel / flight', lastLeg?.carrier ?? 'to be confirmed'],
      ['B/L or AWB', lastLeg?.transportDocNo ?? 'to be confirmed'],
      ['Container', lastLeg?.containerNumber ?? '—'],
      ['ETD', s.etd ? isoDate(s.etd) : 'to be confirmed'],
      ['ETA', s.eta ? isoDate(s.eta) : 'to be confirmed'],
    ];
    const lines = s.orders.map((so) => so.order);
    const money = (minor: bigint) => formatAmount(Number(minor), s.currency);
    const base = { number, issuedAt: new Date(), references: [`Shipment ${s.code}`], details };
    const goodsLine = (o: (typeof lines)[number]) =>
      `${o.title}${o.hsCode ? ` (HS ${o.hsCode})` : ''}`;

    const data: DocumentData = (() => {
      switch (type) {
        case 'COMMERCIAL_INVOICE': {
          // The buyer's invoice from GarmentGate, at the buyer's price. No factory.
          const goods = lines.reduce(
            (a, o) => a + BigInt(o.buyerUnitPriceMinor) * BigInt(o.quantity),
            0n,
          );
          const charged = ['CIF', 'CIP', 'CFR', 'CPT', 'DAP', 'DPU', 'DDP'].includes(s.incoterm);
          return {
            ...base,
            title: DOC_TITLE[type],
            parties: [
              { ...this.platform(), role: 'Seller / Exporter' },
              this.buyerParty(s, 'Buyer / Importer'),
            ],
            table: {
              headers: ['Description', 'Order', 'Qty', 'Unit price', 'Amount'],
              widths: [4, 2, 1, 1.4, 1.6],
              rows: lines.map((o) => [
                goodsLine(o),
                o.code,
                String(o.quantity),
                money(BigInt(o.buyerUnitPriceMinor)),
                money(BigInt(o.buyerUnitPriceMinor) * BigInt(o.quantity)),
              ]),
              totals: [
                charged
                  ? `Goods ${money(goods)} + freight ${money(s.buyerPriceMinor)} + insurance ${money(s.insuranceMinor)}`
                  : 'Total',
                '',
                '',
                '',
                money(goods + (charged ? s.buyerPriceMinor + s.insuranceMinor : 0n)),
              ],
            },
            notes: [
              `Country of origin: ${countryName(s.originCountry)}.`,
              'Issued by GarmentGate as seller and exporter.',
            ],
          };
        }
        case 'PACKING_LIST':
          return {
            ...base,
            title: DOC_TITLE[type],
            parties: [this.platform(), this.toOrder()],
            table: {
              // Partners get this too: lots, not order codes (SHP-… is the only reference).
              headers: ['Lot', 'Description', 'Cartons', 'Pcs', 'Gross kg', 'CBM'],
              widths: [1, 5, 1, 1, 1.2, 1],
              rows: s.orders.map((so, i) => [
                String(i + 1),
                so.order.title,
                String(so.cartons),
                String(so.order.quantity),
                kg(so.grossWeightGrams),
                (so.volumeLitres / 1000).toFixed(2),
              ]),
              totals: [
                '',
                'Total',
                String(s.cartons),
                String(lines.reduce((a, o) => a + o.quantity, 0)),
                kg(s.grossWeightGrams),
                (s.volumeLitres / 1000).toFixed(2),
              ],
            },
            notes: ['Marks: GarmentGate / shipment code / carton number of total.'],
          };
        case 'BILL_OF_LADING':
        case 'ORIGINAL_BILL_OF_LADING': {
          // The switched (or only) B/L names GarmentGate; the original of a switch names the factory.
          const factory = lines[0]?.manufacturerProfile.company;
          const shipper =
            type === 'ORIGINAL_BILL_OF_LADING' && factory
              ? { role: 'Shipper', name: factory.legalName, lines: postalAddress(factory) }
              : { ...this.platform(), role: 'Shipper' };
          return {
            ...base,
            title: DOC_TITLE[type],
            parties: [shipper, this.toOrder()],
            table: {
              headers: ['Marks and description', 'Cartons', 'Gross kg', 'CBM'],
              widths: [5, 1, 1.2, 1],
              rows: [
                [
                  `GarmentGate ${s.code}: garments`,
                  String(s.cartons),
                  kg(s.grossWeightGrams),
                  (s.volumeLitres / 1000).toFixed(2),
                ],
              ],
            },
            notes:
              type === 'ORIGINAL_BILL_OF_LADING'
                ? [
                    'STAFF ONLY. Surrendered to the carrier in exchange for the switched bill of lading naming GarmentGate.',
                  ]
                : [
                    shipperMode === 'SWITCH_BL'
                      ? 'Switched bill of lading.'
                      : 'House bill of lading issued for GarmentGate.',
                  ],
          };
        }
        case 'CERTIFICATE_OF_ORIGIN':
          return {
            ...base,
            title: DOC_TITLE[type],
            parties: [this.platform(), this.buyerParty(s, 'Consignee')],
            table: {
              headers: ['Description', 'Order', 'Qty'],
              widths: [5, 2, 1],
              rows: lines.map((o) => [goodsLine(o), o.code, String(o.quantity)]),
            },
            notes: [`The goods described were manufactured in ${countryName(s.originCountry)}.`],
          };
        case 'INSURANCE_CERTIFICATE': {
          const goods = lines.reduce(
            (a, o) => a + BigInt(o.buyerUnitPriceMinor) * BigInt(o.quantity),
            0n,
          );
          const insured = insuredValue(goods + s.buyerPriceMinor);
          return {
            ...base,
            title: DOC_TITLE[type],
            parties: [{ ...this.platform(), role: 'Assured' }, this.buyerParty(s, 'Loss payee')],
            table: {
              headers: ['Cover', 'Insured value', 'Premium'],
              widths: [4, 2, 2],
              rows: [
                [
                  'Institute Cargo Clauses (A), warehouse to warehouse',
                  money(insured),
                  money(s.insuranceMinor),
                ],
              ],
            },
            notes: ['Insured for 110% of the CIF value under GarmentGate’s open cargo policy.'],
          };
        }
        default:
          throw new BadRequestException('Unknown document');
      }
    })();
    return renderLogisticsDocument(data);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private async load(code: string): Promise<ShipmentRow> {
    const s = await this.prisma.logisticsShipment.findUnique({
      where: { code },
      include: shipmentInclude,
    });
    if (!s) throw new NotFoundException('Shipment not found');
    return s;
  }

  /**
   * Staff publish (or hide) a partner's upload for the buyer: only once the media worker has
   * sanitized it (PDF) or rendered it (photo). The buyer gets it under a neutral name.
   */
  async publishUpload(
    adminId: string,
    code: string,
    uploadId: string,
    buyerVisible: boolean,
  ): Promise<void> {
    const upload = await this.prisma.shipmentUpload.findFirst({
      where: { id: uploadId, shipment: { code } },
      include: {
        file: { select: { processingStatus: true } },
        shipment: {
          select: {
            code: true,
            buyerCompanyId: true,
            orders: { take: 1, include: { order: { select: { code: true } } } },
          },
        },
      },
    });
    if (!upload) throw new NotFoundException('Upload not found');
    if (buyerVisible && upload.file.processingStatus !== 'READY')
      throw new ConflictException('Wait until the file has been cleaned, then publish it');
    await this.prisma.shipmentUpload.update({
      where: { id: upload.id },
      data: buyerVisible
        ? { buyerVisible: true, publishedAt: new Date(), publishedById: adminId }
        : { buyerVisible: false },
    });
    await this.audit.log({
      actorUserId: adminId,
      action: buyerVisible ? 'logistics.upload_published' : 'logistics.upload_hidden',
      entityType: 'ShipmentUpload',
      entityId: upload.id,
      metadata: { shipment: code, kind: upload.kind },
    });
    const orderCode = upload.shipment.orders[0]?.order.code;
    if (buyerVisible && orderCode)
      await this.notifier.notify({
        to: { companyId: upload.shipment.buyerCompanyId },
        type: 'ORDER_UPDATE',
        title: `${orderCode}: a shipping paper is ready`,
        body: 'GarmentGate added a document to your shipment tracking.',
        link: { orderCode },
      });
  }

  /** Published uploads for the buyer: sanitized PDFs or photo renditions, neutrally named. */
  async buyerPapers(
    shipmentId: string,
  ): Promise<{ id: string; kind: ShipmentUploadKind; name: string; url: string | null }[]> {
    const rows = await this.prisma.shipmentUpload.findMany({
      where: { shipmentId, buyerVisible: true },
      orderBy: { createdAt: 'asc' },
      include: { file: fileWithRenditions, shipment: { select: { code: true } } },
    });
    const counts = new Map<string, number>();
    return Promise.all(
      rows.map(async (u) => {
        const n = (counts.get(u.kind) ?? 0) + 1;
        counts.set(u.kind, n);
        const pdf = u.file.mimeType === 'application/pdf';
        const name = `${u.shipment.code}-${u.kind.toLowerCase().replaceAll('_', '-')}-${String(n)}.${pdf ? 'pdf' : 'webp'}`;
        const url = pdf
          ? u.file.processingStatus === 'READY' && u.file.sanitizedKey
            ? await this.storage.presignDownload(u.file.sanitizedKey, name)
            : null
          : ((await this.media.urls(u.file))?.large ?? null);
        return { id: u.id, kind: u.kind, name, url };
      }),
    );
  }

  private view(s: ShipmentRow, uploadUrls: (string | null)[] = []): AdminShipment {
    const shipperMode = ShipperModeSchema.parse(s.shipperMode);
    return {
      code: s.code,
      status: s.status,
      historical: s.historical,
      mode: s.mode,
      incoterm: s.incoterm,
      shipperMode,
      buyer: {
        code: s.buyerCompany.buyerProfile?.publicCode ?? '',
        name: s.buyerCompany.legalName,
      },
      originHub: s.originHub ? { code: s.originHub.code, name: s.originHub.name } : null,
      originCountry: s.originCountry,
      destinationCountry: s.destinationCountry,
      destinationPort: s.destinationPort,
      consolidationCode: s.consolidation?.code ?? null,
      currency: s.currency,
      buyerPriceMinor: n(s.buyerPriceMinor),
      partnerCostMinor: n(s.partnerCostMinor),
      insuranceMinor: n(s.insuranceMinor),
      marginMinor: n(s.buyerPriceMinor - s.partnerCostMinor),
      cartons: s.cartons,
      grossWeightGrams: s.grossWeightGrams,
      volumeLitres: s.volumeLitres,
      etd: s.etd ? isoDate(s.etd) : null,
      eta: s.eta ? isoDate(s.eta) : null,
      orders: s.orders.map((so) => ({
        code: so.order.code,
        manufacturer: {
          code: so.order.manufacturerProfile.publicCode,
          name: so.order.manufacturerProfile.company.legalName,
        },
        cartons: so.cartons,
        grossWeightGrams: so.grossWeightGrams,
        volumeLitres: so.volumeLitres,
        buyerShareMinor: n(so.buyerShareMinor),
        forwarder: so.order.logisticsQuotes[0] ? forwarderOf(so.order.logisticsQuotes[0]) : null,
        costShareMinor: n(so.costShareMinor),
      })),
      legs: s.legs.map((l) => ({
        id: l.id,
        sequence: l.sequence,
        kind: l.kind,
        status: l.status,
        partner: l.partner,
        fromLabel: l.fromLabel,
        toLabel: l.toLabel,
        carrier: l.carrier,
        trackingNumber: l.trackingNumber,
        containerNumber: l.containerNumber,
        transportDocNo: l.transportDocNo,
        costMinor: l.costMinor === null ? null : n(l.costMinor),
        etd: l.etd ? isoDate(l.etd) : null,
        eta: l.eta ? isoDate(l.eta) : null,
        accepted: l.acceptedAt !== null,
        paid: l.paidAt !== null,
      })),
      events: s.events.map((e) => ({
        occurredAt: e.occurredAt.toISOString(),
        status: e.status,
        source: e.source,
        location: e.location,
        publicNote: e.publicNote,
        internalNote: e.internalNote,
      })),
      uploads: s.uploads.map((u, i) => ({
        id: u.id,
        kind: u.kind,
        fileName: u.file.originalFilename,
        legSequence: u.leg?.sequence ?? null,
        url: uploadUrls[i] ?? null,
        ready: u.file.processingStatus === 'READY',
        buyerVisible: u.buyerVisible,
        createdAt: u.createdAt.toISOString(),
      })),
      departedAt: s.departedAt?.toISOString() ?? null,
      deliveredAt: s.deliveredAt?.toISOString() ?? null,
      documents: s.documents.map((d) => ({
        type: d.type,
        number: d.number,
        createdAt: d.createdAt.toISOString(),
      })),
      documentTypes: documentTypesFor(shipperMode, {
        mode: s.mode,
        insured: s.insuranceMinor > 0n,
      }),
      createdAt: s.createdAt.toISOString(),
    };
  }
}
