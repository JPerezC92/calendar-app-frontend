import { Flex } from '@chakra-ui/layout';

const AuthFormContainer: React.FC = ({ children }) => {
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
