import { EventApiRoute } from 'src/modules/shared/routes/api';
import { fetcher } from 'src/modules/shared/utils';
import { DeleteEventRepository } from '../types/repositories';

export const DeleteEventExpressRepository: DeleteEventRepository = async (
  calendarEvent
) => {
  const response = await fetcher({
    input: EventApiRoute.DELETE(calendarEvent.id.toValue() ?? ''),
    init: { method: 'DELETE' },
    withToken: true,
  });

  return response.json() as ReturnType<DeleteEventRepository>;
};
