import { AuthApiRoute } from 'src/modules/shared/routes/api';
import { ErrorResponse, SuccessfulResponse } from 'src/modules/shared/types';
import { baseHeaders } from 'src/modules/shared/utils/baseHeaders';
import { unexpectedError } from 'src/modules/shared/utils/unexpectedError';
import { RegisterRepository, RegisterResponse } from '../types/repositories';

export const RegisterExpressRepository: RegisterRepository = async (
  registerUserValues
) => {
  try {
    const response = await fetch(AuthApiRoute.REGISTER, {
      method: 'POST',
      headers: baseHeaders,
      body: JSON.stringify(registerUserValues),
    });

    return (await response.json()) as
      | SuccessfulResponse<RegisterResponse>
      | ErrorResponse;
  } catch (error) {
    console.log('RegisterExpressRepository', error);
    return unexpectedError;
  }
};
