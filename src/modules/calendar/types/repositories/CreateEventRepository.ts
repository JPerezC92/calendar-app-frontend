import { ErrorResponse, SuccessfulResponse } from 'src/modules/shared/types';
import { CalendarEventFormValues } from '..';
import { CalendarEventDto } from '../../DTO';

export interface CreateEventRepository {
  (newCalendarEvent: CalendarEventFormValues): Promise<
    SuccessfulResponse<CalendarEventDto> | ErrorResponse
  >;
}
