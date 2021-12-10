import { User } from 'src/modules/auth/types';

export interface CalendarEventDto {
  id: string;
  title: string;
  notes: string;
  start: string;
  end: string;
  user: User;
}
