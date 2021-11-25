import { chakra } from '@chakra-ui/system';
import { Flex } from '@chakra-ui/layout';
import LogoutButton from 'src/modules/auth/components/LogoutButton';
import { User } from 'src/modules/auth/types';

interface NavbarProps {
  user: User;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <>
      <Flex
        padding={2}
        justifyContent="space-between"
        backgroundColor="gray.800"
        alignItems="center"
      >
        <chakra.span color="white">{user.name}</chakra.span>

        <LogoutButton />
      </Flex>
    </>
  );
};

export default Navbar;
