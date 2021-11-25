import React, { ChangeEventHandler, FormEventHandler, useEffect } from 'react';
import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Divider } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Textarea } from '@chakra-ui/textarea';
import { addHours, addMinutes, format, parse } from 'date-fns';
import { FaSave } from 'react-icons/fa';

import Form from 'src/modules/shared/components/Form';
import { useForm } from 'src/modules/shared/hooks';
import { useCalendarEventState, useCalendarModalState } from '../../providers';
import { NewCalendarEvent } from '../../types';
import { calendarEventAction } from '../../reducers/calendarEvent';

const baseDate = parse(
  format(new Date(), 'yyyy-MM-dd HH:00:00'),
  'yyyy-MM-dd HH:mm:ss',
  new Date()
);

const initialStartDate = addHours(baseDate, 1);
const initialEndDate = addHours(baseDate, 2);
const minEndDate = (startDate: Date) => addMinutes(startDate, 5);

const dateTimeStringToDate = (datetimeString: string): Date => {
  return parse(datetimeString, "yyyy-MM-dd'T'HH:mm", new Date());
};

const dateTimeToString = (datetime: Date): string => {
  return format(datetime, "yyyy-MM-dd'T'HH:mm");
};

const newCalendarEventInitialState: NewCalendarEvent = {
  title: '',
  notes: '',
  start: initialStartDate,
  end: initialEndDate,
};

const CalendarModal: React.FC = () => {
  const { eventSelected, dispatch } = useCalendarEventState();
  const isNewEvent = !eventSelected;

  const { formValues, formErrors, isValid, setFormValues, handleInputChange } =
    useForm<NewCalendarEvent>(
      isNewEvent ? newCalendarEventInitialState : eventSelected
    );

  const { isOpen, closeModal } = useCalendarModalState();

  const handleStartDateChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value, validity } = event.target;
    if (validity.valid) {
      setFormValues({ start: dateTimeStringToDate(value) });
    }
  };

  const handleEndDateChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, validity } = event.target;

    if (validity.valid) {
      setFormValues({ end: dateTimeStringToDate(value) });
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (isNewEvent) {
      dispatch(calendarEventAction.addNewEvent(formValues));
    } else {
      dispatch(
        calendarEventAction.updateEvent({ ...eventSelected, ...formValues })
      );
    }

    closeModal();
  };

  useEffect(() => {
    if (formValues.end.getTime() < formValues.start.getTime()) {
      setFormValues({ end: minEndDate(formValues.start) });
    }
  }, [formValues.start, formValues.end, setFormValues]);

  useEffect(
    () => () => dispatch(calendarEventAction.removeEventSelected()),
    [dispatch]
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <div>{JSON.stringify(formValues.start)}</div>
          <div>{JSON.stringify(formValues.end)}</div>

          <ModalHeader>
            {isNewEvent ? 'Nuevo evento' : formValues.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <Divider />
              <Form
                display="flex"
                flexDirection="column"
                gridRowGap={3}
                marginBlock={3}
                onSubmit={handleSubmit}
                SubmitButton={
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    type="submit"
                    isDisabled={!isValid}
                    leftIcon={<FaSave fontSize={20} />}
                  >
                    Guardar
                  </Button>
                }
              >
                <FormControl isInvalid={Boolean(formErrors.start)} isRequired>
                  <FormLabel>Fecha y hora inicio</FormLabel>
                  <Input
                    name="start"
                    value={dateTimeToString(formValues.start)}
                    isRequired
                    onChange={handleStartDateChange}
                    placeholder="Fecha inicio"
                    required
                    type="datetime-local"
                  />
                  <FormErrorMessage>{formErrors.start}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(formErrors.end)} isRequired>
                  <FormLabel>Fecha y hora fin</FormLabel>
                  <Input
                    name="end"
                    value={dateTimeToString(formValues.end)}
                    isRequired
                    min={dateTimeToString(minEndDate(formValues.start))}
                    onChange={handleEndDateChange}
                    placeholder="Fecha fin"
                    required
                    type="datetime-local"
                  />
                  <FormErrorMessage>{formErrors.end}</FormErrorMessage>
                </FormControl>

                <Divider />

                <FormControl isInvalid={Boolean(formErrors.title)} isRequired>
                  <FormLabel>Titulo y notas</FormLabel>
                  <Input
                    type="text"
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                    value={formValues.title}
                    isRequired
                  />
                  <FormErrorMessage>{formErrors.title}</FormErrorMessage>
                  <small id="emailHelp" className="form-text text-muted">
                    Una descripción corta
                  </small>
                </FormControl>

                <FormControl>
                  <FormLabel>Descripción</FormLabel>
                  <Textarea
                    placeholder="Notas"
                    rows={5}
                    name="notes"
                    value={formValues.notes}
                    onChange={handleInputChange}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Información adicional
                  </small>
                </FormControl>
              </Form>
            </>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CalendarModal;
