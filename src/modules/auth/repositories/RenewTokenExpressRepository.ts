import { AuthApiRoute } from 'src/modules/shared/routes/api';
import { fetcher } from 'src/modules/shared/utils';
import { RenewTokenRepository } from '../types/repositories';

export const RenewTokenExpressRepository: RenewTokenRepository = async () => {
  const response = await fetcher({
    input: AuthApiRoute.RENEW_TOKEN,
    withToken: true,
  });

  return (await response.json()) as ReturnType<RenewTokenRepository>;
};
