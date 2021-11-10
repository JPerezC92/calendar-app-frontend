import React from 'react';
import { EventProps } from 'react-big-calendar';

interface CalendarEventProps {}

const CalendarEvent: React.FC<EventProps & CalendarEventProps> = ({
  event,
}) => {
  // TODO user type passtrougth
  const { title } = event;
  return (
    <>
      <span>{title}</span>
      {/* <strong> - {user.name}</strong> */}
    </>
  );
};

export default CalendarEvent;
