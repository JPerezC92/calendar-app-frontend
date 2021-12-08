import { EventApiRoute } from 'src/modules/shared/routes/api';
import { fetcher } from 'src/modules/shared/utils';
import { CalendarEventMap } from '../core/Mappers/CalendarEventMap';
import { UpdateEventRepository } from '../types/repositories';

export const UpdateEventExpressRepository: UpdateEventRepository = async (
  calendarEvent
) => {
  const body = CalendarEventMap.entityToRequest(calendarEvent);
  const response = await fetcher({
    input: EventApiRoute.UPDATE(calendarEvent.id.toString() ?? ''),
    init: {
      method: 'PUT',
      body: body,
    },
    withToken: true,
  });

  return response.json() as ReturnType<UpdateEventRepository>;
};
