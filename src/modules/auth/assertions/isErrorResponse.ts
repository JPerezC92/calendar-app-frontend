import { ApiResponse, ErrorResponse } from 'src/modules/shared/types';

export function isErrorResponse(
  response: ApiResponse
): response is ErrorResponse {
  return response.success === false;
}
