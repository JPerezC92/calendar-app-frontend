import { EventApiRoute } from 'src/modules/shared/routes/api';
import { fetcher } from 'src/modules/shared/utils';
import { CalendarEventMap } from '../core/Mappers/CalendarEventMap';
import { CreateEventRepository } from '../types/repositories';

export const CreateEventExpressRepository: CreateEventRepository = async (
  newCalendarEvent
) => {
  const body = CalendarEventMap.entityToRequest(newCalendarEvent);
  const response = await fetcher({
    input: EventApiRoute.CREATE,
    withToken: true,
    init: { method: 'POST', body: body },
  });

  return response.json() as ReturnType<CreateEventRepository>;
};
