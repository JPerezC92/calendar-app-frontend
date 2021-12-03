import {
  createContext,
  Dispatch,
  ReducerAction,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';

import {
  calendarEventAction,
  calendarEventReducer,
} from '../reducers/calendarEvent';
import { CalendarEvent } from '../types';
import { GetEventsExpressRepository } from '../repositories/GetEventsExpressRepository';
import { useQueryRequest } from 'src/modules/shared/hooks';
import LoadingSpinner from 'src/modules/shared/components/LoadingSpinner';

export interface CalendarEventState {
  events: CalendarEvent[];
  eventSelected?: CalendarEvent;
  dispatch: Dispatch<ReducerAction<typeof calendarEventReducer>>;
}

const initialCalendarEventState: CalendarEventState = {
  events: [],
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

  const [result, isLoading] = useQueryRequest(GetEventsExpressRepository);

  useEffect(() => {
    if (result?.success) {
      dispatch(calendarEventAction.setEvents(result.payload));
    }
  }, [result]);

  return (
    <>
      <CalendarEventStateContext.Provider value={{ ...state, dispatch }}>
        {isLoading ? <LoadingSpinner /> : children}
      </CalendarEventStateContext.Provider>
    </>
  );
};
