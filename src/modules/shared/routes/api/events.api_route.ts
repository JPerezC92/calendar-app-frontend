import { BASE_API_URL } from '../../utils/global';

const root = `${BASE_API_URL}`;

const EVENTS_ROOT = `${root}events/`;

export const EventApiRoute = {
  GET_ALL: `${EVENTS_ROOT}`,
  CREATE: `${EVENTS_ROOT}login`,
  UPDATE: `${EVENTS_ROOT}register`,
  DELETE: `${EVENTS_ROOT}renew-token`,
};
