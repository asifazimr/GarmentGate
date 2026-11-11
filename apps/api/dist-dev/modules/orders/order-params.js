import { z } from 'zod';
export const CodeSchema = z.string().regex(/^ORD-\d{4}-\d{4,}$/, { error: 'Unknown order' });
export const IdSchema = z.uuid();
//# sourceMappingURL=order-params.js.map