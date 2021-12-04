import { EventApiRoute } from 'src/modules/shared/routes/api';
import { fetcher } from 'src/modules/shared/utils';
import { GetEventsRepository } from '../types/repositories';

export const GetEventsExpressRepository: GetEventsRepository = async () => {
  const response = await fetcher({
    input: EventApiRoute.GET_ALL,
    withToken: true,
  });

  return response.json() as ReturnType<GetEventsRepository>;
};
