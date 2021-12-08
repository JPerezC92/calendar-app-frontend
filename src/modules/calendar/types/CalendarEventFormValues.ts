import { CalendarEventDTO } from '../core/Domain';

export type CalendarEventFormValues = Omit<CalendarEventDTO, 'id' | 'userId'>;
