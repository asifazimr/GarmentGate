import { z } from 'zod';

/** Route params shared by the order controllers (orders, QC, shipping). */
export const CodeSchema = z.string().regex(/^ORD-\d{4}-\d{4,}$/, { error: 'Unknown order' });
export const IdSchema = z.uuid();
