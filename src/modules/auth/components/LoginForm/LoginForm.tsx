import React, { FormEventHandler } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';

import Form from 'src/modules/shared/components/Form';
import { FormTitle } from 'src/modules/shared/components/Form/FormTitle';
import { useForm } from 'src/modules/shared/hooks';
import { LoginExpressRepository } from '../../repositories/LoginExpressRepository';
import { Credentials } from '../../types';
import { useAuthenticationState } from '../../providers';
import { authenticationAction } from '../../reducers/authentication';
import LocalStorageService from 'src/modules/shared/services/LocalStorageService';
import { useToast } from '@chakra-ui/toast';

const loginFormStyles: ChakraProps = {
  display: 'flex',
  flexDirection: 'column',
  gridRowGap: 5,
};

const LoginForm: React.FC = () => {
  const toast = useToast();
  const authenticationState = useAuthenticationState();

  const { formValues: credentials, handleInputChange } = useForm<Credentials>({
    email: 'jperez.c921@gmail.com',
    password: '12345678aA-',
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const result = await LoginExpressRepository(credentials);

    if (result.success) {
      LocalStorageService.save('auth', {
        token: result.payload.token,
        tokenInitDate: new Date().toISOString(),
      });

      return authenticationState.dispatch(
        authenticationAction.login(result.payload.user)
      );
    }

    toast({
      title: result.message,
      status: 'error',
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} {...loginFormStyles}>
        <FormTitle>Iniciar Sesion</FormTitle>

        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            onChange={handleInputChange}
            placeholder="Correo"
            type="email"
            value={credentials.email}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Contraseña</FormLabel>
          <Input
            name="password"
            onChange={handleInputChange}
            placeholder="************"
            type="password"
            value={credentials.password}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Ingresar
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
