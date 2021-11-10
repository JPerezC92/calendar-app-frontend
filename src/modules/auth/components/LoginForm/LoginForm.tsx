import React from 'react';
import { ChakraProps } from '@chakra-ui/system';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';

import Form from 'src/modules/shared/components/Form';
import { FormTitle } from 'src/modules/shared/components/Form/FormTitle';

interface LoginFormProps {}

const loginFormStyles: ChakraProps = {
  display: 'flex',
  flexDirection: 'column',
  gridRowGap: 5,
};

const LoginForm: React.FC<LoginFormProps> = () => {
  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('enviando');
        }}
        SubmitButton={
          <Button type="submit" colorScheme="blue">
            Ingresar
          </Button>
        }
        {...loginFormStyles}
      >
        <FormTitle>Iniciar Sesion</FormTitle>

        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Correo" type="email" />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Contraseña</FormLabel>
          <Input placeholder="************" type="text" />
        </FormControl>
      </Form>
    </>
  );
};

export default LoginForm;
