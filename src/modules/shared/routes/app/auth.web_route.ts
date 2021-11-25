import { BASE_WEB_URL } from '../../utils/global';

const root = `${BASE_WEB_URL}`;

const AUTH_ROOT = `${root}auth/`;

export const AuthWebRoute = {
  LOGIN: `${AUTH_ROOT}login`,
  REGISTER: `${AUTH_ROOT}register`,
};
