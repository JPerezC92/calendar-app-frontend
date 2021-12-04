import { CalendarEvent } from '.';

export type NewCalendarEvent = Omit<CalendarEvent, 'id' | 'userId'>;
