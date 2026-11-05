-- Retire the factory-booked shipments: every order now ships through GarmentGate logistics.
-- Old shipments become read-only historical logistics shipments (with their references,
-- dates and papers), then the old tables go. One transaction: all of it or nothing.

BEGIN;

ALTER TABLE "logistics_shipments" ADD COLUMN "historical" BOOLEAN NOT NULL DEFAULT false;

-- Who "created" the converted records: the first admin, else the order's buyer.
CREATE TEMP TABLE _old_shipments AS
SELECT
  s.*,
  gen_random_uuid() AS new_id,
  gen_random_uuid() AS leg_id,
  o."buyerCompanyId",
  o.currency,
  o."destinationCountry" AS order_destination,
  COALESCE(s.incoterm, o.incoterm) AS terms,
  mc.country AS origin_country,
  COALESCE(
    (SELECT u.id FROM users u WHERE u.role = 'ADMIN' ORDER BY u."createdAt" LIMIT 1),
    (SELECT u.id FROM users u WHERE u."companyId" = o."buyerCompanyId" ORDER BY u."createdAt" LIMIT 1)
  ) AS actor,
  EXTRACT(YEAR FROM COALESCE(s."shippedAt", s."createdAt"))::int AS yr,
  ROW_NUMBER() OVER (
    PARTITION BY EXTRACT(YEAR FROM COALESCE(s."shippedAt", s."createdAt"))
    ORDER BY COALESCE(s."shippedAt", s."createdAt"), s.id
  ) AS n
FROM shipments s
JOIN orders o ON o.id = s."orderId"
JOIN manufacturer_profiles mp ON mp.id = o."manufacturerProfileId"
JOIN companies mc ON mc.id = mp."companyId";

-- SHP-YYYY-NNNNN codes continue each year's sequence.
INSERT INTO code_sequences (prefix, "lastValue")
SELECT DISTINCT 'SHP-' || yr, 0 FROM _old_shipments
ON CONFLICT (prefix) DO NOTHING;

CREATE TEMP TABLE _codes AS
SELECT os.id, 'SHP-' || os.yr || '-' || LPAD((cs."lastValue" + os.n)::text, 5, '0') AS code
FROM _old_shipments os
JOIN code_sequences cs ON cs.prefix = 'SHP-' || os.yr;

UPDATE code_sequences cs
SET "lastValue" = cs."lastValue" + x.cnt
FROM (SELECT 'SHP-' || yr AS prefix, COUNT(*)::int AS cnt FROM _old_shipments GROUP BY yr) x
WHERE cs.prefix = x.prefix;

INSERT INTO logistics_shipments (
  id, code, "buyerCompanyId", mode, incoterm, status, "shipperMode", "originHubId",
  "originCountry", "destinationCountry", "destinationPort", "consolidationId", currency,
  "buyerPriceMinor", "partnerCostMinor", "insuranceMinor", cartons, "grossWeightGrams",
  "volumeLitres", etd, eta, "departedAt", "deliveredAt", historical, "createdById",
  "createdAt", "updatedAt"
)
SELECT
  os.new_id,
  c.code,
  os."buyerCompanyId",
  (CASE os.mode::text
     WHEN 'SEA' THEN CASE WHEN os."containerNumber" IS NOT NULL THEN 'SEA_FCL' ELSE 'SEA_LCL' END
     WHEN 'AIR' THEN 'AIR'
     WHEN 'COURIER' THEN 'SAMPLE_COURIER'
     ELSE 'DOMESTIC'
   END)::"LogisticsMode",
  os.terms,
  (CASE os.status::text
     WHEN 'PENDING' THEN 'PLANNED'
     WHEN 'AT_PORT' THEN 'AT_DESTINATION'
     ELSE os.status::text
   END)::"LogisticsShipmentStatus",
  'GARMENT_GATE_EXPORTER',
  NULL,
  os.origin_country,
  os.order_destination,
  os."destinationPort",
  NULL,
  os.currency,
  0, 0, 0,
  COALESCE(os.cartons, 0),
  COALESCE(os."grossWeightKg", 0) * 1000,
  0,
  os.etd, os.eta, os."shippedAt", os."deliveredAt",
  true,
  os.actor,
  os."createdAt", os."updatedAt"
