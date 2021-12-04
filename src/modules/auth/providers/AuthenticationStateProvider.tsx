import {
  createContext,
  Dispatch,
  ReducerAction,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import LoadingSpinner from 'src/modules/shared/components/LoadingSpinner';
import { useQueryRequest } from 'src/modules/shared/hooks';
import { LocalStorageService } from 'src/modules/shared/services';
import {
  authenticationAction,
  authenticationReducer,
} from '../reducers/authentication';
import { RenewTokenExpressRepository } from '../repositories';
import { User } from '../types/User';

export type AuthenticationState = {
  isAuthenticated: boolean;
  user: User;
};

type AuthenticationDispatcher = Dispatch<
  ReducerAction<typeof authenticationReducer>
>;

export const initialAuthenticationState: AuthenticationState = {
  isAuthenticated: false,
  user: { firstname: '', lastname: '', uid: '' },
};

const AuthenticationStateContext = createContext<AuthenticationState>(
  initialAuthenticationState
);

/*
 * This is a custom hook that allows us to access the state of the AuthenticationStateContext
 */

export const useAuthenticationState = () => {
  const context = useContext(AuthenticationStateContext);
  if (!context) {
    throw new Error(
      'useAuthenticationState must be used within an AuthenticationStateProvider'
    );
  }
  return context;
};

const AuthenticationDispatchContext = createContext<AuthenticationDispatcher>(
  (state) => state
);

/*
 * This is a custom hook that allows us to dispatch actions to the AuthenticationState
 * It is used in the AuthenticationStateProvider to provide the dispatcher to its children
 */
export const useAuthenticationDispatch = () => {
  const context = useContext(AuthenticationDispatchContext);
  if (!context) {
    throw new Error(
      'useAuthenticationDispatch must be used within a AuthenticationStateProvider'
    );
  }
  return context;
};

export const AuthenticationStateProvider: React.FC = ({ children }) => {
  const [authenticationState, dispatch] = useReducer(
    authenticationReducer,
    initialAuthenticationState
  );

  const [result, isLoading] = useQueryRequest(RenewTokenExpressRepository);

  useEffect(() => {
    if (result?.success) {
      LocalStorageService.save('auth', {
        token: result.payload.token,
        tokenInitDate: new Date().toISOString(),
      });
      dispatch(authenticationAction.login(result.payload.user));
    }
  }, [result]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <AuthenticationDispatchContext.Provider value={dispatch}>
      <AuthenticationStateContext.Provider value={authenticationState}>
        {children}
      </AuthenticationStateContext.Provider>
    </AuthenticationDispatchContext.Provider>
  );
};
