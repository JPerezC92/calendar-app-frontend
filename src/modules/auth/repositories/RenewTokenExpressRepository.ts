import { AuthApiRoute } from 'src/modules/shared/routes/api';
import { LocalStorageService } from 'src/modules/shared/services';
import { baseHeaders, unexpectedError } from 'src/modules/shared/utils';
import { RenewTokenRepository } from '../types/repositories';

export const RenewTokenExpressRepository: RenewTokenRepository = async () => {
  try {
    const response = await fetch(AuthApiRoute.RENEW_TOKEN, {
      headers: {
        ...baseHeaders,
        'x-access-token': LocalStorageService.get('auth')?.token ?? '',
      },
    });

    return (await response.json()) as ReturnType<RenewTokenRepository>;
  } catch (error) {
    console.log(error);
    return unexpectedError;
  }
};
