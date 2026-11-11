import { type LineCalendarDay } from '@garmentgate/shared';
export declare function spread(total: number, n: number): number[];
export interface CalendarLine {
    dailySamMinutes: number;
    workingDays: readonly number[];
}
export interface CalendarSlot {
    id: string;
    startDate: Date;
    endDate: Date;
    totalMinutes: number;
    bookedMinutes: number;
    status: 'OPEN' | 'CLOSED';
}
export declare function lineCalendarDays(line: CalendarLine, slots: readonly CalendarSlot[], from: string, days: number): LineCalendarDay[];
