import {
  createContext,
  Dispatch,
  ReducerAction,
  useContext,
  useReducer,
} from 'react';
import { authenticationReducer } from '../reducers/authentication';
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

/* This is a custom hook that allows us to access the state of the
  * AuthenticationStateContext.

  * It's a custom hook because it allows us to use the context without having to
  * use the Provider component.
  * */
export const useAuthenticationState = () => {
  const context = useContext(AuthenticationStateContext);
  if (!context) {
    throw new Error(
      'useAuthenticationState must be used within a AuthenticationStateProvider'
    );
  }
  return context;
};

const AuthenticationDispatchContext = createContext<AuthenticationDispatcher>(
  (state) => state
);

/* This is a custom hook that allows us to access the dispatch of the
  * AuthenticationDispatchContext.

  * It's a custom hook because it allows us to use the context without having to
  * use the Provider component.
  * */
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

  return (
    <AuthenticationDispatchContext.Provider value={dispatch}>
      <AuthenticationStateContext.Provider value={authenticationState}>
        {children}
      </AuthenticationStateContext.Provider>
    </AuthenticationDispatchContext.Provider>
  );
};
