import {
  createContext,
  Dispatch,
  ReducerAction,
  useContext,
  useReducer,
} from 'react';
import { CalendarEvent } from '../core/Domain';

import { calendarEventReducer } from '../reducers/calendarEvent';

export interface CalendarEventState {
  events: CalendarEvent[];
  eventSelected?: CalendarEvent;
}

type CalendarEventDispatcher = Dispatch<
  ReducerAction<typeof calendarEventReducer>
>;

const initialCalendarEventState: CalendarEventState = {
  events: [],
  eventSelected: undefined,
};

const CalendarEventStateContext = createContext({} as CalendarEventState);

/*
 * This is a custom hook that allows us to access the state of the CalendarEventStateContext
 */
export const useCalendarEventState = () => {
  const context = useContext(CalendarEventStateContext);
  if (!context) {
    throw new Error(
      'useCalendarEventState must be used within a CalendarEventStateProvider'
    );
  }
  return context;
};

const CalendarEventDispatchContext = createContext<CalendarEventDispatcher>(
  (state) => state
);

/*
 * This is a custom hook that allows us to dispatch actions to the CalendarEventState
 * It is used in the CalendarEventStateProvider to provide the dispatcher to its children
 */
export const useCalendarEventDispatch = () => {
  const context = useContext(CalendarEventDispatchContext);
  if (!context) {
    throw new Error(
      'useCalendarEventDispatch must be used within a CalendarEventStateProvider'
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
    <>
      <CalendarEventDispatchContext.Provider value={dispatch}>
        <CalendarEventStateContext.Provider value={state}>
          {children}
        </CalendarEventStateContext.Provider>
      </CalendarEventDispatchContext.Provider>
    </>
  );
};
