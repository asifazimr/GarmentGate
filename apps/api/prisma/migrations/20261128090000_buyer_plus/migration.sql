BEGIN;

-- One subscriptions table for factory plans and buyers' GarmentGate Plus.
CREATE TYPE "SubscriptionPlan" AS ENUM ('PRO', 'PREMIUM', 'PLUS');

ALTER TABLE "factory_subscriptions" RENAME TO "plan_subscriptions";
ALTER TABLE "factory_subscription_invoices" RENAME TO "plan_invoices";

ALTER TABLE "plan_subscriptions" RENAME CONSTRAINT "factory_subscriptions_pkey" TO "plan_subscriptions_pkey";
ALTER TABLE "plan_subscriptions" RENAME CONSTRAINT "factory_subscriptions_manufacturerProfileId_fkey" TO "plan_subscriptions_manufacturerProfileId_fkey";
ALTER INDEX "factory_subscriptions_stripeSubscriptionId_key" RENAME TO "plan_subscriptions_stripeSubscriptionId_key";
ALTER INDEX "factory_subscriptions_stripeCheckoutSessionId_key" RENAME TO "plan_subscriptions_stripeCheckoutSessionId_key";
ALTER INDEX "factory_subscriptions_manufacturerProfileId_status_idx" RENAME TO "plan_subscriptions_manufacturerProfileId_status_idx";
ALTER INDEX "factory_subscriptions_live_key" RENAME TO "plan_subscriptions_factory_live_key";

ALTER TABLE "plan_invoices" RENAME CONSTRAINT "factory_subscription_invoices_pkey" TO "plan_invoices_pkey";
ALTER TABLE "plan_invoices" RENAME CONSTRAINT "factory_subscription_invoices_subscriptionId_fkey" TO "plan_invoices_subscriptionId_fkey";
ALTER TABLE "plan_invoices" RENAME CONSTRAINT "factory_subscription_invoices_amount_check" TO "plan_invoices_amount_check";
ALTER INDEX "factory_subscription_invoices_stripeInvoiceId_key" RENAME TO "plan_invoices_stripeInvoiceId_key";
ALTER INDEX "factory_subscription_invoices_subscriptionId_idx" RENAME TO "plan_invoices_subscriptionId_idx";

ALTER TABLE "plan_subscriptions" DROP CONSTRAINT "factory_subscriptions_paid_tier_check";
ALTER TABLE "plan_subscriptions" RENAME CONSTRAINT "factory_subscriptions_amount_check" TO "plan_subscriptions_amount_check";
ALTER TABLE "plan_subscriptions" RENAME CONSTRAINT "factory_subscriptions_source_check" TO "plan_subscriptions_source_check";
ALTER TABLE "plan_subscriptions"
  ALTER COLUMN "tier" TYPE "SubscriptionPlan" USING "tier"::text::"SubscriptionPlan",
  ALTER COLUMN "manufacturerProfileId" DROP NOT NULL,
  ADD COLUMN "buyerCompanyId" UUID;

ALTER TABLE "plan_subscriptions" ADD CONSTRAINT "plan_subscriptions_buyerCompanyId_fkey"
  FOREIGN KEY ("buyerCompanyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
CREATE INDEX "plan_subscriptions_buyerCompanyId_status_idx" ON "plan_subscriptions"("buyerCompanyId", "status");
CREATE UNIQUE INDEX "plan_subscriptions_buyer_live_key" ON "plan_subscriptions"("buyerCompanyId")
  WHERE "status" IN ('ACTIVE', 'PAST_DUE');

-- Exactly one owner, and the plan fits it: factories Pro/Premium, buyers Plus.
ALTER TABLE "plan_subscriptions" ADD CONSTRAINT "plan_subscriptions_owner_check" CHECK (
  ("manufacturerProfileId" IS NOT NULL AND "buyerCompanyId" IS NULL AND "tier" IN ('PRO', 'PREMIUM'))
  OR ("buyerCompanyId" IS NOT NULL AND "manufacturerProfileId" IS NULL AND "tier" = 'PLUS')
);

-- PlanTier is the factory tier only (subscriptions use SubscriptionPlan).
ALTER TABLE "buyer_profiles" ADD COLUMN "plusActive" BOOLEAN NOT NULL DEFAULT false;

COMMIT;
