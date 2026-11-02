import {
  acceptanceNumber,
  AqlLevelSchema,
  type AdminOrder,
  type BuyerOrder,
  flowProgress,
  GENERATED_DOCUMENT_TYPES,
  type OrderInspection,
  type OrderShipment,
  paymentPlan,
  type ManufacturerOrder,
  type MilestoneStage,
  type OrderActor,
  allowedTransitions,
  type OrderMedia,
  PRODUCTION_STAGES,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { identityForScrubbing } from '../catalog/catalog.queries.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import { fileWithRenditions } from '../media/media.service.js';

const companyIdentity = {
  select: {
    id: true,
    ...identityForScrubbing.select,
    addressLine1: true,
    city: true,
    addressLine2: true,
    postalCode: true,
    registrationNumber: true,
    taxId: true,
  },
} satisfies Prisma.CompanyDefaultArgs;

export const orderInclude = {
  buyerCompany: {
    select: { ...companyIdentity.select, buyerProfile: { select: { publicCode: true } } },
  },
  manufacturerProfile: { select: { id: true, publicCode: true, company: companyIdentity } },
  rfq: { select: { code: true } },
  reorderOf: { select: { code: true } },
  items: { orderBy: [{ color: 'asc' }, { size: 'asc' }] },
  samples: {
    orderBy: [{ round: 'asc' }, { createdAt: 'asc' }],
    include: { photos: { include: { file: fileWithRenditions }, orderBy: { createdAt: 'asc' } } },
  },
  milestones: {
    include: { photos: { include: { file: fileWithRenditions }, orderBy: { createdAt: 'asc' } } },
  },
  events: {
    orderBy: { createdAt: 'asc' },
    include: { actor: { select: { firstName: true, lastName: true, role: true } } },
  },
  inspections: {
    orderBy: { createdAt: 'asc' },
    include: {
      photos: { include: { file: fileWithRenditions }, orderBy: { createdAt: 'asc' } },
      reportFile: { select: { id: true, processingStatus: true, sanitizedKey: true } },
      inspector: { select: { firstName: true, lastName: true } },
      bookedBy: { select: { role: true } },
    },
  },
  shipments: {
    orderBy: { createdAt: 'desc' },
    take: 1,
    include: {
      documents: {
        orderBy: { createdAt: 'asc' },
        include: { file: { select: { processingStatus: true, sanitizedKey: true } } },
      },
    },
  },
  payments: {
    where: { direction: 'INBOUND', status: 'SUCCEEDED', purpose: 'BALANCE' },
    select: { amountMinor: true },
  },
} satisfies Prisma.OrderInclude;
export type OrderRow = Prisma.OrderGetPayload<{ include: typeof orderInclude }>;

type MediaRow =
  | OrderRow['milestones'][number]['photos'][number]
  | OrderRow['samples'][number]['photos'][number]
  | OrderRow['inspections'][number]['photos'][number];
/** Signed links per file id (renditions, a sanitized video or PDF), resolved by the service. */
export type MediaLinks = ReadonlyMap<
  string,
  Pick<OrderMedia, 'urls' | 'videoUrl'> & { documentUrl?: string | null }
>;

/** Neutral download names: nothing from the uploader's file name. */
export const documentName = (orderCode: string, type: string, index = 0): string =>
  `${orderCode}-${type.toLowerCase().replace(/_/g, '-')}${index > 0 ? `-${String(index + 1)}` : ''}.pdf`;

/** Whether the buyer's balance has fully arrived. */
export function balancePaid(
  order: Pick<OrderRow, 'payments' | 'buyerUnitPriceMinor' | 'quantity' | 'depositBps'>,
): boolean {
  const { balance } = paymentPlan(
    BigInt(order.buyerUnitPriceMinor) * BigInt(order.quantity),
    order.depositBps,
  );
  return order.payments.reduce((sum, p) => sum + p.amountMinor, 0n) >= balance;
}

/** The latest final (pre-shipment) inspection, if any. */
export function finalInspection(order: Pick<OrderRow, 'inspections'>) {
  return order.inspections.filter((i) => i.type === 'PRE_SHIPMENT').at(-1) ?? null;
}

const STAGE_ORDER: readonly string[] = PRODUCTION_STAGES;

export type Audience = 'BUYER' | 'MANUFACTURER' | 'ADMIN';

function mediaView(m: MediaRow, links: MediaLinks, caption: string | null): OrderMedia {
  const link = links.get(m.fileId);
  return {
    id: m.id,
    kind: m.file.mimeType.startsWith('video/') ? 'VIDEO' : 'IMAGE',
    urls: link?.urls ?? null,
    videoUrl: link?.videoUrl ?? null,
    caption,
    processing: m.file.processingStatus ?? 'PENDING',
    review: m.reviewStatus,
  };
}

/** Production progress within the flow: each completed stage moves the bar on. */
export function progressOf(
  order: Pick<OrderRow, 'status'> & { milestones: { stage: string; status: string }[] },
): number {
  const base = flowProgress(order.status);
  if (order.status !== 'IN_PRODUCTION') return base;
  const done = order.milestones.filter(
    (m) => STAGE_ORDER.includes(m.stage) && m.status === 'COMPLETED',
  ).length;
  const step = flowProgress('QC') - base;
  return Math.round(base + (step * done) / PRODUCTION_STAGES.length);
}

export function currentStage(order: {
  milestones: { stage: MilestoneStage; status: string }[];
}): MilestoneStage | null {
  const production = order.milestones
    .filter((m) => STAGE_ORDER.includes(m.stage))
    .sort((a, b) => STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage));
  return (
    production.find((m) => m.status === 'IN_PROGRESS' || m.status === 'DELAYED')?.stage ??
    production.find((m) => m.status === 'PENDING')?.stage ??
    null
  );
}

