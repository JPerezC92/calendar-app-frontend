import React from 'react';
import {
  CalendarEventStateProvider,
  CalendarModalStateProvider,
} from '../../providers';

export const CalendarProviders: React.FC = ({ children }) => {
  return (
    <>
      <CalendarEventStateProvider>
        <CalendarModalStateProvider>{children}</CalendarModalStateProvider>
      </CalendarEventStateProvider>
    </>
  );
};
