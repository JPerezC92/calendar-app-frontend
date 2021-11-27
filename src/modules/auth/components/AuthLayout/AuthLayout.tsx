import React from 'react';
import { chakra } from '@chakra-ui/system';

const AuthLayout: React.FC = ({ children }) => {
  return (
    <chakra.main
      width="100vw"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      padding={10}
    >
      {children}
    </chakra.main>
  );
};

export default AuthLayout;
