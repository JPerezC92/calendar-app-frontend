import { CSSProperties, useState } from 'react';
import { Box } from '@chakra-ui/layout';
import {
  Calendar as ReactBigCalendar,
  CalendarProps,
  View,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { messages } from 'src/modules/common/utils/calendar-messages-es';
import { ApplicationSide } from 'src/modules/shared/utils/ApplicationSide';
import CalendarEvent from '../CalendarEvent';
import CalendarModal from '../CalendarModal';
import { useCalendarModalState } from '../../providers/ModalStateProvider';
import { useCalendarEventState } from '../../providers';
import CreateCalendarEventFAB from '../CreateCalendarEventFAB';
import { calendarEventAction } from '../../reducers/calendarEvent';
import { localizer } from './localizer';

const Calendar = () => {
  const [lastView, setLastView] = useState<View>(
    ApplicationSide.isBrowser
      ? (localStorage.getItem('lastView') as View) || 'month'
      : 'month'
  );

  const calendarModalState = useCalendarModalState();
  const calendarEvent = useCalendarEventState();

  const onDoubleClickEvent: CalendarProps['onDoubleClickEvent'] = () => {
    calendarModalState.openModal();
  };

  const onSelectEvent: CalendarProps['onSelectEvent'] = (event) => {
    console.log(event);
    calendarEvent.dispatch(
      calendarEventAction.setEventSelected({
        title: event.title ? event.title : '',
        start: event.start ? event.start : new Date(),
        end: event.end ? event.end : new Date(),
      })
    );
  };

  const onViewChange: CalendarProps['onView'] = (event) => {
    setLastView(() => event);
    window.localStorage.setItem('lastView', event);
  };

  const eventStyleGetter: CalendarProps['eventPropGetter'] = (
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

  return (
    <>
      <Box p={2} height="100%">
        <ReactBigCalendar
          localizer={localizer}
          culture="es"
          events={calendarEvent.events}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClickEvent}
          onView={onViewChange}
          onSelectEvent={onSelectEvent}
          view={lastView}
          components={{
            event: CalendarEvent,
          }}
        />
        <CreateCalendarEventFAB onClick={calendarModalState.openModal} />
        <CalendarModal />
      </Box>
    </>
  );
};

export default Calendar;
