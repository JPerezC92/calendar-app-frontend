import { ChangeEventHandler, useCallback, useEffect } from 'react';
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
import { useForm, useRequestHandler } from 'src/modules/shared/hooks';
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
const initialStartDate = addHours(baseDate, 1).toISOString();
const initialEndDate = addHours(baseDate, 2).toISOString();

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
  const { isOpen, closeModal } = useCalendarModalState();
  const { formValues, formErrors, setFormValues, handleInputChange } =
    useForm<CalendarEventFormValues>(
      !calendarEvent
        ? newCalendarEventInitialState
        : CalendarEventMap.toFormValues(calendarEvent)
    );

  const handleStartDateChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value, validity } = event.target;

    if (validity.valid) {
      setFormValues({
        start: dateTimeStringToDate(value).toISOString(),
      });
    }
  };

  const handleEndDateChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, validity } = event.target;

    if (validity.valid) {
      setFormValues({ end: dateTimeStringToDate(value).toISOString() });
    }
  };

  const [handleSubmit, result, isLoading] = useRequestHandler(
    useCallback(() => {
      if (!calendarEvent) {
        return CreateEventExpressRepository({ ...formValues });
      }

      return UpdateEventExpressRepository({
        ...formValues,
        user: calendarEvent?.props.user,
        id: calendarEvent?.id.toValue(),
      });
    }, [calendarEvent, formValues])
  );

  useEffect(() => {
    if (result?.success) {
      const { addNewEvent, updateEvent } = calendarEventAction;
      if (calendarEvent) {
        calendarEventDispatch(
          updateEvent(CalendarEventMap.fromDTO(result.payload))
        );
      } else {
        calendarEventDispatch(
          addNewEvent(CalendarEventMap.fromDTO(result.payload))
        );
      }

      closeModal();
    }
  }, [calendarEvent, calendarEventDispatch, closeModal, result]);

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
                    value={dateToDateTimeString(new Date(formValues.start))}
                    max={dateToDateTimeString(new Date(formValues.end))}
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
                    value={dateToDateTimeString(new Date(formValues.end))}
                    isRequired
                    min={dateToDateTimeString(
                      addMinutes(new Date(formValues.start), 5)
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
                    placeholder="T??tulo del evento"
                    name="title"
                    autoComplete="off"
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                    value={formValues.title}
                    isRequired
                  />
                  <FormErrorMessage>{formErrors.title}</FormErrorMessage>
                  <small>Una descripci??n corta</small>
                </FormControl>

                <FormControl>
                  <FormLabel>Descripci??n</FormLabel>
                  <Textarea
                    placeholder="Notas"
                    rows={5}
                    name="notes"
                    value={formValues.notes}
                    onChange={handleInputChange}
                  />
                  <small>Informaci??n adicional</small>
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
        </ModalContent>
      </Modal>
    </>
  );
};

export default CalendarModal;
