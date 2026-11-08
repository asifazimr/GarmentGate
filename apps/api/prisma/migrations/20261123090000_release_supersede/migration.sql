-- DropIndex
DROP INDEX "order_releases_orderId_trigger_key";

-- AlterTable
ALTER TABLE "order_releases" ADD COLUMN     "supersededAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "order_releases_orderId_trigger_idx" ON "order_releases"("orderId", "trigger");


-- Hand-written: one live release per order and moment; a replaced factory's releases are
-- superseded (kept for its payouts) and don't count.
CREATE UNIQUE INDEX "order_releases_live_trigger_key"
  ON "order_releases" ("orderId", "trigger") WHERE "supersededAt" IS NULL;
