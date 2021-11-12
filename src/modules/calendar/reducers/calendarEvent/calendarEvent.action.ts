import {
  CalendarEventActionEnum,
  SetEvents,
  SetEventSelected,
} from './calendarEvent.type';

export const calendarEventAction = {
  setEventSelected: (event: SetEventSelected['payload']): SetEventSelected => ({
    type: CalendarEventActionEnum.SET_EVENT_SELECTED,
    payload: event,
  }),

  setEvents: (events: SetEvents['payload']): SetEvents => ({
    type: CalendarEventActionEnum.SET_EVENTS,
    payload: events,
  }),
};
