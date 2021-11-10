import React from 'react';
import { chakra } from '@chakra-ui/system';
import { Flex } from '@chakra-ui/layout';
import LogoutButton from 'src/modules/auth/components/LogoutButton';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <>
      <Flex
        padding={2}
        justifyContent="space-between"
        backgroundColor="gray.800"
        alignItems="center"
      >
        <chakra.span color="white">Pedro</chakra.span>

        <LogoutButton />
      </Flex>
    </>
  );
};

export default Navbar;
