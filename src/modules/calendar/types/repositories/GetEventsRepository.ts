import { ErrorResponse, SuccessfulResponse } from 'src/modules/shared/types';
import { CalendarEventDTO } from '../../core/Domain';

export interface GetEventsRepository {
  (): Promise<SuccessfulResponse<CalendarEventDTO[]> | ErrorResponse>;
}
