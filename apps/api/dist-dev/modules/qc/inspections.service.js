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
import { aqlVerdict, filterContactDetails, INSPECTION_PHOTO_MAX_BYTES, INSPECTION_REPORT_MAX_BYTES, } from '@garmentgate/shared';
import { Prisma } from '../../generated/prisma/client.js';
import { chargeInspection } from '../payments/charges.js';
import { GigService } from './gig.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import { AuthService } from '../auth/auth.service.js';
import { identityOf, identityPatterns } from '../catalog/public.serializer.js';
import { MediaService } from '../media/media.service.js';
import { inspectionView, orderInclude } from '../orders/order-views.js';
import { actorOf, OrdersService } from '../orders/orders.service.js';
import { FilesService } from '../storage/files.service.js';
import { PerformanceService } from '../trust/performance.service.js';
const DAY = 86_400_000;
const labelOf = (type) => (type === 'DURING_PRODUCTION' ? 'Inline' : 'Final random');
const jobInclude = {
    order: {
        select: {
            code: true,
            status: true,
            title: true,
            quantity: true,
            manufacturerProfile: {
                select: {
                    publicCode: true,
                    latitude: true,
                    company: {
                        select: {
                            legalName: true,
                            addressLine1: true,
                            addressLine2: true,
                            city: true,
                            country: true,
                        },
                    },
                },
            },
        },
    },
};
const startOfToday = () => new Date(Math.floor(Date.now() / DAY) * DAY);
let InspectionsService = class InspectionsService {
    prisma;
    notifier;
    orders;
    files;
    media;
    auth;
    audit;
    performance;
    gig;
    constructor(prisma, notifier, orders, files, media, auth, audit, performance, gig) {
        this.prisma = prisma;
        this.notifier = notifier;
        this.orders = orders;
        this.files = files;
        this.media = media;
        this.auth = auth;
        this.audit = audit;
        this.performance = performance;
        this.gig = gig;
    }
    async book(actor, code, dto) {
        const order = await this.orders.load(actor, code);
        if (actorOf(actor) === 'MANUFACTURER')
            throw new ForbiddenException('Inspections are booked by the buyer or GarmentGate');
        const allowed = dto.type === 'DURING_PRODUCTION' ? ['IN_PRODUCTION'] : ['IN_PRODUCTION', 'QC'];
        if (!allowed.includes(order.status)) {
            throw new ConflictException(dto.type === 'DURING_PRODUCTION'
                ? 'Inline inspections happen while the order is in production'
                : 'The final inspection is booked during production or QC');
        }
        const lastFinal = order.inspections.filter((i) => i.type === 'PRE_SHIPMENT').at(-1);
        if (dto.type === 'PRE_SHIPMENT' && order.status === 'QC' && lastFinal?.result === 'FAIL')
            throw new ConflictException('Send the order back for rework first');
        const scheduledAt = dto.scheduledAt;
        if (scheduledAt < startOfToday())
            throw new BadRequestException('Pick a date from today on');
        const open = order.inspections.find((i) => i.type === dto.type && i.result === 'PENDING');
        let id;
        if (open) {
            if (open.bookedById)
                throw new ConflictException('This inspection is already booked');
            await this.prisma.inspection.update({
                where: { id: open.id },
                data: { scheduledAt, bookedById: actor.userId },
            });
            id = open.id;
        }
        else {
            try {
                id = await this.prisma.$transaction(async (tx) => {
                    const created = await tx.inspection.create({
                        data: {
                            orderId: order.id,
                            type: dto.type,
                            scheduledAt,
                            aqlLevel: 'II',
                            bookedById: actor.userId,
                        },
                    });
                    await chargeInspection(tx, order, created.id);
                    return created.id;
                });
            }
            catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
                    throw new ConflictException('This inspection is already booked');
                throw error;
            }
        }
        const day = scheduledAt.toISOString().slice(0, 10);
        await this.orders.notifyParty(order, 'MANUFACTURER', 'ORDER_UPDATE', `${order.code}: inspection on ${day}`, `${labelOf(dto.type)} inspection booked by GarmentGate for ${day}. Please have the goods ready.`);
        await this.orders.notifyParty(order, 'ADMIN', 'ORDER_UPDATE', `${order.code}: inspection booked`, `${labelOf(dto.type)} inspection on ${day}: assign an inspector.`);
        await this.audit.log({
            actorUserId: actor.userId,
            action: 'qc.inspection_booked',
            entityType: 'Inspection',
            entityId: id,
            metadata: { orderCode: order.code, type: dto.type, scheduledAt: day },
        });
        return { id };
    }
    async inspectors() {
        const users = await this.prisma.user.findMany({
            where: { role: 'INSPECTOR', deletedAt: null },
            orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                status: true,
                _count: { select: { inspectionsAssigned: { where: { result: 'PENDING' } } } },
            },
        });
        return users.map((u) => ({
            id: u.id,
            name: `${u.firstName} ${u.lastName}`,
            email: u.email,
            active: u.status === 'ACTIVE',
            openInspections: u._count.inspectionsAssigned,
        }));
    }
    createInspector(adminId, dto) {
        return this.auth.createStaffUser(adminId, { ...dto, role: 'INSPECTOR' });
    }
    async assign(adminId, id, dto) {
        const inspection = await this.prisma.inspection.findUnique({
            where: { id },
            include: jobInclude,
        });
        if (!inspection)
            throw new NotFoundException('Inspection not found');
        if (dto.inspectorId) {
            const inspector = await this.prisma.user.findFirst({
                where: { id: dto.inspectorId, role: 'INSPECTOR', status: 'ACTIVE' },
            });
            if (!inspector)
                throw new BadRequestException('Pick an active inspector');
        }
        const { count } = await this.prisma.inspection.updateMany({
            where: { id, result: 'PENDING' },
            data: {
                inspectorId: dto.inspectorId,
                ...(dto.inspectorId && !inspection.assignedAt && { assignedAt: new Date() }),
                ...(dto.inspectorId && { payUsdMinor: await this.gig.payFor(dto.inspectorId) }),
                ...(dto.scheduledAt && { scheduledAt: dto.scheduledAt }),
            },
        });
        if (count !== 1)
            throw new ConflictException('This inspection already has its report');
        if (dto.inspectorId && dto.inspectorId !== inspection.inspectorId) {
            await this.notifier.notify({
                to: { userIds: [dto.inspectorId] },
                type: 'QC_RESULT',
                title: `New inspection: ${inspection.order.code}`,
                body: `${labelOf(inspection.type)} inspection at ${inspection.order.manufacturerProfile.publicCode}.`,
                link: { inspectionId: id },
            });
        }
        await this.audit.log({
            actorUserId: adminId,
            action: 'qc.inspection_assigned',
            entityType: 'Inspection',
            entityId: id,
            metadata: {
                inspectorId: dto.inspectorId,
                scheduledAt: dto.scheduledAt?.toISOString() ?? null,
            },
        });
    }
    async jobs(user) {
        const rows = await this.prisma.inspection.findMany({
            where: user.role === 'ADMIN' ? { result: 'PENDING' } : { inspectorId: user.id },
            include: jobInclude,
            orderBy: [{ result: 'asc' }, { scheduledAt: { sort: 'asc', nulls: 'last' } }],
            take: 200,
        });
        return rows.map((r) => this.job(r));
    }
    async jobDetail(user, id) {
        const { row, order } = await this.loadJob(user, id);
        const links = await this.orders.links(order);
        const inspection = order.inspections.find((i) => i.id === id);
        if (!inspection)
            throw new NotFoundException('Inspection not found');
        return {
            ...this.job(row),
            specification: order.specification,
            items: order.items.map((i) => ({ color: i.color, size: i.size, quantity: i.quantity })),
            inspection: inspectionView(inspection, 'ADMIN', links, {
                buyerNames: identityPatterns(identityOf(order.buyerCompany)),
                factoryNames: identityPatterns(identityOf(order.manufacturerProfile.company)),
            }),
            canReport: row.result === 'PENDING' && this.reportable(row.type, order.status),
            checkIn: {
                required: row.order.manufacturerProfile.latitude !== null,
                at: row.checkedInAt?.toISOString() ?? null,
                distanceM: row.checkInDistanceM,
            },
        };
    }
    async presign(user, id, dto) {
        const { row } = await this.loadJob(user, id);
        if (row.result !== 'PENDING')
            throw new ConflictException('The report is already filed');
        const pdf = dto.contentType === 'application/pdf';
        return this.files.reserveUpload({
            userId: user.id,
            companyId: null,
            purpose: pdf ? 'INSPECTION_REPORT' : 'INSPECTION_PHOTO',
            folder: 'originals',
            fileName: dto.fileName,
            contentType: dto.contentType,
            sizeBytes: dto.sizeBytes,
            maxBytes: pdf ? INSPECTION_REPORT_MAX_BYTES : INSPECTION_PHOTO_MAX_BYTES,
        });
    }
    async addPhoto(user, id, dto) {
        const { row } = await this.loadJob(user, id);
        if (row.result !== 'PENDING')
            throw new ConflictException('The report is already filed');
        const file = await this.files.confirmUpload(dto.fileId, { userId: user.id }, 'INSPECTION_PHOTO', INSPECTION_PHOTO_MAX_BYTES);
        await this.prisma.inspectionPhoto.create({
            data: {
                inspectionId: id,
                fileId: file.id,
                caption: dto.caption ? filterContactDetails(dto.caption).filtered : null,
            },
        });
        await this.media.enqueue(file.id);
    }
    async report(user, id, dto) {
        const { row, order } = await this.loadJob(user, id);
        if (row.result !== 'PENDING')
            throw new ConflictException('The report is already filed');
        if (user.role === 'INSPECTOR')
            await this.gig.assertCheckedIn(user.id, id);
        if (!this.reportable(row.type, order.status)) {
            throw new ConflictException(row.type === 'PRE_SHIPMENT'
                ? 'The final inspection is reported once production is finished (QC)'
                : 'The order isn’t in production');
        }
        const verdict = aqlVerdict({
            lotSize: dto.lotSize,
            majorAql: dto.majorAql,
            minorAql: dto.minorAql,
            critical: dto.critical,
            major: dto.major,
            minor: dto.minor,
        });
        if (dto.result === 'PASS' && verdict.result === 'FAIL') {
            throw new BadRequestException(`These counts fail AQL (sample ${String(verdict.sampleSize)}: major ≤ ${String(verdict.acceptMajor)}, minor ≤ ${String(verdict.acceptMinor)}, no critical)`);
        }
        const reportFile = dto.reportFileId
            ? await this.files.confirmUpload(dto.reportFileId, { userId: user.id }, 'INSPECTION_REPORT', INSPECTION_REPORT_MAX_BYTES)
            : null;
        const { count } = await this.prisma.inspection.updateMany({
            where: { id, result: 'PENDING' },
            data: {
                result: dto.result,
                lotSize: dto.lotSize,
                sampleSize: verdict.sampleSize,
                aqlLevel: 'II',
                aqlMajor: dto.majorAql,
                aqlMinor: dto.minorAql,
                criticalDefects: dto.critical,
                majorDefects: dto.major,
                minorDefects: dto.minor,
                summary: filterContactDetails(dto.summary).filtered,
                inspectedAt: new Date(),
                reportFileId: reportFile?.id ?? null,
                inspectorId: row.inspectorId ?? user.id,
            },
        });
        if (count !== 1)
            throw new ConflictException('The report is already filed');
        if (reportFile)
            await this.media.enqueue(reportFile.id);
        await this.audit.log({
            actorUserId: user.id,
            action: `qc.inspection_${dto.result.toLowerCase()}`,
            entityType: 'Inspection',
            entityId: id,
            metadata: {
                orderCode: order.code,
                type: row.type,
                sampleSize: verdict.sampleSize,
                critical: dto.critical,
                major: dto.major,
                minor: dto.minor,
            },
        });
        await this.gig.onReportFiled(id);
        await this.announce(order, row.type, dto.result);
        if (row.type === 'PRE_SHIPMENT' && dto.result === 'FAIL')
            await this.performance.recompute(order.manufacturerProfileId);
    }
    reportable(type, status) {
        return type === 'PRE_SHIPMENT' ? status === 'QC' : ['IN_PRODUCTION', 'QC'].includes(status);
    }
    async loadJob(user, id) {
        const row = await this.prisma.inspection.findUnique({ where: { id }, include: jobInclude });
        if (!row || (user.role !== 'ADMIN' && row.inspectorId !== user.id))
            throw new NotFoundException('Inspection not found');
        const order = await this.prisma.order.findUniqueOrThrow({
            where: { id: row.orderId },
            include: orderInclude,
        });
        return { row, order };
    }
    job(r) {
        const c = r.order.manufacturerProfile.company;
        return {
            id: r.id,
            type: r.type,
            result: r.result,
            scheduledAt: r.scheduledAt?.toISOString() ?? null,
            inspectedAt: r.inspectedAt?.toISOString() ?? null,
            orderCode: r.order.code,
            orderStatus: r.order.status,
            title: r.order.title,
            quantity: r.order.quantity,
            factory: {
                code: r.order.manufacturerProfile.publicCode,
                name: c.legalName,
                address: [c.addressLine1, c.addressLine2, c.city].filter(Boolean).join(', '),
                country: c.country,
            },
        };
    }
    async announce(order, type, result) {
        if (type === 'PRE_SHIPMENT' && result === 'PASS') {
            await this.orders.advance(order.id, 'READY_TO_SHIP', 'Final inspection passed');
            return;
        }
        const label = type === 'PRE_SHIPMENT' ? 'Final inspection' : 'Inline inspection';
        const failed = result === 'FAIL';
        await this.orders.notifyParty(order, 'BUYER', 'QC_RESULT', `${order.code}: ${label.toLowerCase()} ${failed ? 'failed' : 'passed'}`, failed && type === 'PRE_SHIPMENT'
            ? 'The goods didn’t pass. See the report, then ask for rework or open a dispute.'
            : 'The inspection report is on your order.');
        await this.orders.notifyParty(order, 'MANUFACTURER', 'QC_RESULT', `${order.code}: ${label.toLowerCase()} ${failed ? 'failed' : 'passed'}`, failed
            ? 'See the defects in the report on the order.'
            : 'The inspection report is on the order.');
        await this.orders.notifyParty(order, 'ADMIN', 'QC_RESULT', `${order.code}: ${label.toLowerCase()} ${result}`, order.manufacturerProfile.publicCode);
    }
};
InspectionsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        Notifier,
        OrdersService,
        FilesService,
        MediaService,
        AuthService,
        AuditService,
        PerformanceService,
        GigService])
], InspectionsService);
export { InspectionsService };
//# sourceMappingURL=inspections.service.js.map