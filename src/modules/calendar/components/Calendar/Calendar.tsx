import { CSSProperties, useState } from 'react';
import { Box } from '@chakra-ui/layout';
import { addHours } from 'date-fns';
import {
  Calendar as ReactBigCalendar,
  CalendarProps,
  dateFnsLocalizer,
  Event,
  View,
} from 'react-big-calendar';

import { format, parse, getDay, startOfWeek } from 'date-fns';
import es from 'date-fns/locale/es';
// import enUs from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from 'src/modules/common/utils/calendar-messages-es';
import CalendarEvent from '../CalendarEvent';
import { ApplicationSide } from 'src/modules/shared/utils/ApplicationSide';
import CalendarModal from '../CalendarModal';

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const myEventsList = [
  {
    title: 'Cumpleaños',
    start: new Date(),
    end: addHours(new Date(), 5),
    bgColor: 'red',
    // user: {
    //   _id: "123",
    //   name: "John",
    // },
  },
];

const Calendar = () => {
  const [lastView, setLastView] = useState<View>(
    ApplicationSide.isBrowser
      ? (localStorage.getItem('lastView') as View) || 'month'
      : 'month'
  );

  const onDoubleClickEvent: CalendarProps['onDoubleClickEvent'] = (
    event: Event
  ) => {
    console.log(event);
  };

  const onSelectEvent: CalendarProps['onSelectEvent'] = () => {};
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
    let newStyle: CSSProperties = {
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
          events={myEventsList}
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
        <CalendarModal />
      </Box>
    </>
  );
};

export default Calendar;
