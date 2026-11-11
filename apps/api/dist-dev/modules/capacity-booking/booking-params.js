import { z } from 'zod';
export const BookingCodeSchema = z
    .string()
    .regex(/^CB-\d{4}-\d{5,}$/, { error: 'Unknown booking' });
export const PartnershipCodeSchema = z
    .string()
    .regex(/^CP-\d{4}-\d{5,}$/, { error: 'Unknown partnership' });
//# sourceMappingURL=booking-params.js.map