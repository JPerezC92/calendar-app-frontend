import { ErrorResponse, SuccessfulResponse } from 'src/modules/shared/types';
import { CalendarEvent } from '..';

export interface UpdateEventRepository {
  (calendarEvent: Omit<CalendarEvent, 'userId'>): Promise<
    SuccessfulResponse<CalendarEvent> | ErrorResponse
  >;
}
