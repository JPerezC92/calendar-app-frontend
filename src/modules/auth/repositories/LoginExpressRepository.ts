import { AuthApiRoute } from 'src/modules/shared/routes/api';
import { ErrorResponse, SuccessfulResponse } from 'src/modules/shared/types';
import { baseHeaders } from 'src/modules/shared/utils/baseHeaders';
import { unexpectedError } from 'src/modules/shared/utils/unexpectedError';

import { LoginRepository, LoginResponse } from '../types/repositories';

export const LoginExpressRepository: LoginRepository = async (credentials) => {
  try {
    const response = await fetch(`${AuthApiRoute.LOGIN}`, {
      method: 'POST',
      headers: baseHeaders,
      body: JSON.stringify(credentials),
    });

    return (await response.json()) as
      | SuccessfulResponse<LoginResponse>
      | ErrorResponse;
  } catch (error) {
    console.log('LoginExpressRepository', error);
    return unexpectedError;
  }
};