type InspectionRow = OrderRow['inspections'][number];
type NamePatterns = ReturnType<typeof identityPatterns>;

/** An inspection as an audience may see it (inspectors get the staff view). */
export function inspectionView(
  i: InspectionRow,
  audience: Audience,
  links: MediaLinks,
  names: { buyerNames: NamePatterns; factoryNames: NamePatterns },
): OrderInspection {
  const { buyerNames, factoryNames } = names;
  const majorAql = AqlLevelSchema.safeParse(i.aqlMajor);
  const minorAql = AqlLevelSchema.safeParse(i.aqlMinor);
  const report = i.reportFile;
  return {
    id: i.id,
    type: i.type,
    result: i.result,
    scheduledAt: i.scheduledAt?.toISOString() ?? null,
    inspectedAt: i.inspectedAt?.toISOString() ?? null,
    bookedBy: !i.bookedBy ? 'PLATFORM' : i.bookedBy.role === 'BUYER' ? 'BUYER' : 'STAFF',
    inspector:
      audience === 'ADMIN' && i.inspector
        ? `${i.inspector.firstName} ${i.inspector.lastName}`
        : null,
    aql:
      i.lotSize && i.sampleSize && majorAql.success && minorAql.success
        ? {
            lotSize: i.lotSize,
            sampleSize: i.sampleSize,
            majorAql: majorAql.data,
            minorAql: minorAql.data,
            acceptMajor: acceptanceNumber(i.sampleSize, majorAql.data),
            acceptMinor: acceptanceNumber(i.sampleSize, minorAql.data),
          }
        : null,
    defects:
      i.result === 'PENDING'
        ? null
        : {
            critical: i.criticalDefects ?? 0,
            major: i.majorDefects ?? 0,
            minor: i.minorDefects ?? 0,
          },
    // Written by our inspector at the factory: keep each side's names away from the other.
    summary:
      audience === 'BUYER'
        ? scrubText(i.summary, factoryNames)
        : audience === 'MANUFACTURER'
          ? scrubText(i.summary, buyerNames)
          : i.summary,
    // Factory signage and labels can show up: buyers get approved photos only.
    photos: i.photos
      .filter((p) =>
        audience === 'BUYER'
          ? p.reviewStatus === 'APPROVED' && p.file.processingStatus === 'READY'
          : p.file.processingStatus === 'READY',
      )
      .map((p) =>
        mediaView(p, links, audience === 'BUYER' ? scrubText(p.caption, factoryNames) : p.caption),
      ),
    reportUrl:
      audience !== 'BUYER' && report?.processingStatus === 'READY'
        ? (links.get(report.id)?.documentUrl ?? null)
        : null,
  };
}

