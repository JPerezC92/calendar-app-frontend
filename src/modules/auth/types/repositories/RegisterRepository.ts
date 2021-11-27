import { ErrorResponse, SuccessfulResponse } from 'src/modules/shared/types';
import { RegisterUserValues, User } from '..';

export type RegisterResponse = {
  user: User;
  token: string;
};

export type RegisterRepository = (
  registerUserValues: RegisterUserValues
) => Promise<SuccessfulResponse<RegisterResponse> | ErrorResponse>;
