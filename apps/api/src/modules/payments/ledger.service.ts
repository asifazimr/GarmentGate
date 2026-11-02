import { Injectable } from '@nestjs/common';
import { convertMinor, type Currency, type UnitsPerUsd } from '@garmentgate/shared';
import type {
  LedgerAccountType,
  LedgerTransactionKind,
  Prisma,
} from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';

type Tx = Prisma.TransactionClient;

export interface LedgerLine {
  account: LedgerAccountType;
  /** Buyer company for BUYER_ESCROW, factory company for MANUFACTURER_PAYABLE; null for platform accounts. */
  companyId: string | null;
  direction: 'DEBIT' | 'CREDIT';
  amountMinor: bigint;
}

export interface Posting {
  kind: LedgerTransactionKind;
  /** Unique per business event: posting the same key twice is a no-op. */
  key: string;
  orderId: string;
  paymentId?: string | null;
  currency: Currency;
  description: string;
  rates: UnitsPerUsd;
  lines: LedgerLine[];
}

/** Assets are debit-normal; escrow, payable and revenue are credit-normal. */
const CREDIT_NORMAL: ReadonlySet<LedgerAccountType> = new Set([
  'BUYER_ESCROW',
  'MANUFACTURER_PAYABLE',
  'PLATFORM_REVENUE',
]);

export class UnbalancedPostingError extends Error {}

/** Balance of an account from its debits and credits, signed by its normal side. */
export function normalBalance(type: LedgerAccountType, debit: bigint, credit: bigint): bigint {
  return CREDIT_NORMAL.has(type) ? credit - debit : debit - credit;
}

/** A posting must balance and only move positive amounts. Pure, so it's unit tested. */
export function checkPosting(lines: LedgerLine[]): void {
  if (lines.length < 2) throw new UnbalancedPostingError('A posting needs at least two lines');
  let debits = 0n;
  let credits = 0n;
  for (const line of lines) {
    if (line.amountMinor <= 0n) throw new UnbalancedPostingError('Ledger amounts must be positive');
    if (line.direction === 'DEBIT') debits += line.amountMinor;
    else credits += line.amountMinor;
  }
  if (debits !== credits)
    throw new UnbalancedPostingError(`Unbalanced posting: ${String(debits)} ≠ ${String(credits)}`);
}

/**
 * The double-entry ledger. Postings are balanced (checked here and again by a deferred
 * database trigger), append-only (another trigger), in one currency (a third), idempotent by
 * key, and carry the USD value at the rate of the day.
 */
@Injectable()
export class LedgerService {
  constructor(private readonly prisma: PrismaService) {}

  async accountId(
    tx: Tx,
    type: LedgerAccountType,
    companyId: string | null,
    currency: Currency,
  ): Promise<string> {
    const existing = await tx.ledgerAccount.findFirst({
      where: { type, companyId, currency },
      select: { id: true },
    });
    if (existing) return existing.id;
    // Concurrent creators: the unique indexes let only one through; take whichever exists.
    await tx.$executeRaw`
      INSERT INTO "ledger_accounts" ("id", "type", "companyId", "currency", "createdAt")
      VALUES (gen_random_uuid(), ${type}::"LedgerAccountType", ${companyId}::uuid, ${currency}::"Currency", now())
      ON CONFLICT DO NOTHING`;
    const created = await tx.ledgerAccount.findFirstOrThrow({
      where: { type, companyId, currency },
      select: { id: true },
    });
    return created.id;
  }

  /** Posts a balanced transaction; returns false if this key was already posted. */
  async post(tx: Tx, posting: Posting): Promise<boolean> {
    const lines = posting.lines.filter((l) => l.amountMinor !== 0n);
    checkPosting(lines);
    const already = await tx.ledgerTransaction.findUnique({
      where: { idempotencyKey: posting.key },
      select: { id: true },
    });
    if (already) return false;
    const total = lines
      .filter((l) => l.direction === 'DEBIT')
      .reduce((a, l) => a + l.amountMinor, 0n);
    const entries = [];
    for (const line of lines) {
      entries.push({
        accountId: await this.accountId(tx, line.account, line.companyId, posting.currency),
        direction: line.direction,
        amountMinor: line.amountMinor,
      });
    }
    await tx.ledgerTransaction.create({
      data: {
        kind: posting.kind,
        idempotencyKey: posting.key,
        orderId: posting.orderId,
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

  /** Serializes money movements on one order (deposits, releases, refunds) inside a transaction. */
  async lockOrder(tx: Tx, orderId: string): Promise<void> {
    await tx.$queryRaw`SELECT "id" FROM "orders" WHERE "id" = ${orderId}::uuid FOR UPDATE`;
  }

  /** Signed balances of each account type for one order's postings. */
  async orderPosition(orderId: string, client: Tx | PrismaService = this.prisma) {
    const rows = await client.$queryRaw<
      { type: LedgerAccountType; direction: 'DEBIT' | 'CREDIT'; total: bigint }[]
    >`
      SELECT a."type", e."direction", SUM(e."amountMinor")::bigint AS "total"
        FROM "escrow_ledger_entries" e
        JOIN "ledger_transactions" t ON t."id" = e."transactionId"
        JOIN "ledger_accounts" a ON a."id" = e."accountId"
       WHERE t."orderId" = ${orderId}::uuid
       GROUP BY a."type", e."direction"`;
    const sum = (type: LedgerAccountType, direction: 'DEBIT' | 'CREDIT') =>
      rows.find((r) => r.type === type && r.direction === direction)?.total ?? 0n;
    const balance = (type: LedgerAccountType) =>
      normalBalance(type, sum(type, 'DEBIT'), sum(type, 'CREDIT'));
    return {
      escrow: balance('BUYER_ESCROW'),
      payable: balance('MANUFACTURER_PAYABLE'),
      revenue: balance('PLATFORM_REVENUE'),
      cash: balance('PLATFORM_CASH'),
      /** Into escrow, ever. */
      receivedIntoEscrow: sum('BUYER_ESCROW', 'CREDIT'),
      /** Into the factory's payable, ever. */
      releasedToPayable: sum('MANUFACTURER_PAYABLE', 'CREDIT'),
      paidOut: sum('MANUFACTURER_PAYABLE', 'DEBIT'),
    };
  }

  /** Every account's balance, and totals per currency (trial balance). */
  async balances() {
    const rows = await this.prisma.$queryRaw<
      {
        id: string;
        type: LedgerAccountType;
        currency: Currency;
        companyId: string | null;
        debit: bigint;
        credit: bigint;
      }[]
    >`
      SELECT a."id", a."type", a."currency", a."companyId",
             COALESCE(SUM(e."amountMinor") FILTER (WHERE e."direction" = 'DEBIT'), 0)::bigint AS "debit",
             COALESCE(SUM(e."amountMinor") FILTER (WHERE e."direction" = 'CREDIT'), 0)::bigint AS "credit"
        FROM "ledger_accounts" a
        LEFT JOIN "escrow_ledger_entries" e ON e."accountId" = a."id"
       GROUP BY a."id"`;
    return rows.map((r) => ({ ...r, balance: normalBalance(r.type, r.debit, r.credit) }));
  }
}
