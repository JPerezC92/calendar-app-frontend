import React, { ChangeEventHandler, useState } from 'react';
import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
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

interface CalendarModalProps {}

const baseDate = parse(
  format(new Date(), 'yyyy-MM-d HH:00'),
  'yyyy-MM-d HH:mm',
  new Date()
);

const initialStartDate = addHours(baseDate, 1);
const initialEndDate = addHours(baseDate, 2);
const minEndDate = addMinutes(initialStartDate, 5);

const dateTimeStringToDate = (datetimeString: string): Date => {
  return parse(datetimeString, "yyyy-MM-dd'T'HH:mm", new Date());
};

const dateTimeToString = (datetime: Date): string => {
  return format(datetime, "yyyy-MM-dd'T'HH:mm");
};

const CalendarModal: React.FC<CalendarModalProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const [formValues, setFormValues] = useState({
    title: 'Evento',
    notes: '',
    startDate: dateTimeToString(startDate),
    endDate: dateTimeToString(endDate),
  });

  const [formErrors, setFormErrors] = useState({
    title: '',
    notes: '',
    startDate: '',
    endDate: '',
  });

  const formHasErrors = Object.values(formErrors).some((value) => value !== '');

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const { name, value } = event.target;

    setFormValues({ ...formValues, [name]: value.trim() });

    if (value === undefined || value === '') {
      setFormErrors({ ...formErrors, [name]: 'Este campo es obligatorio' });
    } else {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const handleStartDateChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value, validity, validationMessage } = event.target;

    if (validity.valid) {
      setStartDate(() => dateTimeStringToDate(value));
      setFormValues({ ...formValues, startDate: value });
    }

    if (!validity.valid) {
      setFormErrors({ ...formErrors, startDate: validationMessage });
    } else {
      setFormErrors({ ...formErrors, startDate: '' });
    }
  };

  const handleEndDateChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, validity, validationMessage } = event.target;

    if (validity.valid) {
      setEndDate(() => dateTimeStringToDate(value));
      setFormValues({ ...formValues, endDate: value });
    }

    if (!validity.valid) {
      setEndDate(() => minEndDate);
      setFormErrors({ ...formErrors, endDate: validationMessage });
    } else {
      setFormErrors({ ...formErrors, endDate: '' });
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo evento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <Divider />
              <Form
                display="flex"
                flexDirection="column"
                gridRowGap={3}
                marginBlock={3}
                onSubmit={(event) => {
                  event.preventDefault();
                  // console.log(formValues);
                }}
                SubmitButton={
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    type="submit"
                    isDisabled={formHasErrors}
                    leftIcon={<FaSave fontSize={20} />}
                  >
                    Guardar
                  </Button>
                }
              >
                <FormControl
                  isInvalid={Boolean(formErrors.startDate)}
                  isRequired
                >
                  <FormLabel>Fecha y hora inicio</FormLabel>
                  <Input
                    defaultValue={formValues.startDate}
                    isRequired
                    onChange={handleStartDateChange}
                    placeholder="Fecha inicio"
                    required
                    type="datetime-local"
                  />
                  <FormErrorMessage>{formErrors.startDate}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(formErrors.endDate)} isRequired>
                  <FormLabel>Fecha y hora fin</FormLabel>
                  <Input
                    defaultValue={formValues.endDate}
                    isRequired
                    min={dateTimeToString(minEndDate)}
                    onChange={handleEndDateChange}
                    placeholder="Fecha fin"
                    required
                    type="datetime-local"
                  />
                  <FormErrorMessage>{formErrors.endDate}</FormErrorMessage>
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
                    defaultValue={formValues.title}
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
                    defaultValue={formValues.notes}
                    onChange={handleInputChange}
                    isRequired
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
