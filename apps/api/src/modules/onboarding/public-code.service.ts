import { Injectable } from '@nestjs/common';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';

type Tx = Prisma.TransactionClient | PrismaService;

/** Allocates human-readable codes like MFR-BD-0421 / BYR-US-0012 from atomic per-prefix counters. */
@Injectable()
export class PublicCodeService {
  constructor(private readonly prisma: PrismaService) {}

  async next(kind: 'MFR' | 'BYR', country: string, tx: Tx = this.prisma): Promise<string> {
    const prefix = `${kind}-${country.toUpperCase()}`;
    const [row] = await tx.$queryRaw<{ lastValue: number }[]>`
      INSERT INTO "code_sequences" ("prefix", "lastValue") VALUES (${prefix}, 1)
      ON CONFLICT ("prefix") DO UPDATE SET "lastValue" = "code_sequences"."lastValue" + 1
      RETURNING "lastValue"`;
    if (!row) throw new Error(`Could not allocate a code for ${prefix}`);
    return `${prefix}-${String(row.lastValue).padStart(4, '0')}`;
  }

  /** e.g. sequential('RFQ-2026', 5) → RFQ-2026-00043 */
  async sequential(prefix: string, pad: number, tx: Tx = this.prisma): Promise<string> {
    const [row] = await tx.$queryRaw<{ lastValue: number }[]>`
      INSERT INTO "code_sequences" ("prefix", "lastValue") VALUES (${prefix}, 1)
      ON CONFLICT ("prefix") DO UPDATE SET "lastValue" = "code_sequences"."lastValue" + 1
      RETURNING "lastValue"`;
    if (!row) throw new Error(`Could not allocate a code for ${prefix}`);
    return `${prefix}-${String(row.lastValue).padStart(pad, '0')}`;
  }
}
