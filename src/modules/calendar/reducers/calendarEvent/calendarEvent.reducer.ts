import { CalendarEventState } from '../../providers';
import {
  CalendarEventActionEnum,
  CalendarEventAction,
} from './calendarEvent.type';

export const calendarEventReducer = (
  state: CalendarEventState,
  action: CalendarEventAction
): CalendarEventState => {
  const { eventSelected } = state;

  switch (action.type) {
    case CalendarEventActionEnum.SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };

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

    case CalendarEventActionEnum.UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };

    case CalendarEventActionEnum.DELETE_EVENT:
      return {
        ...state,
        events: eventSelected
          ? state.events.filter((event) => event.id !== eventSelected.id)
          : [...state.events],
        eventSelected: undefined,
      };

    default:
      return state;
  }
};
