import React from 'react';
import { chakra } from '@chakra-ui/system';

interface AuthLayoutProps {}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <chakra.main
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      padding={10}
    >
      {children}
    </chakra.main>
  );
};

export default AuthLayout;
