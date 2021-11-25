import React, { DOMAttributes } from 'react';
import { chakra, ChakraProps } from '@chakra-ui/system';

interface FormProps {
  onSubmit: DOMAttributes<HTMLFormElement>['onSubmit'];
}

const Form: React.FC<ChakraProps & FormProps> = ({ children, ...rest }) => {
  return (
    <>
      <chakra.form {...rest}>{children}</chakra.form>
    </>
  );
};

export default Form;