/**
 * One order as an audience may see it. Buyers: GarmentGate's price, the factory's code,
 * approved factory media only. Factories: their own price, the buyer's code, free text scrubbed
 * of the buyer's identity, approved buyer photos only. Staff: everything.
 */
function core(order: OrderRow, audience: Audience, links: MediaLinks) {
  const buyerNames = identityPatterns(identityOf(order.buyerCompany));
  const factoryNames = identityPatterns(identityOf(order.manufacturerProfile.company));
  // Text written by the other side, as this audience may read it.
  const fromBuyer = (text: string | null, filtered: string | null) =>
    audience === 'MANUFACTURER'
      ? scrubText(filtered ?? text, buyerNames)
      : audience === 'ADMIN'
        ? text
        : text;
  const fromFactory = (text: string | null, filtered: string | null) =>
    audience === 'BUYER' ? scrubText(filtered ?? text, factoryNames) : text;
  const visible = (m: MediaRow, owner: 'BUYER' | 'MANUFACTURER') =>
    audience === 'ADMIN' ||
    audience === owner ||
    (m.reviewStatus === 'APPROVED' && m.file.processingStatus === 'READY');

  const inspections = order.inspections.map((i) =>
    inspectionView(i, audience, links, { buyerNames, factoryNames }),
  );

  const actorLabel = (a: OrderRow['events'][number]['actor']) =>
    a ? `${a.firstName} ${a.lastName}${a.role === 'ADMIN' ? ' (GarmentGate)' : ''}` : 'System';
  const latestShipment = order.shipments[0];

  return {
    code: order.code,
    title:
      audience === 'MANUFACTURER'
        ? (scrubText(order.title, buyerNames) ?? order.code)
        : order.title,
    specification:
      audience === 'MANUFACTURER'
        ? scrubText(order.specification, buyerNames)
        : order.specification,
    status: order.status,
    quantity: order.quantity,
    currency: order.currency,
    incoterm: order.incoterm,
    destinationCountry: order.destinationCountry,
    destinationPort: order.destinationPort,
    depositBps: order.depositBps,
    requestedShipDate: order.requestedShipDate?.toISOString() ?? null,
    createdAt: order.createdAt.toISOString(),
    confirmedAt: order.confirmedAt?.toISOString() ?? null,
    completedAt: order.completedAt?.toISOString() ?? null,
    cancelledAt: order.cancelledAt?.toISOString() ?? null,
    rfqCode: order.rfq?.code ?? null,
    reorderOfCode: order.reorderOf?.code ?? null,
    progressPercent: progressOf(order),
    samples: order.samples.map((s) => ({
      id: s.id,
      round: s.round,
      status: s.status,
      quantity: s.quantity,
      requestNotes: fromBuyer(s.requestNotes, s.requestNotesFiltered),
      courier: s.courier,
      trackingNumber: s.trackingNumber,
      requestedAt: s.createdAt.toISOString(),
      shippedAt: s.shippedAt?.toISOString() ?? null,
      decidedAt: s.decidedAt?.toISOString() ?? null,
      feedback: fromBuyer(s.buyerFeedback, s.buyerFeedbackFiltered),
      photos: s.photos.filter((p) => visible(p, 'BUYER')).map((p) => mediaView(p, links, null)),
    })),
    milestones: order.milestones
      .filter((m) => STAGE_ORDER.includes(m.stage))
      .sort((a, b) => STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage))
      .map((m) => ({
        stage: m.stage,
        status: m.status,
        plannedAt: m.plannedAt?.toISOString() ?? null,
        completedAt: m.completedAt?.toISOString() ?? null,
        note: fromFactory(m.note, m.noteFiltered),
        media: m.photos
          .filter((p) => visible(p, 'MANUFACTURER'))
          .map((p) => mediaView(p, links, fromFactory(p.caption, p.caption))),
      })),
    events: order.events.map((e) => ({
      from: e.fromStatus,
      to: e.toStatus,
      at: e.createdAt.toISOString(),
      actor: audience === 'ADMIN' ? actorLabel(e.actor) : null,
      note: audience === 'ADMIN' ? e.note : null,
    })),
    inspections,
    shipment: latestShipment
      ? shipmentView(latestShipment, order.code, audience, links, fromFactory)
      : null,
    balancePaid: balancePaid(order),
    allowedTransitions: allowedTransitions(order.status, audience satisfies OrderActor),
  };
}

