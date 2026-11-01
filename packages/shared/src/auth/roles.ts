import { z } from 'zod';

export const ROLES = ['BUYER', 'MANUFACTURER', 'ADMIN'] as const;

export const RoleSchema = z.enum(ROLES);
export type Role = z.infer<typeof RoleSchema>;
