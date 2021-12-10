import { ErrorResponse, SuccessfulResponse } from 'src/modules/shared/types';
import { CalendarEventDto } from '../../DTO';

export interface GetEventsRepository {
  (): Promise<SuccessfulResponse<CalendarEventDto[]> | ErrorResponse>;
}
