import { ErrorResponse, SuccessfulResponse } from 'src/modules/shared/types';
import { CalendarEvent, CalendarEventDTO } from '../../core/Domain';

export interface UpdateEventRepository {
  (calendarEvent: CalendarEvent): Promise<
    SuccessfulResponse<CalendarEventDTO> | ErrorResponse
  >;
}
