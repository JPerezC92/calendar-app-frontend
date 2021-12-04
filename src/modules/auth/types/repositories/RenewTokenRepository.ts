import { ErrorResponse, SuccessfulResponse } from 'src/modules/shared/types';
import { User } from '..';

export interface RenewTokenResponse {
  user: User;
  token: string;
}

export type RenewTokenRepository = () => Promise<
  SuccessfulResponse<RenewTokenResponse> | ErrorResponse
>;
