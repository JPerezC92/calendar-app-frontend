import { RiLogoutCircleRLine } from 'react-icons/ri';
import { Button } from '@chakra-ui/button';
import { useAuthenticationDispatch } from '../../providers';
import { authenticationAction } from '../../reducers/authentication';
import { LocalStorageService } from 'src/modules/shared/services';

const LogoutButton: React.FC = () => {
  const authDispatch = useAuthenticationDispatch();

  const handleLogout = () => {
    LocalStorageService.remove('auth');
    authDispatch(authenticationAction.logoout());
  };

  return (
    <>
      <Button
        _hover={{ backgroundColor: 'red.500', color: 'white' }}
        borderColor="red.500"
        color={'red.500'}
        leftIcon={<RiLogoutCircleRLine />}
        onClick={handleLogout}
        variant="outline"
      >
        Salir
      </Button>
    </>
  );
};

export default LogoutButton;
