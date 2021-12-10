import { AuthApiRoute } from 'src/modules/shared/routes/api';
import { fetcher } from 'src/modules/shared/utils';

import { LoginRepository } from '../types/repositories';

export const LoginExpressRepository: LoginRepository = async (credentials) => {
  const response = await fetcher({
    input: AuthApiRoute.LOGIN,
    init: {
      method: 'POST',
      body: JSON.stringify(credentials),
    },
  });

  return (await response.json()) as ReturnType<LoginRepository>;
};
