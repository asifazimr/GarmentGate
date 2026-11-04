import { ConflictException } from '@nestjs/common';
import type { Prisma } from '../../generated/prisma/client.js';

type Tx = Prisma.TransactionClient;

/**
 * Takes minutes from an open window in one statement: the row is locked by the UPDATE and the
 * condition re-checked on the locked row, so two buyers can't both take the last minutes (the
 * `bookedMinutes <= totalMinutes` check constraint backs this up). Returns false when they
 * don't fit (any more).
 */
export async function reserveMinutes(tx: Tx, slotId: string, minutes: number): Promise<boolean> {
  const rows = await tx.$queryRaw<{ id: string }[]>`
    UPDATE "capacity_slots" s
       SET "bookedMinutes" = s."bookedMinutes" + ${minutes}, "updatedAt" = now()
      FROM "production_lines" l
     WHERE s."id" = ${slotId}::uuid
       AND l."id" = s."lineId"
       AND l."status" = 'ACTIVE'
       AND s."status" = 'OPEN'
       AND s."endDate" >= CURRENT_DATE
       AND s."bookedMinutes" + ${minutes} <= s."totalMinutes"
    RETURNING s."id"`;
  return rows.length === 1;
}

/** Every free minute of a window (whole-window bookings), or 0 when someone holds part of it. */
export async function reserveWholeWindow(tx: Tx, slotId: string): Promise<number> {
  const rows = await tx.$queryRaw<{ minutes: number }[]>`
    UPDATE "capacity_slots" s
       SET "bookedMinutes" = s."totalMinutes", "updatedAt" = now()
      FROM "production_lines" l
     WHERE s."id" = ${slotId}::uuid
       AND l."id" = s."lineId"
       AND l."status" = 'ACTIVE'
       AND s."status" = 'OPEN'
       AND s."endDate" >= CURRENT_DATE
       AND s."bookedMinutes" = 0
    RETURNING s."totalMinutes" AS "minutes"`;
  return rows[0]?.minutes ?? 0;
}

/**
 * Hands `minutes` of a booking back to its windows (latest window first), or all of them.
 * Allocations shrink with it, so releasing twice gives nothing back twice.
 */
export async function releaseMinutes(
  tx: Tx,
  bookingId: string,
  minutes: number | 'ALL',
): Promise<number> {
  const allocations = await tx.capacityBookingAllocation.findMany({
    where: { bookingId },
    orderBy: { slot: { startDate: 'desc' } },
  });
  let left = minutes === 'ALL' ? Number.POSITIVE_INFINITY : minutes;
  let released = 0;
  for (const a of allocations) {
    if (left <= 0) break;
    const take = Math.min(a.minutes, left);
    const updated = await tx.$executeRaw`
      UPDATE "capacity_slots" SET "bookedMinutes" = "bookedMinutes" - ${take}, "updatedAt" = now()
       WHERE "id" = ${a.slotId}::uuid AND "bookedMinutes" >= ${take}`;
    if (updated !== 1) throw new ConflictException('Window minutes out of step: contact support');
    if (take === a.minutes) await tx.capacityBookingAllocation.delete({ where: { id: a.id } });
    else
      await tx.capacityBookingAllocation.update({
        where: { id: a.id },
        data: { minutes: a.minutes - take },
      });
    left -= take;
    released += take;
  }
  return released;
}
