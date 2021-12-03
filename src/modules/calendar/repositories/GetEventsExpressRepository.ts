import { getToken } from 'src/modules/auth/utils';
import { EventApiRoute } from 'src/modules/shared/routes/api';
import { baseHeaders, unexpectedError } from 'src/modules/shared/utils';
import { GetEventsRepository } from '../types/repositories';

export const GetEventsExpressRepository: GetEventsRepository = async () => {
  try {
    const response = await fetch(EventApiRoute.GET_ALL, {
      method: 'GET',
      headers: { ...baseHeaders, 'x-access-token': getToken() },
    });

    return response.json() as ReturnType<GetEventsRepository>;
  } catch (error) {
    console.log('GetEventsExpressRepository', error);
    return unexpectedError;
  }
};
