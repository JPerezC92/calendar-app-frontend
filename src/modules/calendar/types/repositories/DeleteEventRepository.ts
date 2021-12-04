import { ErrorResponse, SuccessfulResponse } from 'src/modules/shared/types';

export interface DeleteEventRepository {
  (calendarEventId: string): Promise<
    SuccessfulResponse<string> | ErrorResponse
  >;
}
