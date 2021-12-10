import { CalendarEventDto } from '../DTO';

export type CalendarEventFormValues = Omit<CalendarEventDto, 'id' | 'user'>;
