import React, { useCallback, useEffect } from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';

import Form from 'src/modules/shared/components/Form';
import { FormTitle } from 'src/modules/shared/components/Form/FormTitle';
import { useForm, useSubmit } from 'src/modules/shared/hooks';
import { LoginExpressRepository } from '../../repositories/LoginExpressRepository';
import { Credentials } from '../../types';
import { useAuthenticationDispatch } from '../../providers';
import { authenticationAction } from '../../reducers/authentication';
import { LocalStorageService } from 'src/modules/shared/services';
import { useToast } from '@chakra-ui/toast';

const loginFormStyles: ChakraProps = {
  display: 'flex',
  flexDirection: 'column',
  gridRowGap: 5,
};

const LoginForm: React.FC = () => {
  const toast = useToast();
  const authDispatch = useAuthenticationDispatch();

  const { formValues: credentials, handleInputChange } = useForm<Credentials>({
    email: 'jperez.c92@gmail.com',
    password: '123456aA',
  });

  const loginRequest = useCallback(
    () => LoginExpressRepository(credentials),
    [credentials]
  );

  const [handleSubmit, result, isSubmitting] = useSubmit(loginRequest);

  useEffect(() => {
    if (result?.success) {
      LocalStorageService.save('auth', {
        token: result.payload.token,
        tokenInitDate: new Date().toISOString(),
      });

      return authDispatch(authenticationAction.login(result.payload.user));
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

        <Button isLoading={isSubmitting} type="submit" colorScheme="blue">
          Ingresar
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
