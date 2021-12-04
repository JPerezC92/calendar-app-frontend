import { EventApiRoute } from 'src/modules/shared/routes/api';
import { fetcher } from 'src/modules/shared/utils';
import { CreateEventRepository } from '../types/repositories';

export const CreateEventExpressRepository: CreateEventRepository = async (
  newCalendarEvent
) => {
  const response = await fetcher({
    input: EventApiRoute.CREATE,
    withToken: true,
    init: { method: 'POST', body: JSON.stringify(newCalendarEvent) },
  });

  return response.json() as ReturnType<CreateEventRepository>;
};
