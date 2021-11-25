import { ApiResponse } from '.';

export interface SuccessfulResponse<Payload = void> extends ApiResponse {
  success: true;
  payload: Payload;
}
