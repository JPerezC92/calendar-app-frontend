import { NextPage } from 'next';
import Link from 'next/link';
import { Button } from '@chakra-ui/button';
import { Divider } from '@chakra-ui/layout';

import AuthFormContainer from 'src/modules/auth/components/AuthFormContainer';
import AuthLayout from 'src/modules/auth/components/AuthLayout';
import LoginForm from 'src/modules/auth/components/LoginForm';
import { withoutAuthentication } from 'src/modules/auth/HOCS';
import { AuthWebRoute } from 'src/modules/shared/routes/app';

const LoginPage: NextPage = () => {
  return (
    <AuthLayout>
      <AuthFormContainer>
        <LoginForm />
        <Divider />
        <Link href={AuthWebRoute.REGISTER} passHref>
          <Button as="a" variant="outline" colorScheme="cyan">
            Registrarse
          </Button>
        </Link>
      </AuthFormContainer>
    </AuthLayout>
  );
};

export default withoutAuthentication({ WrappedComponent: LoginPage });
