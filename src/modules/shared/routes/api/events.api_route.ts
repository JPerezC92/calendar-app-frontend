import { BASE_API_URL } from '../../utils/global';

const root = `${BASE_API_URL}`;

const EVENTS_ROOT = `${root}events/`;

export const EventApiRoute = {
  GET_ALL: `${EVENTS_ROOT}`,
  CREATE: `${EVENTS_ROOT}`,
  UPDATE: (calendarEventId: string) => `${EVENTS_ROOT}${calendarEventId}/`,
  DELETE: (calendarEventId: string) => `${EVENTS_ROOT}${calendarEventId}/`,
};
