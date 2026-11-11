import { ConflictException } from '@nestjs/common';
export async function reserveMinutes(tx, slotId, minutes) {
    const rows = await tx.$queryRaw `
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
export async function reserveWholeWindow(tx, slotId) {
    const rows = await tx.$queryRaw `
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
export async function releaseMinutes(tx, bookingId, minutes) {
    const allocations = await tx.capacityBookingAllocation.findMany({
        where: { bookingId },
        orderBy: { slot: { startDate: 'desc' } },
    });
    let left = minutes === 'ALL' ? Number.POSITIVE_INFINITY : minutes;
    let released = 0;
    for (const a of allocations) {
        if (left <= 0)
            break;
        const take = Math.min(a.minutes, left);
        const updated = await tx.$executeRaw `
      UPDATE "capacity_slots" SET "bookedMinutes" = "bookedMinutes" - ${take}, "updatedAt" = now()
       WHERE "id" = ${a.slotId}::uuid AND "bookedMinutes" >= ${take}`;
        if (updated !== 1)
            throw new ConflictException('Window minutes out of step: contact support');
        if (take === a.minutes)
            await tx.capacityBookingAllocation.delete({ where: { id: a.id } });
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
//# sourceMappingURL=allocation.js.map