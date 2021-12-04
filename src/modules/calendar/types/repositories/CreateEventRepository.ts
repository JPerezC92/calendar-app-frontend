import { ErrorResponse, SuccessfulResponse } from 'src/modules/shared/types';
import { CalendarEvent, NewCalendarEvent } from '..';

export interface CreateEventRepository {
  (newCalendarEvent: NewCalendarEvent): Promise<
    SuccessfulResponse<CalendarEvent> | ErrorResponse
  >;
}
