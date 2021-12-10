import { ErrorResponse, SuccessfulResponse } from 'src/modules/shared/types';
import { CalendarEventDto } from '../../DTO';

export interface UpdateEventRepository {
  (calendarEvent: CalendarEventDto): Promise<
    SuccessfulResponse<CalendarEventDto> | ErrorResponse
  >;
}
