import { z } from 'zod';

/**
 * INSPECTOR: GarmentGate's QC inspectors (staff-side, no company).
 * PARTNER: staff of a logistics partner (no company; they only see GarmentGate's bookings).
 */
export const ROLES = ['BUYER', 'MANUFACTURER', 'ADMIN', 'INSPECTOR', 'PARTNER'] as const;

export const RoleSchema = z.enum(ROLES);
export type Role = z.infer<typeof RoleSchema>;
