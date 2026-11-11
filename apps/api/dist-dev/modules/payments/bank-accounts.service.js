var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { maskAccount, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { actorOf } from '../orders/orders.service.js';
const LIVE = ['PENDING_REVIEW', 'VERIFIED'];
const squash = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
export function bankDetails(a) {
    return {
        holderName: a.holderName,
        bankName: a.bankName,
        bankCountry: a.bankCountry,
        accountNumber: a.accountNumber,
        swiftBic: a.swiftBic,
        routingCode: a.routingCode,
        branch: a.branch,
        currency: a.currency,
    };
}
let BankAccountsService = class BankAccountsService {
    prisma;
    notifier;
    audit;
    constructor(prisma, notifier, audit) {
        this.prisma = prisma;
        this.notifier = notifier;
        this.audit = audit;
    }
    async mine(actor) {
        const companyId = this.factoryCompany(actor);
        const row = await this.prisma.factoryBankAccount.findFirst({
            where: { companyId, status: { not: 'REPLACED' } },
            orderBy: { createdAt: 'desc' },
        });
        return row
            ? {
                holderName: row.holderName,
                bankName: row.bankName,
                bankCountry: row.bankCountry,
                accountMasked: maskAccount(row.accountNumber),
                swiftBic: row.swiftBic,
                currency: row.currency,
                status: row.status,
                reviewNote: row.reviewNote,
                createdAt: row.createdAt.toISOString(),
            }
            : null;
    }
    async submit(actor, dto) {
        const companyId = this.factoryCompany(actor);
        const created = await this.prisma.$transaction(async (tx) => {
            await tx.factoryBankAccount.updateMany({
                where: { companyId, status: { in: LIVE } },
                data: { status: 'REPLACED' },
            });
            return tx.factoryBankAccount.create({
                data: { ...dto, companyId, submittedById: actor.userId },
            });
        });
        await this.audit.log({
            actorUserId: actor.userId,
            action: 'payments.bank_account_submitted',
            entityType: 'FactoryBankAccount',
            entityId: created.id,
            metadata: { bankCountry: dto.bankCountry, currency: dto.currency },
        });
        await this.notifier.notify({
            to: 'ADMINS',
            type: 'PAYMENT_UPDATE',
            title: 'Factory bank details to verify',
            body: 'A factory submitted new payout bank details. Payouts to it wait until they are verified.',
        });
    }
    async list() {
        const rows = await this.prisma.factoryBankAccount.findMany({
            where: { status: { not: 'REPLACED' } },
            orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
            take: 500,
        });
        const companies = new Map((await this.prisma.company.findMany({
            where: { id: { in: [...new Set(rows.map((r) => r.companyId))] } },
            select: {
                id: true,
                legalName: true,
                tradeName: true,
                country: true,
                manufacturerProfile: { select: { publicCode: true } },
            },
        })).map((c) => [c.id, c]));
        return rows.map((r) => {
            const c = companies.get(r.companyId);
            const names = [c?.legalName, c?.tradeName].filter((x) => !!x).map(squash);
            return {
                ...bankDetails(r),
                id: r.id,
                manufacturer: {
                    code: c?.manufacturerProfile?.publicCode ?? '',
                    name: c?.legalName ?? '',
                    country: c?.country ?? '',
                },
                status: r.status,
                reviewNote: r.reviewNote,
                createdAt: r.createdAt.toISOString(),
                reviewedAt: r.reviewedAt?.toISOString() ?? null,
                holderMismatch: !names.includes(squash(r.holderName)),
            };
        });
    }
    async review(adminId, id, dto) {
        const status = dto.decision === 'VERIFY' ? 'VERIFIED' : 'REJECTED';
        const { count } = await this.prisma.factoryBankAccount.updateMany({
            where: { id, status: 'PENDING_REVIEW' },
            data: { status, reviewNote: dto.note ?? null, reviewedById: adminId, reviewedAt: new Date() },
        });
        if (count !== 1) {
            if (!(await this.prisma.factoryBankAccount.findUnique({ where: { id } })))
                throw new NotFoundException('Bank account not found');
            throw new ConflictException('These details were already reviewed or replaced');
        }
        const row = await this.prisma.factoryBankAccount.findUniqueOrThrow({ where: { id } });
        await this.audit.log({
            actorUserId: adminId,
            action: status === 'VERIFIED' ? 'payments.bank_account_verified' : 'payments.bank_account_rejected',
            entityType: 'FactoryBankAccount',
            entityId: id,
            metadata: { note: dto.note ?? null },
        });
        await this.notifier.notify({
            to: { companyId: row.companyId },
            type: 'PAYMENT_UPDATE',
            title: status === 'VERIFIED'
                ? 'Your payout bank account is verified'
                : 'Check your payout bank details',
            body: status === 'VERIFIED'
                ? `GarmentGate pays you to the account ending ${row.accountNumber.slice(-4)}.`
                : `GarmentGate couldn’t verify them: ${dto.note ?? ''}`,
        });
    }
    async verifiedFor(companyId, client = this.prisma) {
        return client.factoryBankAccount.findFirst({ where: { companyId, status: 'VERIFIED' } });
    }
    factoryCompany(actor) {
        if (actorOf(actor) !== 'MANUFACTURER' || !actor.companyId)
            throw new ForbiddenException('Factories only');
        return actor.companyId;
    }
};
BankAccountsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        Notifier,
        AuditService])
], BankAccountsService);
export { BankAccountsService };
//# sourceMappingURL=bank-accounts.service.js.map