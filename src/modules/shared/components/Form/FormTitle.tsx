import { Heading } from '@chakra-ui/layout';
import React from 'react';

export const FormTitle: React.FC = ({ children }) => {
  return <Heading textAlign="center">{children}</Heading>;
};
