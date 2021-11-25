import { User } from '../../types/User';

export enum AuthenticationActionEnum {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  SET_TOKEN = 'SET_TOKEN',
}

export type AuthenticationAction = Login | Logout;

export interface Login {
  type: AuthenticationActionEnum.LOGIN;
  payload: User;
}

export interface Logout {
  type: AuthenticationActionEnum.LOGOUT;
}
