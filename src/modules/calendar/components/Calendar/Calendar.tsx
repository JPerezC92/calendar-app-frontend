import { CSSProperties, useCallback, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/layout';
import {
  Calendar as ReactBigCalendar,
  CalendarProps as RBCalendarProps,
  View,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { messages } from 'src/modules/common/utils/calendar-messages-es';
import { ApplicationSide } from 'src/modules/shared/utils/ApplicationSide';
import EventReminder from '../EventReminder';
import CalendarModal from '../CalendarModal';
import { useCalendarModalState } from '../../providers/ModalStateProvider';
import {
  useCalendarEventDispatch,
  useCalendarEventState,
} from '../../providers';
import CreateCalendarEventFab from '../CreateCalendarEventFab';
import DeleteCalendarEventFab from '../DeleteCalendarEventFab';
import { calendarEventAction } from '../../reducers/calendarEvent';
import { localizer } from './localizer';
import { LocalStorageService } from 'src/modules/shared/services';
import { useRequest, useRequestHandler } from 'src/modules/shared/hooks';
import { GetEventsExpressRepository } from '../../repositories/GetEventsExpressRepository';
import LoadingSpinner from 'src/modules/shared/components/LoadingSpinner';
import { ReactBigCalendarEvent } from '../../core/Domain';
import { CalendarEventMap } from '../../core/Mappers/CalendarEventMap';
import { DeleteEventExpressRepository } from '../../repositories';

type ReactBigCalendarProps = RBCalendarProps<ReactBigCalendarEvent>;

const Calendar: React.FC = () => {
  const view = LocalStorageService.get('lastView');

  const [lastView, setLastView] = useState<View>(
    ApplicationSide.isBrowser && view ? view : 'month'
  );

  const calendarModalState = useCalendarModalState();
  const calendarEventState = useCalendarEventState();
  const calendarEventDispatch = useCalendarEventDispatch();

  const onDoubleClickEvent: ReactBigCalendarProps['onDoubleClickEvent'] =
    () => {
      calendarModalState.openModal();
    };

  const onSelectEvent: ReactBigCalendarProps['onSelectEvent'] = (event) => {
    calendarEventDispatch(
      calendarEventAction.setEventSelected(
        CalendarEventMap.fromReactBigCalendarEvent(event)
      )
    );
  };

  const onSelectSlot: ReactBigCalendarProps['onSelectSlot'] = (slotInfo) => {
    console.log(slotInfo);
    calendarEventDispatch(calendarEventAction.removeEventSelected());
  };

  const onViewChange: ReactBigCalendarProps['onView'] = (event) => {
    setLastView(() => event);
    LocalStorageService.save('lastView', event);
  };

  const eventStyleGetter: ReactBigCalendarProps['eventPropGetter'] = (
    event,
    start,
    end,
    isSelected
  ) => {
    const newStyle: CSSProperties = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      color: 'white',
      opacity: 0.8,
      display: 'block',
    };

    return {
      style: newStyle,
    };
  };

  const [handleOnClick] = useRequestHandler(
    useCallback(async () => {
      if (calendarEventState.eventSelected) {
        const result = await DeleteEventExpressRepository(
          calendarEventState.eventSelected
        );

        if (result.success) {
          calendarEventDispatch(calendarEventAction.deleteEvent());
        }

        return result;
      }
    }, [calendarEventDispatch, calendarEventState.eventSelected])
  );

  const [result, isLoading] = useRequest(GetEventsExpressRepository);

  useEffect(() => {
    if (result?.success) {
      calendarEventDispatch(
        calendarEventAction.setEvents(
          CalendarEventMap.toEntityCollection(result.payload)
        )
      );
    }
  }, [result, calendarEventDispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Box p={2} height="100%">
        <ReactBigCalendar
          localizer={localizer}
          culture="es"
          events={calendarEventState.events.map((event) =>
            CalendarEventMap.toReactBigCalendarEvent(event)
          )}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClickEvent}
          onView={onViewChange}
          onSelectEvent={onSelectEvent}
          selectable
          onSelectSlot={onSelectSlot}
          view={lastView}
          components={{
            event: EventReminder,
          }}
        />

        {calendarEventState.eventSelected && (
          <DeleteCalendarEventFab onClick={handleOnClick} />
        )}

        <CreateCalendarEventFab
          onClick={() => {
            calendarEventDispatch(calendarEventAction.removeEventSelected());
            calendarModalState.openModal();
          }}
        />

        {calendarModalState.isOpen && (
          <CalendarModal calendarEvent={calendarEventState.eventSelected} />
        )}
      </Box>
    </>
  );
};

export default Calendar;
