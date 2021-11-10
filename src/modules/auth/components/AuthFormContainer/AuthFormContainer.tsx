import React from 'react';
import { Flex } from '@chakra-ui/layout';

interface AuthFormContainerProps {}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({ children }) => {
  return (
    <Flex
      margin="auto"
      flexDirection="column"
      gridRowGap={5}
      width="100%"
      minWidth="min-content"
      maxWidth="md"
    >
      {children}
    </Flex>
  );
};

export default AuthFormContainer;
