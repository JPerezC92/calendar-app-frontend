import React, { useCallback, useEffect } from 'react';
import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { ChakraProps } from '@chakra-ui/system';
import { Tooltip } from '@chakra-ui/tooltip';
import { useToast } from '@chakra-ui/toast';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

import Form from 'src/modules/shared/components/Form';
import { FormTitle } from 'src/modules/shared/components/Form/FormTitle';
import { useForm, useRequestHandler } from 'src/modules/shared/hooks';
import { RegisterUserValues } from '../../types';
import { RegisterExpressRepository } from '../../repositories/RegisterExpressRepository';
import { useAuthenticationDispatch } from '../../providers';
import { authenticationAction } from '../../reducers/authentication';
import { LocalStorageService } from 'src/modules/shared/services';

const registerFormStyles: ChakraProps = {
  display: 'flex',
  flexDirection: 'column',
  gridRowGap: 5,
};

const registerFormInitialState: RegisterUserValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterForm: React.FC = () => {
  const authDispatch = useAuthenticationDispatch();
  const toast = useToast();
  const { formValues, formErrors, handleInputChange } = useForm(
    registerFormInitialState
  );
  const registerRequest = useCallback(
    () => RegisterExpressRepository(formValues),
    [formValues]
  );
  const [handleSubmit, result, isLoading] = useRequestHandler(registerRequest);

  useEffect(() => {
    if (result?.success) {
      const { payload } = result;

      LocalStorageService.save('auth', {
        token: payload.token,
        tokenInitDate: new Date().toISOString(),
      });

      return authDispatch(authenticationAction.login(payload.user));
    }

    if (result && !result.success) {
      toast({
        title: result.message,
        status: 'error',
      });
    }
  }, [authDispatch, result, toast]);

  return (
    <>
      <Form onSubmit={handleSubmit} {...registerFormStyles}>
        <FormTitle>Registrarse</FormTitle>

        <FormControl
          id="firstname"
          isInvalid={Boolean(formErrors.firstname)}
          isRequired
        >
          <FormLabel>Nombres</FormLabel>
          <InputGroup>
            <Input
              name="firstname"
              onChange={handleInputChange}
              onBlur={handleInputChange}
              placeholder="Nombres"
              type="text"
              value={formValues.firstname}
            />
          </InputGroup>
          <FormErrorMessage>{formErrors.firstname}</FormErrorMessage>
        </FormControl>

        <FormControl
          id="lastname"
          isInvalid={Boolean(formErrors.lastname)}
          isRequired
        >
          <FormLabel>Apellidos</FormLabel>
          <Input
            name="lastname"
            onChange={handleInputChange}
            onBlur={handleInputChange}
            placeholder="Apellidos"
            type="text"
            value={formValues.lastname}
          />
          <FormErrorMessage>{formErrors.lastname}</FormErrorMessage>
        </FormControl>

        <FormControl
          id="email"
          isInvalid={Boolean(formErrors.email)}
          isRequired
        >
          <FormLabel>Correo</FormLabel>
          <Input
            name="email"
            onBlur={handleInputChange}
            onChange={handleInputChange}
            pattern={/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.source}
            placeholder="Correo"
            type="email"
            value={formValues.email}
          />
          <FormErrorMessage>{formErrors.email}</FormErrorMessage>
        </FormControl>

        <FormControl
          id="password"
          isInvalid={Boolean(formErrors.password)}
          isRequired
        >
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <Input
              name="password"
              onBlur={handleInputChange}
              onChange={handleInputChange}
              pattern={
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.source
              }
              placeholder="************"
              type="password"
              value={formValues.password}
            />
            <InputRightElement>
              <Tooltip
                hasArrow
                placement="top"
                gutter={15}
                label="La contraseña debe contener minimo 8 caracteres, una minuscula, una mayuscula y un número"
                closeOnClick
                // isOpen={Boolean(formErrors.password)}
                closeDelay={1000}
              >
                <span>
                  <AiOutlineQuestionCircle />
                </span>
              </Tooltip>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formErrors.password}</FormErrorMessage>
        </FormControl>

        <FormControl
          id="confirmPassword"
          isInvalid={Boolean(formErrors.confirmPassword)}
          isRequired
        >
          <FormLabel>Confirmar contraseña</FormLabel>
          <Input
            name="confirmPassword"
            onBlur={handleInputChange}
            onChange={handleInputChange}
            pattern={formValues.password}
            placeholder="************"
            type="password"
            value={formValues.confirmPassword}
          />
          <FormErrorMessage>
            {formErrors.confirmPassword ||
            formValues.password !== formValues.confirmPassword
              ? 'Las contraseñas deben coincidir'
              : ''}
          </FormErrorMessage>
        </FormControl>

        <Button isLoading={isLoading} type="submit" colorScheme="blue">
          Enviar
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