FROM _old_shipments os
JOIN _codes c ON c.id = os.id;

INSERT INTO logistics_shipment_orders (
  "shipmentId", "orderId", active, cartons, "grossWeightGrams", "volumeLitres",
  "buyerShareMinor", "costShareMinor"
)
SELECT
  os.new_id, os."orderId",
  NOT EXISTS (
    SELECT 1 FROM logistics_shipment_orders l WHERE l."orderId" = os."orderId" AND l.active
  ),
  COALESCE(os.cartons, 0), COALESCE(os."grossWeightKg", 0) * 1000, 0, 0, 0
FROM _old_shipments os;

INSERT INTO shipment_legs (
  id, "shipmentId", sequence, kind, status, "partnerId", "fromLabel", "toLabel", carrier,
  "trackingNumber", "containerNumber", "transportDocNo", "costMinor", etd, eta,
  "departedAt", "arrivedAt", "createdAt", "updatedAt"
)
SELECT
  os.leg_id, os.new_id, 1, 'PORT_TO_PORT',
  (CASE os.status::text
     WHEN 'DELIVERED' THEN 'COMPLETED'
     WHEN 'BOOKED' THEN 'BOOKED'
     WHEN 'PENDING' THEN 'PENDING'
     ELSE 'IN_TRANSIT'
   END)::"ShipmentLegStatus",
  NULL,
  COALESCE(os."originPort", 'Origin'),
  COALESCE(os."destinationPort", 'Destination'),
  os.carrier, os."trackingNumber", os."containerNumber", os."transportDocNo",
  NULL, os.etd, os.eta, os."shippedAt", os."deliveredAt", os."createdAt", os."updatedAt"
FROM _old_shipments os;

INSERT INTO shipment_events (
  id, "shipmentId", "legId", status, source, location, "publicNote", "internalNote",
  "occurredAt", "createdById", "createdAt"
)
SELECT
  gen_random_uuid(), os.new_id, os.leg_id,
  (CASE os.status::text
     WHEN 'PENDING' THEN 'PLANNED'
     WHEN 'AT_PORT' THEN 'AT_DESTINATION'
     ELSE os.status::text
   END)::"LogisticsShipmentStatus",
  'SYSTEM', NULL,
  'Shipped on the factory''s booking, before GarmentGate logistics.',
  'Converted from the retired factory-booked shipment'
    || COALESCE('; forwarder: ' || os.forwarder, '') || '.',
  COALESCE(os."shippedAt", os."createdAt"), os.actor, now()
FROM _old_shipments os;

INSERT INTO shipment_uploads (
  id, "shipmentId", "legId", "fileId", kind, "uploadedById", "buyerVisible", "publishedAt",
  "createdAt"
)
SELECT
  gen_random_uuid(), os.new_id, os.leg_id, d."fileId",
  (CASE d.type::text
     WHEN 'BILL_OF_LADING' THEN 'BILL_OF_LADING'
     WHEN 'AIRWAY_BILL' THEN 'AIRWAY_BILL'
     ELSE 'OTHER'
   END)::"ShipmentUploadKind",
  COALESCE(f."uploadedById", os.actor),
  d."buyerVisible",
  CASE WHEN d."buyerVisible" THEN d."createdAt" END,
  d."createdAt"
FROM shipment_documents d
JOIN _old_shipments os ON os.id = d."shipmentId"
JOIN file_assets f ON f.id = d."fileId";

DROP TABLE _codes;
DROP TABLE _old_shipments;

-- The old tables and types.
ALTER TABLE "shipment_documents" DROP CONSTRAINT "shipment_documents_fileId_fkey";
ALTER TABLE "shipment_documents" DROP CONSTRAINT "shipment_documents_shipmentId_fkey";
ALTER TABLE "shipments" DROP CONSTRAINT "shipments_orderId_fkey";
DROP TABLE "shipment_documents";
DROP TABLE "shipments";
DROP TYPE "ShipmentDocumentType";
DROP TYPE "ShipmentMode";
DROP TYPE "ShipmentStatus";

COMMIT;
