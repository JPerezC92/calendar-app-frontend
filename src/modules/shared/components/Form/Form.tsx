import React, { DOMAttributes } from 'react';
import { chakra, ChakraProps } from '@chakra-ui/system';

interface FormProps {
  onSubmit: DOMAttributes<HTMLFormElement>['onSubmit'];
  SubmitButton: React.ReactElement;
}

const Form: React.FC<ChakraProps & FormProps> = ({
  children,
  SubmitButton,
  ...rest
}) => {
  return (
    <>
      <chakra.form {...rest}>
        {children}
        {SubmitButton}
      </chakra.form>
    </>
  );
};

export default Form;
