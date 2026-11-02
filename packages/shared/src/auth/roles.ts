import { z } from 'zod';

/** INSPECTOR: GarmentGate's QC inspectors (staff-side, no company). */
export const ROLES = ['BUYER', 'MANUFACTURER', 'ADMIN', 'INSPECTOR'] as const;

export const RoleSchema = z.enum(ROLES);
export type Role = z.infer<typeof RoleSchema>;
