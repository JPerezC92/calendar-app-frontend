import { CalendarEvent, NewCalendarEvent } from '../../types';

export enum CalendarEventActionEnum {
  SET_EVENTS = 'SET_EVENTS',
  SET_EVENT_SELECTED = 'SET_EVENT_SELECTED',
  REMOVE_EVENT_SELECTED = 'REMOVE_EVENT_SELECTED',
  ADD_NEW_EVENT = 'ADD_NEW_EVENT',
  UPDATE_EVENT = 'UPDATE_EVENT',
  DELETE_EVENT = 'DELETE_EVENT',
}

export type CalendarEventAction =
  | SetEvents
  | SetEventSelected
  | RemoveEventSelected
  | AddNewEvent
  | UpdateEvent
  | DeleteEvent;

export interface SetEvents {
  type: CalendarEventActionEnum.SET_EVENTS;
  payload: CalendarEvent[];
}
export interface SetEventSelected {
  type: CalendarEventActionEnum.SET_EVENT_SELECTED;
  payload: CalendarEvent;
}
export interface RemoveEventSelected {
  type: CalendarEventActionEnum.REMOVE_EVENT_SELECTED;
}
export interface AddNewEvent {
  type: CalendarEventActionEnum.ADD_NEW_EVENT;
  payload: CalendarEvent;
}
export interface UpdateEvent {
  type: CalendarEventActionEnum.UPDATE_EVENT;
  payload: CalendarEvent;
}
export interface DeleteEvent {
  type: CalendarEventActionEnum.DELETE_EVENT;
}
