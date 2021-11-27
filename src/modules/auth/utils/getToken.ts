import { LocalStorageService } from 'src/modules/shared/services';

export const getToken = () => {
  const auth = LocalStorageService.get('auth');

  if (!auth) {
    throw new Error('Token not found');
  }

  return auth.token;
};