function shipmentView(
  shipment: OrderRow['shipments'][number],
  orderCode: string,
  audience: Audience,
  links: MediaLinks,
  fromFactory: (text: string | null, filtered: string | null) => string | null,
): OrderShipment {
  const iso = (d: Date | null) => d?.toISOString() ?? null;
  const seen = new Map<string, number>();
  return {
    status: shipment.status,
    mode: shipment.mode,
    incoterm: shipment.incoterm,
    forwarder: fromFactory(shipment.forwarder, shipment.forwarder),
    carrier: fromFactory(shipment.carrier, shipment.carrier),
    trackingNumber: shipment.trackingNumber,
    containerNumber: shipment.containerNumber,
    transportDocNo: shipment.transportDocNo,
    originPort: shipment.originPort,
    destinationPort: shipment.destinationPort,
    cartons: shipment.cartons,
    grossWeightKg: shipment.grossWeightKg,
    etd: iso(shipment.etd),
    eta: iso(shipment.eta),
    shippedAt: iso(shipment.shippedAt),
    deliveredAt: iso(shipment.deliveredAt),
    // Uploaded papers usually name the factory: buyers see only those staff have published.
    documents: shipment.documents
      .filter(
        (d) => audience !== 'BUYER' || (d.buyerVisible && d.file.processingStatus === 'READY'),
      )
      .map((d) => {
        const index = seen.get(d.type) ?? 0;
        seen.set(d.type, index + 1);
        return {
          id: d.id,
          type: d.type,
          name: documentName(orderCode, d.type, index),
          url:
            d.file.processingStatus === 'READY' ? (links.get(d.fileId)?.documentUrl ?? null) : null,
          processing: d.file.processingStatus ?? 'PENDING',
          buyerVisible: d.buyerVisible,
        };
      }),
    // GarmentGate's own papers carry the buyer's prices and name: never for the factory.
    generatedDocuments: audience === 'MANUFACTURER' ? [] : [...GENERATED_DOCUMENT_TYPES],
  };
}

const buyerCode = (o: OrderRow) => o.buyerCompany.buyerProfile?.publicCode ?? 'BYR';

export function buyerOrderView(order: OrderRow, links: MediaLinks): BuyerOrder {
  const total = order.buyerUnitPriceMinor * order.quantity;
  return {
    ...core(order, 'BUYER', links),
    manufacturerCode: order.manufacturerProfile.publicCode,
    unitPriceMinor: order.buyerUnitPriceMinor,
    totalMinor: total,
    depositMinor: Math.round((total * order.depositBps) / 10_000),
  };
}

export function manufacturerOrderView(order: OrderRow, links: MediaLinks): ManufacturerOrder {
  return {
    ...core(order, 'MANUFACTURER', links),
    buyerCode: buyerCode(order),
    unitPriceMinor: order.manufacturerUnitPriceMinor,
    totalMinor: order.manufacturerUnitPriceMinor * order.quantity,
  };
}

export function adminOrderView(order: OrderRow, links: MediaLinks): AdminOrder {
  return {
    ...core(order, 'ADMIN', links),
    buyer: { code: buyerCode(order), name: order.buyerCompany.legalName },
    manufacturer: {
      code: order.manufacturerProfile.publicCode,
      name: order.manufacturerProfile.company.legalName,
    },
    buyerUnitPriceMinor: order.buyerUnitPriceMinor,
    manufacturerUnitPriceMinor: order.manufacturerUnitPriceMinor,
    buyerTotalMinor: order.buyerUnitPriceMinor * order.quantity,
    manufacturerTotalMinor: order.manufacturerUnitPriceMinor * order.quantity,
    commissionBps: order.commissionBps,
    commissionMinor: Number(order.commissionMinor),
    repeatOrder: order.repeatOrder,
  };
}
