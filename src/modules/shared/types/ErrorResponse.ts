import { ApiResponse } from '.';

export interface ErrorResponse extends ApiResponse {
  success: false;
  message: string;
}
