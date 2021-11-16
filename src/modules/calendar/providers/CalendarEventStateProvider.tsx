import React, {
  createContext,
  Dispatch,
  ReducerAction,
  useContext,
  useReducer,
} from 'react';
import addHours from 'date-fns/addHours';

import { NotSelected } from 'src/modules/shared/types/NotSelected';
import { calendarEventReducer } from '../reducers/calendarEvent';
import { CalendarEvent } from '../types';

export interface CalendarEventState {
  events: CalendarEvent[];
  eventSelected?: CalendarEvent;
  dispatch: Dispatch<ReducerAction<typeof calendarEventReducer>>;
}

const initialCalendarEventState: CalendarEventState = {
  events: [
    {
      id: 1,
      title: 'Cumpleaños',
      start: new Date(),
      end: addHours(new Date(), 5),
    },
  ],
  eventSelected: undefined,
  dispatch: (state) => state,
};

const CalendarEventStateContext = createContext({} as CalendarEventState);

export const useCalendarEventState = () => {
  const context = useContext(CalendarEventStateContext);
  if (!context) {
    throw new Error(
      'useCalendarEventState must be used within a CalendarEventStateProvider'
    );
  }
  return context;
};

export const CalendarEventStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    calendarEventReducer,
    initialCalendarEventState
  );

  return (
    <CalendarEventStateContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CalendarEventStateContext.Provider>
  );
};
