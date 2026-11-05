import { z } from 'zod';

/** Carrier references: letters, digits, dashes, slashes and spaces only (no free text). */
export const ShipmentReferenceSchema = z
  .string()
  .trim()
  .regex(/^[A-Za-z0-9][A-Za-z0-9 /-]{2,39}$/, { error: 'Letters, digits and dashes only' });
