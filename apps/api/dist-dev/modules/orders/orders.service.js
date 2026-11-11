var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { canTransition, filterContactDetails, ORDER_FLOW, ORDER_IMAGE_MAX_BYTES, ORDER_VIDEO_MAX_BYTES, PRODUCTION_STAGES, } from '@garmentgate/shared';
import { chargeInspection, chargeSample } from '../payments/charges.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import { identityForScrubbing } from '../catalog/catalog.queries.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import { MediaService } from '../media/media.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { FilesService } from '../storage/files.service.js';
import { StorageService } from '../storage/storage.service.js';
import { adminOrderView, buyerOrderView, currentStage, documentName, finalInspection, manufacturerOrderView, orderInclude, progressOf, } from './order-views.js';
import { OrderHooks } from './order-hooks.js';
import { postalAddress, renderPurchaseOrder } from './purchase-order.js';
const STAGE_PLAN = {
    FABRIC_SOURCING: 0.3,
    CUTTING: 0.45,
    SEWING: 0.75,
    FINISHING: 0.88,
    PACKING: 0.96,
};
const VIA_SAMPLES = ['SAMPLING', 'SAMPLE_APPROVED'];
const DAY = 86_400_000;
export const actorOf = (actor) => actor.isAdmin ? 'ADMIN' : actor.companyType === 'MANUFACTURER' ? 'MANUFACTURER' : 'BUYER';
let OrdersService = class OrdersService {
    prisma;
    notifier;
    media;
    files;
    codes;
    audit;
    config;
    hooks;
    storage;
    constructor(prisma, notifier, media, files, codes, audit, config, hooks, storage) {
        this.prisma = prisma;
        this.notifier = notifier;
        this.media = media;
        this.files = files;
        this.codes = codes;
        this.audit = audit;
        this.config = config;
        this.hooks = hooks;
        this.storage = storage;
    }
    async load(actor, code) {
        const order = await this.prisma.order.findUnique({ where: { code }, include: orderInclude });
        const mine = order &&
            (actor.isAdmin ||
                (actor.companyType === 'BUYER' && order.buyerCompanyId === actor.companyId) ||
                (actor.companyType === 'MANUFACTURER' &&
                    order.manufacturerProfileId === actor.manufacturerProfileId));
        if (!order || !mine)
            throw new NotFoundException('Order not found');
        return order;
    }
    async detail(actor, code) {
        const order = await this.load(actor, code);
        const links = await this.links(order);
        const side = actorOf(actor);
        return side === 'ADMIN'
            ? adminOrderView(order, links)
            : side === 'BUYER'
                ? buyerOrderView(order, links)
                : manufacturerOrderView(order, links);
    }
    async list(actor) {
        const side = actorOf(actor);
        const rows = await this.prisma.order.findMany({
            where: side === 'ADMIN'
                ? {}
                : side === 'BUYER'
                    ? { buyerCompanyId: actor.companyId ?? '' }
                    : { manufacturerProfileId: actor.manufacturerProfileId ?? '' },
            orderBy: { createdAt: 'desc' },
            take: 200,
            include: {
                milestones: { select: { stage: true, status: true } },
                buyerCompany: {
                    select: {
                        ...identityForScrubbing.select,
                        buyerProfile: { select: { publicCode: true } },
                    },
                },
                manufacturerProfile: {
                    select: { publicCode: true, company: { select: { legalName: true } } },
                },
            },
        });
        const base = (o) => ({
            code: o.code,
            title: o.title,
            status: o.status,
            quantity: o.quantity,
            currency: o.currency,
            requestedShipDate: o.requestedShipDate?.toISOString() ?? null,
            createdAt: o.createdAt.toISOString(),
            progressPercent: progressOf(o),
            currentStage: o.status === 'IN_PRODUCTION' ? currentStage(o) : null,
        });
        if (side === 'BUYER') {
            return rows.map((o) => ({
                ...base(o),
                manufacturerCode: o.manufacturerProfile.publicCode,
                totalMinor: o.buyerUnitPriceMinor * o.quantity,
            }));
        }
        if (side === 'MANUFACTURER') {
            return rows.map((o) => ({
                ...base(o),
                title: scrubText(o.title, identityPatterns(identityOf(o.buyerCompany))) ?? o.code,
                buyerCode: o.buyerCompany.buyerProfile?.publicCode ?? 'BYR',
                totalMinor: o.manufacturerUnitPriceMinor * o.quantity,
            }));
        }
        return rows.map((o) => ({
            ...base(o),
            buyer: {
                code: o.buyerCompany.buyerProfile?.publicCode ?? 'BYR',
                name: o.buyerCompany.legalName,
            },
            manufacturer: {
                code: o.manufacturerProfile.publicCode,
                name: o.manufacturerProfile.company.legalName,
            },
            buyerTotalMinor: o.buyerUnitPriceMinor * o.quantity,
            manufacturerTotalMinor: o.manufacturerUnitPriceMinor * o.quantity,
            commissionMinor: Number(o.commissionMinor),
        }));
    }
    async links(order) {
        const media = [
            ...order.samples.flatMap((s) => s.photos),
            ...order.milestones.flatMap((m) => m.photos),
            ...order.inspections.flatMap((i) => i.photos),
        ];
        const documents = [
            ...order.inspections.flatMap((i) => i.reportFile
                ? [{ id: i.reportFile.id, file: i.reportFile, type: 'INSPECTION_REPORT' }]
                : []),
        ];
        const entries = await Promise.all([
            ...media.map(async (m) => {
                if (m.file.mimeType.startsWith('video/')) {
                    return [m.fileId, { urls: null, videoUrl: await this.media.videoUrl(m.file) }];
                }
                return [m.fileId, { urls: await this.media.urls(m.file), videoUrl: null }];
            }),
            ...documents.map(async (d) => [
                d.id,
                {
                    urls: null,
                    videoUrl: null,
                    documentUrl: d.file.processingStatus === 'READY' && d.file.sanitizedKey
                        ? await this.storage.presignDownload(d.file.sanitizedKey, documentName(order.code, d.type))
                        : null,
                },
            ]),
        ]);
        return new Map(entries);
    }
    async transition(actor, code, dto, options = {}) {
        const order = await this.load(actor, code);
        if (dto.to === 'DISPUTED')
            throw new BadRequestException('Open a dispute with a reason and evidence instead');
        if (order.status === 'DISPUTED' &&
            !options.resolvingDispute &&
            canTransition(order.status, dto.to, actorOf(actor))) {
            const open = await this.prisma.dispute.count({
                where: { orderId: order.id, status: { in: ['OPEN', 'UNDER_REVIEW'] } },
            });
            if (open > 0)
                throw new ConflictException('Resolve the dispute to move the order on');
        }
        if (VIA_SAMPLES.includes(dto.to)) {
            throw new BadRequestException(dto.to === 'SAMPLING'
                ? 'Request a sample to start sampling'
                : 'Approve the sample to continue');
        }
        await this.move(actor, order, dto.to, dto.note, async (tx) => {
            const now = new Date();
            switch (dto.to) {
                case 'DEPOSIT_PENDING':
                    return { confirmedAt: order.confirmedAt ?? now };
                case 'IN_PRODUCTION':
                    if (order.status === 'DEPOSIT_PENDING')
                        await this.planMilestones(tx, order, now);
                    if (order.status === 'QC' &&
                        !actor.isAdmin &&
                        finalInspection(order)?.result !== 'FAIL') {
                        throw new ConflictException('Rework can be requested after a failed final inspection');
                    }
                    return {};
                case 'QC': {
                    const open = order.milestones.filter((m) => PRODUCTION_STAGES.includes(m.stage) &&
                        m.status !== 'COMPLETED');
                    if (open.length > 0 && !actor.isAdmin) {
                        throw new ConflictException('Complete every production stage before inspection');
                    }
                    if (!order.inspections.some((i) => i.type === 'PRE_SHIPMENT' && i.result === 'PENDING')) {
                        const final = await tx.inspection.create({
                            data: { orderId: order.id, type: 'PRE_SHIPMENT', aqlLevel: 'II' },
                        });
                        await chargeInspection(tx, order, final.id);
                    }
                    return {};
                }
                case 'SHIPPED':
                    if (order.status !== 'DISPUTED')
                        throw new ConflictException('Orders ship when their GarmentGate shipment leaves the hub');
                    return {};
                case 'COMPLETED':
                    return { completedAt: now, disputedFrom: null };
                case 'CANCELLED':
                    return { cancelledAt: now, disputedFrom: null };
                default:
                    return {};
            }
        });
    }
    async move(actor, order, to, note, effects, options = {}) {
        const who = actor === 'SYSTEM' ? 'ADMIN' : actorOf(actor);
        const actorUserId = actor === 'SYSTEM' ? null : actor.userId;
        if (!options.override && !canTransition(order.status, to, who)) {
            throw new ForbiddenException(`An order can’t go from ${order.status} to ${to} that way`);
        }
        await this.hooks.before(order, to, who);
        if (!options.override &&
            order.status === 'DISPUTED' &&
            to !== order.disputedFrom &&
            to !== 'COMPLETED' &&
            to !== 'CANCELLED') {
            throw new ConflictException('Resume the order where it was, or close it');
        }
        const filtered = note === undefined ? null : filterContactDetails(note);
        await this.prisma.$transaction(async (tx) => {
            const data = await effects(tx);
            const { count } = await tx.order.updateMany({
                where: { id: order.id, status: order.status },
                data: { ...data, status: to },
            });
            if (count !== 1)
                throw new ConflictException('The order changed meanwhile: reload and try again');
            await this.hooks.within(tx, order, to);
            await tx.orderEvent.create({
                data: {
                    orderId: order.id,
                    fromStatus: order.status,
                    toStatus: to,
                    actorUserId,
                    note: filtered?.filtered ?? null,
                },
            });
        });
        await this.audit.log({
            actorUserId,
            action: options.override
                ? 'order.status_override'
                : filtered?.flagged
                    ? 'moderation.contact_filtered'
                    : `order.${to.toLowerCase()}`,
            entityType: 'Order',
            entityId: order.id,
            metadata: { from: order.status, to, ...(options.override && { reason: note }) },
        });
        await this.announce(order, to);
        await this.hooks.after(order, to);
    }
    async override(actor, code, dto) {
        if (actorOf(actor) !== 'ADMIN')
            throw new ForbiddenException('Staff only');
        const order = await this.load(actor, code);
        if (order.status === dto.to)
            throw new BadRequestException(`The order is already ${dto.to}`);
        if (order.status === 'DISPUTED') {
            const open = await this.prisma.dispute.count({
                where: { orderId: order.id, status: { in: ['OPEN', 'UNDER_REVIEW'] } },
            });
            if (open > 0)
                throw new ConflictException('Resolve the dispute to move the order on');
        }
        const flow = ORDER_FLOW;
        const past = flow.indexOf(dto.to) > flow.indexOf('DEPOSIT_PENDING');
        if (past && (await this.prisma.orderRelease.count({ where: { orderId: order.id } })) === 0)
            throw new ConflictException('Confirm the order first (deposit pending): that sets its payment schedule');
        await this.move(actor, order, dto.to, `Status override: ${dto.reason}`, async (tx) => {
            const now = new Date();
            if (dto.to === 'COMPLETED')
                return { completedAt: now, disputedFrom: null };
            if (dto.to === 'CANCELLED')
                return { cancelledAt: now, disputedFrom: null };
            if (flow.indexOf(dto.to) >= flow.indexOf('IN_PRODUCTION'))
                await this.planMilestones(tx, order, now);
            return {
                disputedFrom: null,
                ...(flow.indexOf(dto.to) >= flow.indexOf('DEPOSIT_PENDING') && {
                    confirmedAt: order.confirmedAt ?? now,
                }),
            };
        }, { override: true });
    }
    async advance(orderId, to, note) {
        const order = await this.prisma.order.findUniqueOrThrow({
            where: { id: orderId },
            include: orderInclude,
        });
        if (!canTransition(order.status, to, 'ADMIN'))
            return;
        await this.move('SYSTEM', order, to, note, async (tx) => to === 'IN_PRODUCTION' && order.status === 'DEPOSIT_PENDING'
            ? (await this.planMilestones(tx, order, new Date()), {})
            : {});
    }
    async replanProduction(tx, order, start = new Date()) {
        const end = order.requestedShipDate && order.requestedShipDate > start
            ? order.requestedShipDate
            : new Date(start.getTime() + 60 * DAY);
        const span = end.getTime() - start.getTime();
        for (const stage of PRODUCTION_STAGES)
            await tx.orderMilestone.upsert({
                where: { orderId_stage: { orderId: order.id, stage } },
                create: {
                    orderId: order.id,
                    stage,
                    status: 'PENDING',
                    plannedAt: new Date(start.getTime() + span * STAGE_PLAN[stage]),
                },
                update: {
                    status: 'PENDING',
                    completedAt: null,
                    plannedAt: new Date(start.getTime() + span * STAGE_PLAN[stage]),
                },
            });
    }
    async planMilestones(tx, order, start) {
        const existing = new Set(order.milestones.map((m) => m.stage));
        const end = order.requestedShipDate && order.requestedShipDate > start
            ? order.requestedShipDate
            : new Date(start.getTime() + 60 * DAY);
        const span = end.getTime() - start.getTime();
        const missing = PRODUCTION_STAGES.filter((s) => !existing.has(s));
        if (missing.length === 0)
            return;
        await tx.orderMilestone.createMany({
            data: missing.map((stage) => ({
                orderId: order.id,
                stage,
                status: 'PENDING',
                plannedAt: new Date(start.getTime() + span * STAGE_PLAN[stage]),
            })),
        });
    }
    async requestSample(actor, code, dto) {
        const order = await this.load(actor, code);
        const notes = dto.notes === undefined ? null : filterContactDetails(dto.notes);
        await this.move(actor, order, 'SAMPLING', dto.notes, async (tx) => {
            const sample = await tx.sample.create({
                data: {
                    orderId: order.id,
                    type: 'PRE_PRODUCTION',
                    status: 'REQUESTED',
                    quantity: dto.quantity,
                    round: (order.samples.at(-1)?.round ?? 0) + 1,
                    requestNotes: dto.notes ?? null,
                    requestNotesFiltered: notes?.filtered ?? null,
                },
            });
            await chargeSample(tx, order, sample.id);
            return {};
        });
    }
    async shipSample(actor, code, sampleId, dto) {
        const order = await this.load(actor, code);
        if (actorOf(actor) === 'BUYER')
            throw new ForbiddenException('Only the factory ships samples');
        const sample = order.samples.find((s) => s.id === sampleId);
        if (!sample)
            throw new NotFoundException('Sample not found');
        if (order.status !== 'SAMPLING' || !['REQUESTED', 'IN_PROGRESS'].includes(sample.status)) {
            throw new ConflictException('This sample isn’t waiting to be shipped');
        }
        await this.prisma.sample.update({
            where: { id: sampleId },
            data: {
                status: 'SHIPPED',
                courier: dto.courier,
                trackingNumber: dto.trackingNumber,
                shippedAt: new Date(),
            },
        });
        await this.notifyParty(order, 'BUYER', 'ORDER_UPDATE', `${order.code}: sample on its way`, `${dto.courier} · tracking ${dto.trackingNumber}`);
        await this.notifyParty(order, 'ADMIN', 'ORDER_UPDATE', `${order.code}: sample shipped`, `Round ${String(sample.round)}`);
    }
    async decideSample(actor, code, sampleId, dto) {
        const order = await this.load(actor, code);
        if (actorOf(actor) === 'MANUFACTURER')
            throw new ForbiddenException('Only the buyer decides on samples');
        const sample = order.samples.find((s) => s.id === sampleId);
        if (!sample || sample.id !== order.samples.at(-1)?.id)
            throw new NotFoundException('Sample not found');
        if (order.status !== 'SAMPLING' || !['SHIPPED', 'RECEIVED'].includes(sample.status)) {
            throw new ConflictException('This sample isn’t ready for a decision');
        }
        const feedback = dto.comments === undefined ? null : filterContactDetails(dto.comments);
        const sampleData = {
            decidedAt: new Date(),
            receivedAt: sample.receivedAt ?? new Date(),
            buyerFeedback: dto.comments ?? null,
            buyerFeedbackFiltered: feedback?.filtered ?? null,
        };
        if (dto.decision === 'APPROVE') {
            await this.move(actor, order, 'SAMPLE_APPROVED', dto.comments, async (tx) => {
                await tx.sample.update({
                    where: { id: sample.id },
                    data: { ...sampleData, status: 'APPROVED' },
                });
                return {};
            });
            return;
        }
        const companyId = order.buyerCompanyId;
        const photos = [];
        for (const fileId of dto.photoFileIds) {
            photos.push(await this.files.confirmUpload(fileId, companyId, 'SAMPLE_PHOTO', ORDER_IMAGE_MAX_BYTES));
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.sample.update({
                where: { id: sample.id },
                data: {
                    ...sampleData,
                    status: 'REJECTED',
                    photos: { create: photos.map((f) => ({ fileId: f.id })) },
                },
            });
            await tx.sample.create({
                data: {
                    orderId: order.id,
                    type: 'PRE_PRODUCTION',
                    status: 'REQUESTED',
                    quantity: sample.quantity,
                    round: sample.round + 1,
                    requestNotes: dto.comments ?? null,
                    requestNotesFiltered: feedback?.filtered ?? null,
                },
            });
        });
        for (const f of photos)
            await this.media.enqueue(f.id);
        if (feedback?.flagged) {
            await this.audit.log({
                actorUserId: actor.userId,
                action: 'moderation.contact_filtered',
                entityType: 'Sample',
                entityId: sample.id,
            });
        }
        await this.notifyParty(order, 'MANUFACTURER', 'ORDER_UPDATE', `${order.code}: changes requested`, `Round ${String(sample.round + 1)} sample needed. See the comments on the order.`);
        await this.notifyParty(order, 'ADMIN', 'ORDER_UPDATE', `${order.code}: sample changes requested`, `Round ${String(sample.round)}`);
    }
    async updateMilestone(actor, code, stage, dto) {
        const order = await this.load(actor, code);
        if (actorOf(actor) === 'BUYER')
            throw new ForbiddenException('Only the factory reports production');
        if (order.status !== 'IN_PRODUCTION')
            throw new ConflictException('The order isn’t in production');
        const milestone = order.milestones.find((m) => m.stage === stage);
        if (!milestone)
            throw new NotFoundException('Stage not found');
        if (dto.status === 'COMPLETED') {
            const before = PRODUCTION_STAGES.slice(0, PRODUCTION_STAGES.indexOf(stage));
            const unfinished = order.milestones.filter((m) => before.includes(m.stage) && m.status !== 'COMPLETED');
            if (unfinished.length > 0)
                throw new ConflictException('Complete the earlier stages first');
        }
        const note = dto.note === undefined ? undefined : filterContactDetails(dto.note);
        await this.prisma.orderMilestone.update({
            where: { id: milestone.id },
            data: {
                status: dto.status,
                completedAt: dto.status === 'COMPLETED' ? new Date() : null,
                ...(note && { note: dto.note ?? null, noteFiltered: note.filtered }),
            },
        });
        if (note?.flagged) {
            await this.audit.log({
                actorUserId: actor.userId,
                action: 'moderation.contact_filtered',
                entityType: 'OrderMilestone',
                entityId: milestone.id,
            });
        }
        if (dto.status !== 'IN_PROGRESS') {
            const label = stage.toLowerCase().replace('_', ' ');
            await this.notifyParty(order, 'BUYER', 'MILESTONE_UPDATE', `${order.code}: ${label} ${dto.status === 'COMPLETED' ? 'complete' : 'delayed'}`, order.title);
            await this.notifyParty(order, 'ADMIN', 'MILESTONE_UPDATE', `${order.code}: ${label} ${dto.status.toLowerCase()}`, order.manufacturerProfile.publicCode);
        }
    }
    async presign(actor, code, dto) {
        const order = await this.load(actor, code);
        const side = actorOf(actor);
        if (side === 'ADMIN')
            throw new ForbiddenException('Upload on behalf of a party from their account');
        const video = dto.contentType.startsWith('video/');
        if (side === 'BUYER' && video)
            throw new BadRequestException('Sample photos are images');
        return this.files.reserveUpload({
            userId: actor.userId,
            companyId: side === 'BUYER' ? order.buyerCompanyId : order.manufacturerProfile.company.id,
            purpose: side === 'BUYER' ? 'SAMPLE_PHOTO' : 'MILESTONE_PHOTO',
            folder: 'originals',
            fileName: dto.fileName,
            contentType: dto.contentType,
            sizeBytes: dto.sizeBytes,
            maxBytes: video ? ORDER_VIDEO_MAX_BYTES : ORDER_IMAGE_MAX_BYTES,
        });
    }
    async addMilestoneMedia(actor, code, stage, dto) {
        const order = await this.load(actor, code);
        if (actorOf(actor) !== 'MANUFACTURER')
            throw new ForbiddenException('Only the factory adds production media');
        if (!['IN_PRODUCTION', 'QC'].includes(order.status))
            throw new ConflictException('The order isn’t in production');
        const milestone = order.milestones.find((m) => m.stage === stage);
        if (!milestone)
            throw new NotFoundException('Stage not found');
        const pending = await this.prisma.fileAsset.findFirst({
            where: { id: dto.fileId, ownerCompanyId: order.manufacturerProfile.company.id },
            select: { mimeType: true },
        });
        const max = pending?.mimeType.startsWith('video/')
            ? ORDER_VIDEO_MAX_BYTES
            : ORDER_IMAGE_MAX_BYTES;
        const file = await this.files.confirmUpload(dto.fileId, order.manufacturerProfile.company.id, 'MILESTONE_PHOTO', max);
        const caption = dto.caption ? filterContactDetails(dto.caption).filtered : null;
        await this.prisma.milestonePhoto.create({
            data: { milestoneId: milestone.id, fileId: file.id, caption },
        });
        await this.media.enqueue(file.id);
    }
    async reorder(actor, code, dto) {
        const source = await this.load(actor, code);
        if (actorOf(actor) !== 'BUYER')
            throw new ForbiddenException('Only the buyer can reorder');
        if (source.status !== 'COMPLETED')
            throw new ConflictException('Only completed orders can be reordered');
        const notes = dto.notes === undefined ? null : filterContactDetails(dto.notes);
        const year = new Date().getUTCFullYear();
        const created = await this.prisma.$transaction(async (tx) => {
            const newCode = await this.codes.sequential(`ORD-${String(year)}`, 5, tx);
            const order = await tx.order.create({
                data: {
                    code: newCode,
                    buyerCompanyId: source.buyerCompanyId,
                    manufacturerProfileId: source.manufacturerProfileId,
                    reorderOfId: source.id,
                    title: source.title,
                    specification: source.specification,
                    quantity: dto.quantity,
                    buyerUnitPriceMinor: source.buyerUnitPriceMinor,
                    manufacturerUnitPriceMinor: source.manufacturerUnitPriceMinor,
                    buyerTotalMinor: BigInt(source.buyerUnitPriceMinor) * BigInt(dto.quantity),
                    manufacturerTotalMinor: BigInt(source.manufacturerUnitPriceMinor) * BigInt(dto.quantity),
                    currency: source.currency,
                    incoterm: source.incoterm,
                    destinationCountry: source.destinationCountry,
                    destinationPort: source.destinationPort,
                    depositBps: source.depositBps,
                    requestedShipDate: dto.requestedShipDate,
                    status: 'DRAFT',
                },
            });
            await tx.orderEvent.create({
                data: {
                    orderId: order.id,
                    toStatus: 'DRAFT',
                    actorUserId: actor.userId,
                    note: [`Reorder of ${source.code}`, notes?.filtered].filter(Boolean).join('. '),
                },
            });
            return order;
        });
        await this.audit.log({
            actorUserId: actor.userId,
            action: 'order.reordered',
            entityType: 'Order',
            entityId: created.id,
            metadata: { from: source.code },
        });
        const reloaded = await this.prisma.order.findUniqueOrThrow({
            where: { id: created.id },
            include: orderInclude,
        });
        await this.notifyParty(reloaded, 'MANUFACTURER', 'ORDER_UPDATE', `Reorder ${created.code}`, `${dto.quantity.toLocaleString('en')} pcs of ${source.code}. GarmentGate will confirm the terms with you.`);
        await this.notifyParty(reloaded, 'ADMIN', 'ORDER_UPDATE', `Reorder ${created.code}`, `${reloaded.buyerCompany.buyerProfile?.publicCode ?? ''} reordered ${source.code}`);
        return { code: created.code };
    }
    async purchaseOrder(actor, code, side) {
        const order = await this.load(actor, code);
        const who = actorOf(actor);
        const which = who === 'ADMIN' ? (side ?? 'buyer') : who === 'BUYER' ? 'buyer' : 'manufacturer';
        if (who !== 'ADMIN' && side && side !== which)
            throw new ForbiddenException('That purchase order isn’t yours');
        const platform = {
            name: this.config.get('PLATFORM_LEGAL_NAME', { infer: true }),
            address: this.config.get('PLATFORM_ADDRESS', { infer: true }),
            email: this.config.get('PLATFORM_EMAIL', { infer: true }),
        };
        const address = postalAddress;
        const garmentGate = (role) => ({
            role,
            name: platform.name,
            lines: [platform.address, platform.email],
        });
        const draft = ['DRAFT', 'SAMPLING', 'SAMPLE_APPROVED'].includes(order.status);
        const common = {
            orderCode: order.code,
            issuedAt: order.confirmedAt ?? order.createdAt,
            draft,
            quantity: order.quantity,
            currency: order.currency,
            incoterm: `${order.incoterm}${order.destinationPort ? ` ${order.destinationPort}` : ''}`,
            requestedShipDate: order.requestedShipDate,
            depositBps: order.depositBps,
            items: order.items.map((i) => ({ color: i.color, size: i.size, quantity: i.quantity })),
        };
        if (which === 'buyer') {
            const buyer = order.buyerCompany;
            const file = await renderPurchaseOrder({
                ...common,
                number: `PO-${order.code}-B`,
                buyer: {
                    role: 'Buyer',
                    name: buyer.legalName,
                    lines: [...address(buyer), ...(buyer.taxId ? [`Tax ID ${buyer.taxId}`] : [])],
                },
                supplier: garmentGate('Supplier'),
                shipTo: [
                    buyer.legalName,
                    ...address(buyer),
                    ...(order.destinationPort ? [`Port: ${order.destinationPort}`] : []),
                ],
                description: order.title,
                specification: order.specification,
                unitPriceMinor: order.buyerUnitPriceMinor,
                paymentTerms: `${String(order.depositBps / 100)}% deposit to GarmentGate on confirmation, balance before shipment. Funds are held in escrow and released to production on agreed milestones.`,
                footer: `This purchase order is between ${buyer.legalName} and ${platform.name}. ${platform.name} contracts the manufacture separately and is responsible for delivery and quality to the buyer.`,
            });
            return { file, name: `PO-${order.code}-B.pdf` };
        }
        const factory = order.manufacturerProfile.company;
        const buyerNames = identityPatterns(identityOf(order.buyerCompany));
        const file = await renderPurchaseOrder({
            ...common,
            number: `PO-${order.code}-M`,
            buyer: garmentGate('Buyer'),
            supplier: {
                role: 'Supplier',
                name: factory.legalName,
                lines: [
                    ...address(factory),
                    ...(factory.registrationNumber ? [`Reg. ${factory.registrationNumber}`] : []),
                    order.manufacturerProfile.publicCode,
                ],
            },
            shipTo: [
                `Destination: ${order.destinationCountry}${order.destinationPort ? `, ${order.destinationPort}` : ''}`,
                'Consignee and labels per GarmentGate shipping instructions',
            ],
            description: scrubText(order.title, buyerNames) ?? order.code,
            specification: scrubText(order.specification, buyerNames),
            unitPriceMinor: order.manufacturerUnitPriceMinor,
            paymentTerms: `${String(order.depositBps / 100)}% advance from GarmentGate when production starts, balance after inspection and shipment.`,
            footer: `This purchase order is between ${platform.name} and ${factory.legalName}. All communication about this order goes through GarmentGate.`,
        });
        return { file, name: `PO-${order.code}-M.pdf` };
    }
    async announce(order, to) {
        const messages = {
            SAMPLING: { factory: 'Sample requested: see the brief on the order.' },
            SAMPLE_APPROVED: { factory: 'The buyer approved your sample.' },
            DEPOSIT_PENDING: {
                buyer: 'Order confirmed: your purchase order is ready and the deposit is due.',
                factory: 'Order confirmed: your purchase order is ready. Production starts when the deposit arrives.',
            },
            IN_PRODUCTION: {
                buyer: 'Deposit received: production has started.',
                factory: 'Deposit received: please start production and update each stage.',
            },
            QC: {
                buyer: 'Production finished: the final inspection is next.',
                factory: 'Production finished: GarmentGate will schedule the final inspection.',
            },
            READY_TO_SHIP: {
                buyer: 'Final inspection passed: please pay the balance so the order can ship.',
                factory: 'Final inspection passed: book the shipment. You can ship once the balance is in.',
            },
            SHIPPED: { buyer: 'Your order has shipped: tracking and documents are on the order.' },
            DELIVERED: { factory: 'The buyer confirmed delivery: the final payment is being released.' },
            COMPLETED: { buyer: 'Order completed. Thank you!', factory: 'Order completed. Thank you!' },
            CANCELLED: { buyer: 'The order was cancelled.', factory: 'The order was cancelled.' },
        };
        const text = messages[to];
        if (text?.buyer)
            await this.notifyParty(order, 'BUYER', 'ORDER_UPDATE', `${order.code}: ${to.replace(/_/g, ' ').toLowerCase()}`, text.buyer);
        if (text?.factory)
            await this.notifyParty(order, 'MANUFACTURER', 'ORDER_UPDATE', `${order.code}: ${to.replace(/_/g, ' ').toLowerCase()}`, text.factory);
        await this.notifyParty(order, 'ADMIN', 'ORDER_UPDATE', `${order.code} → ${to}`, `${order.buyerCompany.buyerProfile?.publicCode ?? ''} / ${order.manufacturerProfile.publicCode}`);
    }
    async notifyParty(order, party, type, title, body, link = { orderCode: order.code }) {
        await this.notifier.notify({
            to: party === 'ADMIN'
                ? 'ADMINS'
                : {
                    companyId: party === 'BUYER' ? order.buyerCompanyId : order.manufacturerProfile.company.id,
                },
            type,
            title,
            body,
            link,
        });
    }
};
OrdersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        Notifier,
        MediaService,
        FilesService,
        PublicCodeService,
        AuditService,
        ConfigService,
        OrderHooks,
        StorageService])
], OrdersService);
export { OrdersService };
//# sourceMappingURL=orders.service.js.map