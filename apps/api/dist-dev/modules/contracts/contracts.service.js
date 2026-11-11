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
import { callOffError, dateOnly, isoDate, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { identityForScrubbing } from '../catalog/catalog.queries.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import { Notifier } from '../notifications/notifier.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { actorOf, OrdersService } from '../orders/orders.service.js';
const DAY = 86_400_000;
const contractInclude = {
    orders: {
        orderBy: { createdAt: 'desc' },
        select: { code: true, status: true, quantity: true, createdAt: true },
    },
};
let ContractsService = class ContractsService {
    prisma;
    orders;
    codes;
    notifier;
    audit;
    constructor(prisma, orders, codes, notifier, audit) {
        this.prisma = prisma;
        this.orders = orders;
        this.codes = codes;
        this.notifier = notifier;
        this.audit = audit;
    }
    async create(adminId, dto) {
        const [buyer, factory] = await Promise.all([
            this.prisma.buyerProfile.findUnique({
                where: { publicCode: dto.buyerCode },
                select: { companyId: true, company: { select: { kycStatus: true } } },
            }),
            this.prisma.manufacturerProfile.findUnique({
                where: { publicCode: dto.manufacturerCode },
                select: { id: true, company: { select: { id: true, kycStatus: true } } },
            }),
        ]);
        if (buyer?.company.kycStatus !== 'VERIFIED')
            throw new BadRequestException('Pick a verified buyer');
        if (factory?.company.kycStatus !== 'VERIFIED')
            throw new BadRequestException('Pick a verified factory');
        const year = new Date().getUTCFullYear();
        const code = await this.prisma.$transaction(async (tx) => {
            const next = await this.codes.sequential(`CTR-${String(year)}`, 5, tx);
            await tx.supplyContract.create({
                data: {
                    code: next,
                    buyerCompanyId: buyer.companyId,
                    manufacturerProfileId: factory.id,
                    title: dto.title,
                    specification: dto.specification,
                    currency: dto.currency,
                    buyerUnitPriceMinor: dto.buyerUnitPriceMinor,
                    manufacturerUnitPriceMinor: dto.manufacturerUnitPriceMinor,
                    contractedQuantity: dto.contractedQuantity,
                    minCallOffQuantity: dto.minCallOffQuantity,
                    depositBps: dto.depositBps,
                    incoterm: dto.incoterm,
                    destinationCountry: dto.destinationCountry,
                    leadTimeDays: dto.leadTimeDays,
                    startsOn: dateOnly(dto.startsOn),
                    endsOn: dateOnly(dto.endsOn),
                    createdById: adminId,
                },
            });
            return next;
        });
        await this.audit.log({
            actorUserId: adminId,
            action: 'contract.created',
            entityType: 'SupplyContract',
            entityId: code,
            metadata: {
                buyer: dto.buyerCode,
                factory: dto.manufacturerCode,
                quantity: dto.contractedQuantity,
            },
        });
        await this.notifier.notify({
            to: { companyId: buyer.companyId },
            type: 'ORDER_UPDATE',
            title: `Supply contract ${code} is active`,
            body: `${dto.title}: call off orders against it at the agreed price.`,
        });
        await this.notifier.notify({
            to: { companyId: factory.company.id },
            type: 'ORDER_UPDATE',
            title: `Supply contract ${code}`,
            body: `${dto.title}: GarmentGate will place call-off orders with you under it.`,
        });
        return { code };
    }
    async end(adminId, code, status) {
        const { count } = await this.prisma.supplyContract.updateMany({
            where: { code, status: 'ACTIVE' },
            data: { status },
        });
        if (count !== 1)
            throw new ConflictException('This contract isn’t active');
        await this.audit.log({
            actorUserId: adminId,
            action: `contract.${status.toLowerCase()}`,
            entityType: 'SupplyContract',
            entityId: code,
        });
    }
    async adminList() {
        const rows = await this.prisma.supplyContract.findMany({
            orderBy: { createdAt: 'desc' },
            include: contractInclude,
            take: 500,
        });
        const [buyers, factories] = await Promise.all([
            this.prisma.company.findMany({
                where: { id: { in: rows.map((r) => r.buyerCompanyId) } },
                select: { id: true, legalName: true, buyerProfile: { select: { publicCode: true } } },
            }),
            this.prisma.manufacturerProfile.findMany({
                where: { id: { in: rows.map((r) => r.manufacturerProfileId) } },
                select: { id: true, publicCode: true, company: { select: { legalName: true } } },
            }),
        ]);
        return rows.map((r) => {
            const b = buyers.find((x) => x.id === r.buyerCompanyId);
            const f = factories.find((x) => x.id === r.manufacturerProfileId);
            return {
                ...this.shared(r, r.specification),
                buyer: { code: b?.buyerProfile?.publicCode ?? '', name: b?.legalName ?? '' },
                manufacturer: { code: f?.publicCode ?? '', name: f?.company.legalName ?? '' },
                buyerUnitPriceMinor: r.buyerUnitPriceMinor,
                manufacturerUnitPriceMinor: r.manufacturerUnitPriceMinor,
            };
        });
    }
    async buyerList(actor) {
        const companyId = this.side(actor, 'BUYER');
        const rows = await this.prisma.supplyContract.findMany({
            where: { buyerCompanyId: companyId },
            orderBy: [{ status: 'asc' }, { endsOn: 'asc' }],
            include: contractInclude,
        });
        const factories = await this.factoryIdentities(rows.map((r) => r.manufacturerProfileId));
        return rows.map((r) => {
            const f = factories.get(r.manufacturerProfileId);
            return {
                ...this.shared(r, scrubText(r.specification, f ? identityPatterns(identityOf(f.company)) : []) ?? '', scrubText(r.title, f ? identityPatterns(identityOf(f.company)) : []) ?? r.code),
                manufacturerCode: f?.publicCode ?? '',
                unitPriceMinor: r.buyerUnitPriceMinor,
            };
        });
    }
    async callOff(actor, code, dto) {
        const companyId = this.side(actor, 'BUYER');
        const c = await this.prisma.supplyContract.findUnique({ where: { code } });
        if (c?.buyerCompanyId !== companyId)
            throw new NotFoundException('Contract not found');
        const today = isoDate(new Date());
        const error = callOffError({ ...c, startsOn: isoDate(c.startsOn), endsOn: isoDate(c.endsOn) }, dto.quantity, today);
        if (error)
            throw new ConflictException(error);
        const ship = dto.requestedShipDate
            ? dateOnly(dto.requestedShipDate)
            : new Date(dateOnly(today).getTime() + c.leadTimeDays * DAY);
        const year = new Date().getUTCFullYear();
        const order = await this.prisma.$transaction(async (tx) => {
            const { count } = await tx.supplyContract.updateMany({
                where: {
                    id: c.id,
                    status: 'ACTIVE',
                    calledOffQuantity: { lte: c.contractedQuantity - dto.quantity },
                },
                data: { calledOffQuantity: { increment: dto.quantity } },
            });
            if (count !== 1)
                throw new ConflictException('Not enough volume left on this contract');
            const orderCode = await this.codes.sequential(`ORD-${String(year)}`, 5, tx);
            return tx.order.create({
                data: {
                    code: orderCode,
                    buyerCompanyId: c.buyerCompanyId,
                    manufacturerProfileId: c.manufacturerProfileId,
                    contractId: c.id,
                    title: c.title,
                    specification: c.specification,
                    quantity: dto.quantity,
                    buyerUnitPriceMinor: c.buyerUnitPriceMinor,
                    manufacturerUnitPriceMinor: c.manufacturerUnitPriceMinor,
                    buyerTotalMinor: BigInt(c.buyerUnitPriceMinor) * BigInt(dto.quantity),
                    manufacturerTotalMinor: BigInt(c.manufacturerUnitPriceMinor) * BigInt(dto.quantity),
                    currency: c.currency,
                    incoterm: c.incoterm,
                    destinationCountry: c.destinationCountry,
                    depositBps: c.depositBps,
                    requestedShipDate: ship,
                    status: 'DRAFT',
                    events: {
                        create: [
                            {
                                toStatus: 'DRAFT',
                                actorUserId: actor.userId,
                                note: `Call-off on contract ${c.code}`,
                            },
                        ],
                    },
                },
            });
        });
        await this.orders.advance(order.id, 'DEPOSIT_PENDING', `Call-off on contract ${c.code}`);
        await this.audit.log({
            actorUserId: actor.userId,
            action: 'contract.call_off',
            entityType: 'SupplyContract',
            entityId: c.code,
            metadata: { orderCode: order.code, quantity: dto.quantity },
        });
        const factory = await this.prisma.manufacturerProfile.findUniqueOrThrow({
            where: { id: c.manufacturerProfileId },
            select: { companyId: true },
        });
        await this.notifier.notify({
            to: { companyId: factory.companyId },
            type: 'ORDER_UPDATE',
            title: `${order.code}: call-off on ${c.code}`,
            body: `${String(dto.quantity)} pieces of ${c.title}. Production starts when the buyer’s deposit is in.`,
            link: { orderCode: order.code },
        });
        await this.notifyMerchandiser(c.buyerCompanyId, {
            title: `${order.code}: new call-off on ${c.code}`,
            body: `${String(dto.quantity)} pieces. Deposit due from the buyer.`,
            orderCode: order.code,
        });
        return { orderCode: order.code };
    }
    async factoryList(actor) {
        this.side(actor, 'MANUFACTURER');
        const profileId = actor.manufacturerProfileId ?? '';
        const rows = await this.prisma.supplyContract.findMany({
            where: { manufacturerProfileId: profileId },
            orderBy: [{ status: 'asc' }, { endsOn: 'asc' }],
            include: contractInclude,
        });
        const buyers = new Map((await this.prisma.company.findMany({
            where: { id: { in: rows.map((r) => r.buyerCompanyId) } },
            select: {
                id: true,
                ...identityForScrubbing.select,
                buyerProfile: { select: { publicCode: true } },
            },
        })).map((b) => [b.id, b]));
        return rows.map((r) => {
            const b = buyers.get(r.buyerCompanyId);
            return {
                ...this.shared(r, scrubText(r.specification, b ? identityPatterns(identityOf(b)) : []) ?? '', scrubText(r.title, b ? identityPatterns(identityOf(b)) : []) ?? r.code),
                buyerCode: b?.buyerProfile?.publicCode ?? '',
                unitPriceMinor: r.manufacturerUnitPriceMinor,
            };
        });
    }
    async setMerchandiser(adminId, buyerCode, userId) {
        const buyer = await this.prisma.buyerProfile.findUnique({
            where: { publicCode: buyerCode },
            select: { companyId: true },
        });
        if (!buyer)
            throw new NotFoundException('Buyer not found');
        if (userId) {
            const staff = await this.prisma.user.findFirst({
                where: { id: userId, role: 'ADMIN', status: 'ACTIVE' },
            });
            if (!staff)
                throw new BadRequestException('Pick an active staff member');
        }
        await this.prisma.company.update({
            where: { id: buyer.companyId },
            data: { merchandiserId: userId },
        });
        await this.audit.log({
            actorUserId: adminId,
            action: 'account.merchandiser_set',
            entityType: 'Company',
            entityId: buyer.companyId,
            metadata: { merchandiserId: userId },
        });
        if (userId)
            await this.notifier.notify({
                to: { userIds: [userId] },
                type: 'SYSTEM',
                title: `You look after ${buyerCode}`,
                body: 'You are this buyer’s merchandiser: their single point of contact at GarmentGate.',
            });
    }
    async merchandiserOf(companyId) {
        const company = await this.prisma.company.findUnique({
            where: { id: companyId },
            select: { merchandiserId: true },
        });
        if (!company?.merchandiserId)
            return null;
        const staff = await this.prisma.user.findUnique({
            where: { id: company.merchandiserId },
            select: { id: true, firstName: true, lastName: true, status: true },
        });
        return staff?.status === 'ACTIVE'
            ? { id: staff.id, name: `${staff.firstName} ${staff.lastName}` }
            : null;
    }
    async accountMerchandiser(buyerCode) {
        const buyer = await this.prisma.buyerProfile.findUnique({
            where: { publicCode: buyerCode },
            select: { companyId: true },
        });
        if (!buyer)
            throw new NotFoundException('Buyer not found');
        const m = await this.merchandiserOf(buyer.companyId);
        return m ? { userId: m.id, name: m.name } : null;
    }
    async buyerMerchandiser(actor) {
        const m = await this.merchandiserOf(this.side(actor, 'BUYER'));
        return m ? { name: m.name } : null;
    }
    async notifyMerchandiser(buyerCompanyId, n) {
        const m = await this.merchandiserOf(buyerCompanyId);
        await this.notifier.notify({
            to: m ? { userIds: [m.id] } : 'ADMINS',
            type: 'ORDER_UPDATE',
            title: n.title,
            body: n.body,
            link: { orderCode: n.orderCode },
        });
    }
    side(actor, role) {
        if (actorOf(actor) !== role || !actor.companyId)
            throw new ForbiddenException();
        return actor.companyId;
    }
    async factoryIdentities(ids) {
        return new Map((await this.prisma.manufacturerProfile.findMany({
            where: { id: { in: ids } },
            select: { id: true, publicCode: true, company: identityForScrubbing },
        })).map((f) => [f.id, f]));
    }
    shared(r, specification, title = r.title) {
        return {
            code: r.code,
            title,
            specification,
            currency: r.currency,
            contractedQuantity: r.contractedQuantity,
            calledOffQuantity: r.calledOffQuantity,
            minCallOffQuantity: r.minCallOffQuantity,
            depositBps: r.depositBps,
            incoterm: r.incoterm,
            destinationCountry: r.destinationCountry,
            leadTimeDays: r.leadTimeDays,
            startsOn: isoDate(r.startsOn),
            endsOn: isoDate(r.endsOn),
            status: r.status,
            callOffs: r.orders.map((o) => ({
                orderCode: o.code,
                status: o.status,
                quantity: o.quantity,
                createdAt: o.createdAt.toISOString(),
            })),
        };
    }
};
ContractsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        OrdersService,
        PublicCodeService,
        Notifier,
        AuditService])
], ContractsService);
export { ContractsService };
//# sourceMappingURL=contracts.service.js.map