import { EventApiRoute } from 'src/modules/shared/routes/api';
import { fetcher } from 'src/modules/shared/utils';
import { UpdateEventRepository } from '../types/repositories';

export const UpdateEventExpressRepository: UpdateEventRepository = async (
  calendarEventDto
) => {
  const body = JSON.stringify(calendarEventDto);
  const response = await fetcher({
    input: EventApiRoute.UPDATE(calendarEventDto.id.toString() ?? ''),
    init: {
      method: 'PUT',
      body: body,
    },
    withToken: true,
  });

  return response.json() as ReturnType<UpdateEventRepository>;
};
