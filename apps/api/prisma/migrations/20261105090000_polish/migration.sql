-- AlterTable
ALTER TABLE "users" ADD COLUMN     "displayCurrency" "Currency";

-- CreateIndex
CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");

-- CreateIndex
CREATE INDEX "notifications_userId_createdAt_idx" ON "notifications"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "orders_buyerCompanyId_manufacturerProfileId_status_idx" ON "orders"("buyerCompanyId", "manufacturerProfileId", "status");

-- CreateIndex
CREATE INDEX "orders_confirmedAt_idx" ON "orders"("confirmedAt");

-- CreateIndex
CREATE INDEX "rfqs_publishedAt_idx" ON "rfqs"("publishedAt");
