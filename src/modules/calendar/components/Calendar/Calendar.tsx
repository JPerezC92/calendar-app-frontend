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

type MyRBCProps = RBCalendarProps<ReactBigCalendarEvent>;

const Calendar: React.FC = () => {
  const view = LocalStorageService.get('lastView');

  const [lastView, setLastView] = useState<View>(
    ApplicationSide.isBrowser && view ? view : 'month'
  );

  const calendarModalState = useCalendarModalState();
  const { events, eventSelected } = useCalendarEventState();
  const calendarEventDispatch = useCalendarEventDispatch();

  const onDoubleClickEvent: MyRBCProps['onDoubleClickEvent'] = () => {
    calendarModalState.openModal();
  };

  const onSelectEvent: MyRBCProps['onSelectEvent'] = (event) => {
    calendarEventDispatch(
      calendarEventAction.setEventSelected(
        CalendarEventMap.fromReactBigCalendarEvent(event)
      )
    );
  };

  const onSelectSlot: MyRBCProps['onSelectSlot'] = () => {
    calendarEventDispatch(calendarEventAction.removeEventSelected());
  };

  const onViewChange: MyRBCProps['onView'] = (event) => {
    setLastView(() => event);
    LocalStorageService.save('lastView', event);
  };

  const eventStyleGetter: MyRBCProps['eventPropGetter'] = () => {
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

  const [handleOnClickDelete] = useRequestHandler(
    useCallback(async () => {
      if (eventSelected) {
        const result = await DeleteEventExpressRepository(eventSelected);

        if (result.success) {
          calendarEventDispatch(calendarEventAction.deleteEvent());
        }

        return result;
      }
    }, [calendarEventDispatch, eventSelected])
  );

  const [result, isLoading] = useRequest(GetEventsExpressRepository);

  useEffect(() => {
    if (result?.success) {
      const calendarEvents = CalendarEventMap.toEntityCollection(
        result.payload
      );

      calendarEventDispatch(calendarEventAction.setEvents(calendarEvents));
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
          events={CalendarEventMap.toReactBigCalendarEventCollection(events)}
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

        {eventSelected && (
          <DeleteCalendarEventFab onClick={handleOnClickDelete} />
        )}

        <CreateCalendarEventFab
          onClick={() => {
            calendarEventDispatch(calendarEventAction.removeEventSelected());
            calendarModalState.openModal();
          }}
        />

        {calendarModalState.isOpen && (
          <CalendarModal calendarEvent={eventSelected} />
        )}
      </Box>
    </>
  );
};

export default Calendar;
