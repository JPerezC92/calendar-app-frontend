import { CalendarEvent } from '../../types';

export enum CalendarEventActionEnum {
  SET_EVENT_SELECTED = 'SET_EVENT_SELECTED',
  SET_EVENTS = 'SET_EVENTS',
}

export type CalendarEventAction = SetEventSelected | SetEvents;

export interface SetEventSelected {
  type: CalendarEventActionEnum.SET_EVENT_SELECTED;
  payload: CalendarEvent;
}

export interface SetEvents {
  type: CalendarEventActionEnum.SET_EVENTS;
  payload: CalendarEvent[];
}
