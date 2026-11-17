-- One monitoring add-on per order. In its own migration: the enum value it names is added by
-- the previous one, and a new enum value can only be used once that has committed.
CREATE UNIQUE INDEX "order_charges_one_monitoring_key" ON "order_charges"("orderId")
  WHERE "kind" = 'MONITORING_FEE';
