-- AlterTable
ALTER TABLE "account_warnings" ADD COLUMN     "issuedById" UUID,
ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "margin_rules" ADD COLUMN     "commissionBps" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "repeatCommissionBps" INTEGER;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "commissionBps" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "commissionMinor" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "repeatOrder" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "suspendedAt" TIMESTAMP(3),
ADD COLUMN     "suspendedReason" TEXT;

-- AddForeignKey
ALTER TABLE "account_warnings" ADD CONSTRAINT "account_warnings_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Commission is a share of the factory total: 0–100%, and a repeat rate never above the normal one.
ALTER TABLE "margin_rules"
  ADD CONSTRAINT "margin_rules_commission_bps_check" CHECK ("commissionBps" BETWEEN 0 AND 10000),
  ADD CONSTRAINT "margin_rules_repeat_commission_check"
    CHECK ("repeatCommissionBps" IS NULL OR "repeatCommissionBps" BETWEEN 0 AND "commissionBps");

-- The commission withheld never exceeds what the factory is owed.
ALTER TABLE "orders"
  ADD CONSTRAINT "orders_commission_check"
    CHECK ("commissionBps" BETWEEN 0 AND 10000
      AND "commissionMinor" >= 0
      AND "commissionMinor" <= "manufacturerTotalMinor");
