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
  dispatch: Dispatch<ReducerAction<typeof authenticationReducer>>;
};

export const initialAuthenticationState: AuthenticationState = {
  isAuthenticated: false,
  user: { name: '', uid: '', token: '' },
  dispatch: (state) => state,
};

const AuthenticationStateContext = createContext<AuthenticationState>(
  initialAuthenticationState
);

export const useAuthenticationState = () => {
  const context = useContext(AuthenticationStateContext);
  if (!context) {
    throw new Error(
      'useAuthenticationState must be used within a AuthenticationStateProvider'
    );
  }
  return context;
};

export const AuthenticationStateProvider: React.FC = ({ children }) => {
  const [authenticationState, dispatch] = useReducer(
    authenticationReducer,
    initialAuthenticationState
  );

  const value = {
    ...authenticationState,
    dispatch,
  };

  return (
    <AuthenticationStateContext.Provider value={value}>
      {children}
    </AuthenticationStateContext.Provider>
  );
};
