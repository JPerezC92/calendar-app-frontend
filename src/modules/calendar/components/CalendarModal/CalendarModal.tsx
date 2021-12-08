import React, { ChangeEventHandler, useCallback, useEffect } from 'react';
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
import { addHours, addMinutes, format, getTime, parse } from 'date-fns';
import { FaSave } from 'react-icons/fa';

import Form from 'src/modules/shared/components/Form';
import { useForm, useSubmit } from 'src/modules/shared/hooks';
import {
  useCalendarEventDispatch,
  useCalendarModalState,
} from '../../providers';
import { CalendarEventFormValues } from '../../types';
import { calendarEventAction } from '../../reducers/calendarEvent';
import {
  CreateEventExpressRepository,
  UpdateEventExpressRepository,
} from '../../repositories';
import { CalendarEventMap } from '../../core/Mappers';
import { CalendarEvent } from '../../core/Domain';

const baseDate = parse(
  format(new Date(), 'yyyy-MM-dd HH:00:00'),
  'yyyy-MM-dd HH:mm:ss',
  new Date()
);

// Date string in milliseconds
const initialStartDate = getTime(addHours(baseDate, 1)).toString();
const initialEndDate = getTime(addHours(baseDate, 2)).toString();

const dateTimeStringToDate = (datetimeString: string): Date => {
  return parse(datetimeString, "yyyy-MM-dd'T'HH:mm", new Date());
};

const dateToDateTimeString = (date: Date): string => {
  return format(date, "yyyy-MM-dd'T'HH:mm");
};

const newCalendarEventInitialState: CalendarEventFormValues = {
  title: '',
  notes: '',
  start: initialStartDate,
  end: initialEndDate,
};

const CalendarModal: React.FC<{ calendarEvent?: CalendarEvent }> = ({
  calendarEvent,
}) => {
  const calendarEventDispatch = useCalendarEventDispatch();

  const { formValues, formErrors, setFormValues, handleInputChange } =
    useForm<CalendarEventFormValues>(
      calendarEvent
        ? CalendarEventMap.toFormValues(calendarEvent)
        : newCalendarEventInitialState
    );

  const { isOpen, closeModal } = useCalendarModalState();

  const handleStartDateChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value, validity } = event.target;

    if (validity.valid) {
      setFormValues({
        start: dateTimeStringToDate(value).getTime().toString(),
      });
    }
  };

  const handleEndDateChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, validity } = event.target;

    if (validity.valid) {
      setFormValues({ end: dateTimeStringToDate(value).getTime().toString() });
    }
  };

  const createRequest = useCallback(async () => {
    const result = await UpdateEventExpressRepository(
      CalendarEventMap.fromFormValues(formValues, calendarEvent?.id.toString())
    );

    if (result.success) {
      calendarEventDispatch(
        calendarEventAction.updateEvent(
          CalendarEventMap.fromDTO(result.payload)
        )
      );
    }

    return result;
  }, [formValues, calendarEvent, calendarEventDispatch]);

  const updateRequest = useCallback(async () => {
    const result = await CreateEventExpressRepository(
      CalendarEventMap.fromFormValues(formValues)
    );

    if (result.success) {
      calendarEventDispatch(
        calendarEventAction.addNewEvent(
          CalendarEventMap.fromDTO(result.payload)
        )
      );
    }

    return result;
  }, [formValues, calendarEventDispatch]);

  const [handleSubmit, result, isLoading] = useSubmit(
    calendarEvent ? createRequest : updateRequest
  );

  useEffect(() => {
    if (result?.success) {
      closeModal();
    }
  }, [closeModal, result]);

  useEffect(() => {
    if (parseInt(formValues.end, 10) < parseInt(formValues.start, 10)) {
      setFormValues({
        end: addMinutes(parseInt(formValues.start, 10), 5).getTime().toString(),
      });
    }
  }, [formValues.start, formValues.end, setFormValues]);

  useEffect(
    () => () =>
      calendarEventDispatch(calendarEventAction.removeEventSelected()),
    [calendarEventDispatch]
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {calendarEvent ? formValues.title : 'Nuevo evento'}
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
              >
                <FormControl isInvalid={Boolean(formErrors.start)} isRequired>
                  <FormLabel>Fecha y hora inicio</FormLabel>
                  <Input
                    name="start"
                    value={dateToDateTimeString(
                      new Date(parseInt(formValues.start, 10))
                    )}
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
                    value={dateToDateTimeString(
                      new Date(parseInt(formValues.end, 10))
                    )}
                    isRequired
                    min={dateToDateTimeString(
                      addMinutes(parseInt(formValues.start, 10), 5)
                    )}
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
                  <small>Una descripción corta</small>
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
                  <small>Información adicional</small>
                </FormControl>

                <Button
                  variant="outline"
                  colorScheme="blue"
                  type="submit"
                  isLoading={isLoading}
                  leftIcon={<FaSave fontSize={20} />}
                >
                  Guardar
                </Button>
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
