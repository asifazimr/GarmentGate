import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  type AdminBankAccount,
  type BankAccountStatus,
  type BankDetails,
  type FactoryBankAccountDto,
  type FactoryBankAccountView,
  maskAccount,
  type ReviewBankAccountDto,
} from '@garmentgate/shared';
import type { FactoryBankAccount, Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { actorOf } from '../orders/orders.service.js';

const LIVE: BankAccountStatus[] = ['PENDING_REVIEW', 'VERIFIED'];
const squash = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

export function bankDetails(a: FactoryBankAccount): BankDetails {
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

/**
 * Factories' payout bank accounts. A factory submits its details (any change replaces the
 * previous account and needs staff verification again: changed bank details are a classic
 * fraud route); staff verify them against the KYC'd legal name; payouts only go to a verified
 * account. Never part of anything a buyer receives.
 */
@Injectable()
export class BankAccountsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifier: Notifier,
    private readonly audit: AuditService,
  ) {}

  async mine(actor: ChatActor): Promise<FactoryBankAccountView | null> {
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

  async submit(actor: ChatActor, dto: FactoryBankAccountDto): Promise<void> {
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

  async list(): Promise<AdminBankAccount[]> {
    const rows = await this.prisma.factoryBankAccount.findMany({
      where: { status: { not: 'REPLACED' } },
      orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
      take: 500,
    });
    const companies = new Map(
      (
        await this.prisma.company.findMany({
          where: { id: { in: [...new Set(rows.map((r) => r.companyId))] } },
          select: {
            id: true,
            legalName: true,
            tradeName: true,
            country: true,
            manufacturerProfile: { select: { publicCode: true } },
          },
        })
      ).map((c) => [c.id, c]),
    );
    return rows.map((r) => {
      const c = companies.get(r.companyId);
      const names = [c?.legalName, c?.tradeName].filter((x): x is string => !!x).map(squash);
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

  async review(adminId: string, id: string, dto: ReviewBankAccountDto): Promise<void> {
    const status: BankAccountStatus = dto.decision === 'VERIFY' ? 'VERIFIED' : 'REJECTED';
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
      action:
        status === 'VERIFIED' ? 'payments.bank_account_verified' : 'payments.bank_account_rejected',
      entityType: 'FactoryBankAccount',
      entityId: id,
      metadata: { note: dto.note ?? null },
    });
    await this.notifier.notify({
      to: { companyId: row.companyId },
      type: 'PAYMENT_UPDATE',
      title:
        status === 'VERIFIED'
          ? 'Your payout bank account is verified'
          : 'Check your payout bank details',
      body:
        status === 'VERIFIED'
          ? `GarmentGate pays you to the account ending ${row.accountNumber.slice(-4)}.`
          : `GarmentGate couldn’t verify them: ${dto.note ?? ''}`,
    });
  }

  /** The account a payout to this factory goes to, or null when none is verified. */
  async verifiedFor(
    companyId: string,
    client: Prisma.TransactionClient = this.prisma,
  ): Promise<FactoryBankAccount | null> {
    return client.factoryBankAccount.findFirst({ where: { companyId, status: 'VERIFIED' } });
  }

  private factoryCompany(actor: ChatActor): string {
    if (actorOf(actor) !== 'MANUFACTURER' || !actor.companyId)
      throw new ForbiddenException('Factories only');
    return actor.companyId;
  }
}
