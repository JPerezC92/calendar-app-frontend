import { AuthApiRoute } from 'src/modules/shared/routes/api';
import { fetcher } from 'src/modules/shared/utils';
import { baseHeaders } from 'src/modules/shared/utils/baseHeaders';
import { RegisterRepository } from '../types/repositories';

export const RegisterExpressRepository: RegisterRepository = async (
  registerUserValues
) => {
  const response = await fetcher({
    input: AuthApiRoute.REGISTER,
    init: {
      method: 'POST',
      headers: baseHeaders,
      body: JSON.stringify(registerUserValues),
    },
  });

  return (await response.json()) as ReturnType<RegisterRepository>;
};
