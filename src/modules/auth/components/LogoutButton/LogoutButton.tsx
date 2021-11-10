import React from 'react';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { Button } from '@chakra-ui/button';

const LogoutButton: React.FC = () => {
  return (
    <>
      <Button
        leftIcon={<RiLogoutCircleRLine />}
        variant="outline"
        borderColor="red.500"
        color={'red.500'}
        _hover={{ backgroundColor: 'red.500', color: 'white' }}
      >
        Salir
      </Button>
    </>
  );
};

export default LogoutButton;
