import { EventApiRoute } from 'src/modules/shared/routes/api';
import { fetcher } from 'src/modules/shared/utils';
import { CreateEventRepository } from '../types/repositories';

export const CreateEventExpressRepository: CreateEventRepository = async (
  newCalendarEventDto
) => {
  const body = JSON.stringify(newCalendarEventDto);
  console.log(newCalendarEventDto);

  const response = await fetcher({
    input: EventApiRoute.CREATE,
    withToken: true,
    init: { method: 'POST', body: body },
  });

  return response.json() as ReturnType<CreateEventRepository>;
};
