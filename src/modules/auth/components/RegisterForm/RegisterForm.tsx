import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { ChakraProps } from '@chakra-ui/system';

import Form from 'src/modules/shared/components/Form';
import { FormTitle } from 'src/modules/shared/components/Form/FormTitle';

const registerFormStyles: ChakraProps = {
  display: 'flex',
  flexDirection: 'column',
  gridRowGap: 5,
};

const RegisterForm: React.FC = () => {
  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()} {...registerFormStyles}>
        <FormTitle>Registrarse</FormTitle>

        <FormControl id="firstname" isRequired>
          <FormLabel>Nombres</FormLabel>
          <Input placeholder="Nombres" type="text" />
        </FormControl>

        <FormControl id="lastname" isRequired>
          <FormLabel>Apellidos</FormLabel>
          <Input placeholder="Apellidos" type="text" />
        </FormControl>

        <FormControl id="email" isRequired>
          <FormLabel>Correo</FormLabel>
          <Input placeholder="Correo" type="email" />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Contraseña</FormLabel>
          <Input placeholder="************" type="text" />
        </FormControl>

        <FormControl id="confirmPassword" isRequired>
          <FormLabel>Confirmar contraseña</FormLabel>
          <Input placeholder="************" type="text" />
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Enviar
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
