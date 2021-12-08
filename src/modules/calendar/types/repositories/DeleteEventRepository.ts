import { ErrorResponse, SuccessfulResponse } from 'src/modules/shared/types';
import { CalendarEvent } from '../../core/Domain';

export interface DeleteEventRepository {
  (calendarEvent: CalendarEvent): Promise<
    SuccessfulResponse<string> | ErrorResponse
  >;
}
