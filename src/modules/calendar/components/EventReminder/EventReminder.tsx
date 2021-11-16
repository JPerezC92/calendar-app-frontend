import React from 'react';
import { EventProps } from 'react-big-calendar';
import { CalendarEvent } from '../../types';

// interface EventReminderProps {}

const EventReminder: React.FC<EventProps<CalendarEvent>> = ({ event }) => {
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
