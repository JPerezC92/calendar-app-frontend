import { RemoveEventSelected } from '.';
import {
  CalendarEventActionEnum,
  SetEvents,
  AddNewEvent,
  SetEventSelected,
} from './calendarEvent.type';

export const calendarEventAction = {
  setEventSelected: (event: SetEventSelected['payload']): SetEventSelected => ({
    type: CalendarEventActionEnum.SET_EVENT_SELECTED,
    payload: event,
  }),

  removeEventSelected: (): RemoveEventSelected => ({
    type: CalendarEventActionEnum.REMOVE_EVENT_SELECTED,
  }),

  addNewEvent: (newEvent: AddNewEvent['payload']): AddNewEvent => ({
    type: CalendarEventActionEnum.ADD_NEW_EVENT,
    payload: newEvent,
  }),

  setEvents: (events: SetEvents['payload']): SetEvents => ({
    type: CalendarEventActionEnum.SET_EVENTS,
    payload: events,
  }),
};
