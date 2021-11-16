import { CalendarEventState } from '../../providers';
import {
  CalendarEventActionEnum,
  CalendarEventAction,
} from './calendarEvent.type';

export const calendarEventReducer = (
  state: CalendarEventState,
  action: CalendarEventAction
): CalendarEventState => {
  switch (action.type) {
    case CalendarEventActionEnum.SET_EVENT_SELECTED:
      return {
        ...state,
        eventSelected: action.payload,
      };

    case CalendarEventActionEnum.REMOVE_EVENT_SELECTED:
      return {
        ...state,
        eventSelected: undefined,
      };

    case CalendarEventActionEnum.ADD_NEW_EVENT:
      return {
        ...state,
        events: [
          ...state.events,
          { ...action.payload, id: state.events.length + 1 },
        ],
      };

    case CalendarEventActionEnum.SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };

    default:
      return state;
  }
};
