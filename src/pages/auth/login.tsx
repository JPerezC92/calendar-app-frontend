import { NextPage } from 'next';
import { Button } from '@chakra-ui/button';
import { Divider } from '@chakra-ui/layout';

import AuthFormContainer from 'src/modules/auth/components/AuthFormContainer';
import AuthLayout from 'src/modules/auth/components/AuthLayout';
import LoginForm from 'src/modules/auth/components/LoginForm';
import { withoutAuthentication } from 'src/modules/auth/HOCS';

const LoginPage: NextPage = () => {
  return (
    <AuthLayout>
      <AuthFormContainer>
        <LoginForm />
        <Divider />
        <Button variant="outline" colorScheme="cyan">
          Registrarse
        </Button>
      </AuthFormContainer>
    </AuthLayout>
  );
};

export default withoutAuthentication({ WrappedComponent: LoginPage });
