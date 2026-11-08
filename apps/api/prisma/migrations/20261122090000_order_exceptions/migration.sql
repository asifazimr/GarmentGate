-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "delayAlertedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "order_factory_changes" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "fromProfileId" UUID NOT NULL,
    "toProfileId" UUID NOT NULL,
    "fromUnitPriceMinor" INTEGER NOT NULL,
    "toUnitPriceMinor" INTEGER NOT NULL,
    "fundedMinor" BIGINT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdById" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_factory_changes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "order_factory_changes_orderId_idx" ON "order_factory_changes"("orderId");

-- AddForeignKey
ALTER TABLE "order_factory_changes" ADD CONSTRAINT "order_factory_changes_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Hand-written: a change goes to another factory, never negative funding.
ALTER TABLE "order_factory_changes" ADD CONSTRAINT "order_factory_changes_check" CHECK ("fromProfileId" <> "toProfileId" AND "fundedMinor" >= 0);
