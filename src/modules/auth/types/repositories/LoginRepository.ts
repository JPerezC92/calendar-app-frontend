import { ErrorResponse, SuccessfulResponse } from 'src/modules/shared/types';
import { Credentials, User } from '..';

export interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginRepository {
  (credentials: Credentials): Promise<
    SuccessfulResponse<LoginResponse> | ErrorResponse
  >;
}
