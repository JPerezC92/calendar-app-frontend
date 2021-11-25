import { BASE_API_URL } from '../../utils/global';

const root = `${BASE_API_URL}`;

const AUTH_ROOT = `${root}auth/`;

export const AuthApiRoute = {
  LOGIN: `${AUTH_ROOT}`,
  REGISTER: `${AUTH_ROOT}register`,
  RENEW_TOKEN: `${AUTH_ROOT}renew-token`,
};
