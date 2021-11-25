import { AuthenticationActionEnum, Login, Logout } from '.';

export const authenticationAction = {
  login: (user: Login['payload']): Login => ({
    payload: user,
    type: AuthenticationActionEnum.LOGIN,
  }),

  logoout: (): Logout => ({
    type: AuthenticationActionEnum.LOGOUT,
  }),
};
