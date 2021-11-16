import { CalendarEvent, NewCalendarEvent } from '../../types';

export enum CalendarEventActionEnum {
  SET_EVENT_SELECTED = 'SET_EVENT_SELECTED',
  REMOVE_EVENT_SELECTED = 'REMOVE_EVENT_SELECTED',
  SET_EVENTS = 'SET_EVENTS',
  ADD_NEW_EVENT = 'ADD_NEW_EVENT',
}

export type CalendarEventAction =
  | SetEventSelected
  | AddNewEvent
  | SetEvents
  | RemoveEventSelected;

export interface SetEventSelected {
  type: CalendarEventActionEnum.SET_EVENT_SELECTED;
  payload: CalendarEvent;
}
export interface RemoveEventSelected {
  type: CalendarEventActionEnum.REMOVE_EVENT_SELECTED;
}
export interface AddNewEvent {
  type: CalendarEventActionEnum.ADD_NEW_EVENT;
  payload: NewCalendarEvent;
}
export interface SetEvents {
  type: CalendarEventActionEnum.SET_EVENTS;
  payload: CalendarEvent[];
}
