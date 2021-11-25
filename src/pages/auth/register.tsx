import Link from 'next/link';
import { NextPage } from 'next';
import { Button } from '@chakra-ui/button';
import { Divider } from '@chakra-ui/layout';

import AuthFormContainer from 'src/modules/auth/components/AuthFormContainer';
import AuthLayout from 'src/modules/auth/components/AuthLayout';
import RegisterForm from 'src/modules/auth/components/RegisterForm';
import { withoutAuthentication } from 'src/modules/auth/HOCS';
import { AuthWebRoute } from 'src/modules/shared/routes/app';

const RegisterPage: NextPage = () => {
  return (
    <AuthLayout>
      <AuthFormContainer>
        <RegisterForm />

        <Divider />

        <Link href={AuthWebRoute.LOGIN} passHref>
          <Button as="a" variant="outline" colorScheme="cyan">
            Iniciar Sesion
          </Button>
        </Link>
      </AuthFormContainer>
    </AuthLayout>
  );
};

export default withoutAuthentication({ WrappedComponent: RegisterPage });
