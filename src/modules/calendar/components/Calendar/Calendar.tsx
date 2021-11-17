import { CSSProperties, useState } from 'react';
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
import { useCalendarEventState } from '../../providers';
import CreateCalendarEventFab from '../CreateCalendarEventFab';
import DeleteCalendarEventFab from '../DeleteCalendarEventFab';
import { calendarEventAction } from '../../reducers/calendarEvent';
import { localizer } from './localizer';
import type { CalendarEvent } from '../../types';

type ReactBigCalendarProps = RBCalendarProps<CalendarEvent>;

const Calendar: React.FC = () => {
  const [lastView, setLastView] = useState<View>(
    ApplicationSide.isBrowser
      ? (localStorage.getItem('lastView') as View) || 'month'
      : 'month'
  );

  const calendarModalState = useCalendarModalState();
  const calendarEventState = useCalendarEventState();

  const onDoubleClickEvent: ReactBigCalendarProps['onDoubleClickEvent'] =
    () => {
      calendarModalState.openModal();
    };

  const onSelectEvent: ReactBigCalendarProps['onSelectEvent'] = (event) => {
    calendarEventState.dispatch(
      calendarEventAction.setEventSelected({
        ...event,
      })
    );
  };

  const onSelectSlot: ReactBigCalendarProps['onSelectSlot'] = (slotInfo) => {
    console.log(slotInfo);
    calendarEventState.dispatch(calendarEventAction.removeEventSelected());
  };

  const onViewChange: ReactBigCalendarProps['onView'] = (event) => {
    setLastView(() => event);
    window.localStorage.setItem('lastView', event);
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

  return (
    <>
      <Box p={2} height="100%">
        <ReactBigCalendar
          localizer={localizer}
          culture="es"
          events={calendarEventState.events}
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
          <DeleteCalendarEventFab
            onClick={() =>
              calendarEventState.dispatch(calendarEventAction.deleteEvent())
            }
          />
        )}

        <CreateCalendarEventFab onClick={calendarModalState.openModal} />

        {calendarModalState.isOpen && <CalendarModal />}
      </Box>
    </>
  );
};

export default Calendar;
