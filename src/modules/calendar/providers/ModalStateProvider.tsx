import React, { createContext, useCallback, useContext, useState } from 'react';

export interface CalendarModalStateContext {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const CalendarModalStateContext = createContext<CalendarModalStateContext>({
  isOpen: false,
  openModal: () => undefined,
  closeModal: () => undefined,
});

export const useCalendarModalState = () => {
  const context = useContext(CalendarModalStateContext);
  if (!context) {
    throw new Error(
      'useCalendarModalState must be used within a CalendarModalStateContext'
    );
  }
  return context;
};

export const CalendarModalStateProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <CalendarModalStateContext.Provider
      value={{ isOpen, openModal, closeModal }}
    >
      {children}
    </CalendarModalStateContext.Provider>
  );
};
