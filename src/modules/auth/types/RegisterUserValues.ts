import { Credentials, User } from '.';

export type RegisterUserValues = Credentials &
  Omit<User, 'uid'> & {
    confirmPassword: string;
  };
