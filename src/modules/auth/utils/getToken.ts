import { LocalStorageService } from 'src/modules/shared/services';

export const getToken = () => {
  const auth = LocalStorageService.get('auth');

  return auth?.token;
};
