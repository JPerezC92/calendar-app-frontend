import React from 'react';
import { EventProps } from 'react-big-calendar';
import { CalendarEventDTO } from '../../core/Domain';

// interface EventReminderProps {}

const EventReminder: React.FC<EventProps<CalendarEventDTO>> = ({ event }) => {
  // TODO user type passtrougth
  const { title } = event;
  return (
    <>
      <span>{title}</span>
      {/* <strong> - {user.name}</strong> */}
    </>
  );
};

export default EventReminder;
