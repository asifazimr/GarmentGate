var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { convertMinor } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
const CREDIT_NORMAL = new Set([
    'BUYER_ESCROW',
    'PARTNER_PAYABLE',
    'INSPECTOR_PAYABLE',
    'MANUFACTURER_PAYABLE',
    'PLATFORM_REVENUE',
]);
export class UnbalancedPostingError extends Error {
}
export function normalBalance(type, debit, credit) {
    return CREDIT_NORMAL.has(type) ? credit - debit : debit - credit;
}
export function checkPosting(lines) {
    if (lines.length < 2)
        throw new UnbalancedPostingError('A posting needs at least two lines');
    let debits = 0n;
    let credits = 0n;
    for (const line of lines) {
        if (line.amountMinor <= 0n)
            throw new UnbalancedPostingError('Ledger amounts must be positive');
        if (line.direction === 'DEBIT')
            debits += line.amountMinor;
        else
            credits += line.amountMinor;
    }
    if (debits !== credits)
        throw new UnbalancedPostingError(`Unbalanced posting: ${String(debits)} ≠ ${String(credits)}`);
}
let LedgerService = class LedgerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async accountId(tx, type, companyId, currency, logisticsPartnerId = null) {
        const where = { type, companyId, logisticsPartnerId, currency };
        const existing = await tx.ledgerAccount.findFirst({ where, select: { id: true } });
        if (existing)
            return existing.id;
        await tx.$executeRaw `
      INSERT INTO "ledger_accounts" ("id", "type", "companyId", "logisticsPartnerId", "currency", "createdAt")
      VALUES (gen_random_uuid(), ${type}::"LedgerAccountType", ${companyId}::uuid, ${logisticsPartnerId}::uuid, ${currency}::"Currency", now())
      ON CONFLICT DO NOTHING`;
        const created = await tx.ledgerAccount.findFirstOrThrow({ where, select: { id: true } });
        return created.id;
    }
    async post(tx, posting) {
        const lines = posting.lines.filter((l) => l.amountMinor !== 0n);
        checkPosting(lines);
        const already = await tx.ledgerTransaction.findUnique({
            where: { idempotencyKey: posting.key },
            select: { id: true },
        });
        if (already)
            return false;
        const total = lines
            .filter((l) => l.direction === 'DEBIT')
            .reduce((a, l) => a + l.amountMinor, 0n);
        const entries = [];
        for (const line of lines) {
            entries.push({
                accountId: await this.accountId(tx, line.account, line.companyId, posting.currency, line.logisticsPartnerId ?? null),
                direction: line.direction,
                amountMinor: line.amountMinor,
            });
        }
        await tx.ledgerTransaction.create({
            data: {
                kind: posting.kind,
                idempotencyKey: posting.key,
                orderId: posting.orderId ?? null,
                capacityBookingId: posting.capacityBookingId ?? null,
                paymentId: posting.paymentId ?? null,
                currency: posting.currency,
                description: posting.description,
                unitsPerUsd: posting.rates[posting.currency] ?? '1',
                amountUsdMinor: convertMinor(total, posting.currency, 'USD', posting.rates),
                entries: { create: entries },
            },
        });
        return true;
    }
    async lockOrder(tx, orderId) {
        await tx.$queryRaw `SELECT "id" FROM "orders" WHERE "id" = ${orderId}::uuid FOR UPDATE`;
    }
    async lockBooking(tx, bookingId) {
        await tx.$queryRaw `SELECT "id" FROM "capacity_bookings" WHERE "id" = ${bookingId}::uuid FOR UPDATE`;
    }
    async bookingEscrow(bookingId, client = this.prisma) {
        const [row] = await client.$queryRaw `
      SELECT COALESCE(SUM(e."amountMinor") FILTER (WHERE e."direction" = 'CREDIT'), 0)::bigint AS "credit",
             COALESCE(SUM(e."amountMinor") FILTER (WHERE e."direction" = 'DEBIT'), 0)::bigint AS "debit"
        FROM "escrow_ledger_entries" e
        JOIN "ledger_transactions" t ON t."id" = e."transactionId"
        JOIN "ledger_accounts" a ON a."id" = e."accountId"
       WHERE t."capacityBookingId" = ${bookingId}::uuid AND a."type" = 'BUYER_ESCROW'`;
        return (row?.credit ?? 0n) - (row?.debit ?? 0n);
    }
    async orderPosition(orderId, client = this.prisma) {
        const rows = await client.$queryRaw `
      SELECT a."type", e."direction", SUM(e."amountMinor")::bigint AS "total"
        FROM "escrow_ledger_entries" e
        JOIN "ledger_transactions" t ON t."id" = e."transactionId"
        JOIN "ledger_accounts" a ON a."id" = e."accountId"
       WHERE t."orderId" = ${orderId}::uuid
       GROUP BY a."type", e."direction"`;
        const sum = (type, direction) => rows.find((r) => r.type === type && r.direction === direction)?.total ?? 0n;
        const balance = (type) => normalBalance(type, sum(type, 'DEBIT'), sum(type, 'CREDIT'));
        return {
            escrow: balance('BUYER_ESCROW'),
            payable: balance('MANUFACTURER_PAYABLE'),
            revenue: balance('PLATFORM_REVENUE'),
            cash: balance('PLATFORM_CASH'),
            receivedIntoEscrow: sum('BUYER_ESCROW', 'CREDIT'),
            releasedToPayable: sum('MANUFACTURER_PAYABLE', 'CREDIT'),
            paidOut: sum('MANUFACTURER_PAYABLE', 'DEBIT'),
        };
    }
    async balances() {
        const rows = await this.prisma.$queryRaw `
      SELECT a."id", a."type", a."currency", a."companyId", a."logisticsPartnerId",
             COALESCE(SUM(e."amountMinor") FILTER (WHERE e."direction" = 'DEBIT'), 0)::bigint AS "debit",
             COALESCE(SUM(e."amountMinor") FILTER (WHERE e."direction" = 'CREDIT'), 0)::bigint AS "credit"
        FROM "ledger_accounts" a
        LEFT JOIN "escrow_ledger_entries" e ON e."accountId" = a."id"
       GROUP BY a."id"`;
        return rows.map((r) => ({ ...r, balance: normalBalance(r.type, r.debit, r.credit) }));
    }
};
LedgerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], LedgerService);
export { LedgerService };
//# sourceMappingURL=ledger.service.js.map