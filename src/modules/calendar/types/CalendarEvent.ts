import { User } from 'src/modules/auth/types';

export interface CalendarEvent {
  id: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  user: User;
}
