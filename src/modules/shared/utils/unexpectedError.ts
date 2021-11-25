import { ErrorResponse } from '../types';

export const unexpectedError: ErrorResponse = {
  success: false,
  message: 'Sucedio algo inesperador, por favor hable con el administrador.',
};
