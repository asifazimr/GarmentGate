-- AlterTable
ALTER TABLE "inspections" ADD COLUMN     "assignedAt" TIMESTAMP(3);


-- Backfill: assignments made before this column existed count from the last update.
UPDATE "inspections" SET "assignedAt" = "updatedAt" WHERE "inspectorId" IS NOT NULL AND "assignedAt" IS NULL;
