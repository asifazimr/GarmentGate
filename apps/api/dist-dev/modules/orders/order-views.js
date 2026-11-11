import { acceptanceNumber, AqlLevelSchema, flowProgress, paymentPlan, allowedTransitions, PRODUCTION_STAGES, } from '@garmentgate/shared';
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
};
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
    payments: {
        where: { direction: 'INBOUND', status: 'SUCCEEDED', purpose: 'BALANCE' },
        select: { amountMinor: true },
    },
};
export const documentName = (orderCode, type, index = 0) => `${orderCode}-${type.toLowerCase().replace(/_/g, '-')}${index > 0 ? `-${String(index + 1)}` : ''}.pdf`;
export function balancePaid(order) {
    const { balance } = paymentPlan(BigInt(order.buyerUnitPriceMinor) * BigInt(order.quantity), order.depositBps);
    return order.payments.reduce((sum, p) => sum + p.amountMinor, 0n) >= balance;
}
export function finalInspection(order) {
    return order.inspections.filter((i) => i.type === 'PRE_SHIPMENT').at(-1) ?? null;
}
const STAGE_ORDER = PRODUCTION_STAGES;
function mediaView(m, links, caption) {
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
export function progressOf(order) {
    const base = flowProgress(order.status);
    if (order.status !== 'IN_PRODUCTION')
        return base;
    const done = order.milestones.filter((m) => STAGE_ORDER.includes(m.stage) && m.status === 'COMPLETED').length;
    const step = flowProgress('QC') - base;
    return Math.round(base + (step * done) / PRODUCTION_STAGES.length);
}
export function currentStage(order) {
    const production = order.milestones
        .filter((m) => STAGE_ORDER.includes(m.stage))
        .sort((a, b) => STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage));
    return (production.find((m) => m.status === 'IN_PROGRESS' || m.status === 'DELAYED')?.stage ??
        production.find((m) => m.status === 'PENDING')?.stage ??
        null);
}
export function inspectionView(i, audience, links, names) {
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
        inspector: audience === 'ADMIN' && i.inspector
            ? `${i.inspector.firstName} ${i.inspector.lastName}`
            : null,
        rating: audience === 'ADMIN' ? i.rating : null,
        aql: i.lotSize && i.sampleSize && majorAql.success && minorAql.success
            ? {
                lotSize: i.lotSize,
                sampleSize: i.sampleSize,
                majorAql: majorAql.data,
                minorAql: minorAql.data,
                acceptMajor: acceptanceNumber(i.sampleSize, majorAql.data),
                acceptMinor: acceptanceNumber(i.sampleSize, minorAql.data),
            }
            : null,
        defects: i.result === 'PENDING'
            ? null
            : {
                critical: i.criticalDefects ?? 0,
                major: i.majorDefects ?? 0,
                minor: i.minorDefects ?? 0,
            },
        summary: audience === 'BUYER'
            ? scrubText(i.summary, factoryNames)
            : audience === 'MANUFACTURER'
                ? scrubText(i.summary, buyerNames)
                : i.summary,
        photos: i.photos
            .filter((p) => audience === 'BUYER'
            ? p.reviewStatus === 'APPROVED' && p.file.processingStatus === 'READY'
            : p.file.processingStatus === 'READY')
            .map((p) => mediaView(p, links, audience === 'BUYER' ? scrubText(p.caption, factoryNames) : p.caption)),
        reportUrl: audience !== 'BUYER' && report?.processingStatus === 'READY'
            ? (links.get(report.id)?.documentUrl ?? null)
            : null,
    };
}
function core(order, audience, links) {
    const buyerNames = identityPatterns(identityOf(order.buyerCompany));
    const factoryNames = identityPatterns(identityOf(order.manufacturerProfile.company));
    const fromBuyer = (text, filtered) => audience === 'MANUFACTURER'
        ? scrubText(filtered ?? text, buyerNames)
        : audience === 'ADMIN'
            ? text
            : text;
    const fromFactory = (text, filtered) => audience === 'BUYER' ? scrubText(filtered ?? text, factoryNames) : text;
    const visible = (m, owner) => audience === 'ADMIN' ||
        audience === owner ||
        (m.reviewStatus === 'APPROVED' && m.file.processingStatus === 'READY');
    const inspections = order.inspections.map((i) => inspectionView(i, audience, links, { buyerNames, factoryNames }));
    const actorLabel = (a) => a ? `${a.firstName} ${a.lastName}${a.role === 'ADMIN' ? ' (GarmentGate)' : ''}` : 'System';
    return {
        code: order.code,
        title: audience === 'MANUFACTURER'
            ? (scrubText(order.title, buyerNames) ?? order.code)
            : order.title,
        specification: audience === 'MANUFACTURER'
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
        balancePaid: balancePaid(order),
        allowedTransitions: allowedTransitions(order.status, audience),
    };
}
const buyerCode = (o) => o.buyerCompany.buyerProfile?.publicCode ?? 'BYR';
export function buyerOrderView(order, links) {
    const total = order.buyerUnitPriceMinor * order.quantity;
    return {
        ...core(order, 'BUYER', links),
        manufacturerCode: order.manufacturerProfile.publicCode,
        unitPriceMinor: order.buyerUnitPriceMinor,
        totalMinor: total,
        depositMinor: Math.round((total * order.depositBps) / 10_000),
    };
}
export function manufacturerOrderView(order, links) {
    return {
        ...core(order, 'MANUFACTURER', links),
        buyerCode: buyerCode(order),
        unitPriceMinor: order.manufacturerUnitPriceMinor,
        totalMinor: order.manufacturerUnitPriceMinor * order.quantity,
    };
}
export function adminOrderView(order, links) {
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
        hsCode: order.hsCode,
        commissionBps: order.commissionBps,
        commissionMinor: Number(order.commissionMinor),
        repeatOrder: order.repeatOrder,
    };
}
//# sourceMappingURL=order-views.js.map