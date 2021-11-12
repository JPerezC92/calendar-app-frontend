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

    case CalendarEventActionEnum.SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };

    default:
      return state;
  }
};
