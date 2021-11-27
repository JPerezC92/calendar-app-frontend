import { ErrorResponse, SuccessfulResponse } from 'src/modules/shared/types';
import { CalendarEvent } from '..';

export interface GetEventsRepository {
  (): Promise<SuccessfulResponse<CalendarEvent[]> | ErrorResponse>;
}
