import {
  AuthenticationState,
  initialAuthenticationState,
} from '../../providers/AuthenticationStateProvider';
import {
  AuthenticationAction,
  AuthenticationActionEnum,
} from './authentication.type';

export const authenticationReducer = (
  state: AuthenticationState,
  action: AuthenticationAction
): AuthenticationState => {
  switch (action.type) {
    case AuthenticationActionEnum.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case AuthenticationActionEnum.LOGOUT:
      return {
        ...initialAuthenticationState,
      };
    default:
      return state;
  }
};
