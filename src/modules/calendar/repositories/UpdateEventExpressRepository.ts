import { EventApiRoute } from 'src/modules/shared/routes/api';
import { fetcher } from 'src/modules/shared/utils';
import { UpdateEventRepository } from '../types/repositories';

export const UpdateEventExpressRepository: UpdateEventRepository = async (
  calendarEvent
) => {
  console.log({ calendarEvent });
  const response = await fetcher({
    input: EventApiRoute.UPDATE(calendarEvent.id),
    init: {
      method: 'PUT',
      body: JSON.stringify(calendarEvent),
    },
    withToken: true,
  });

  return response.json() as ReturnType<UpdateEventRepository>;
};
