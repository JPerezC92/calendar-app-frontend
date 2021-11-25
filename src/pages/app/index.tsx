import { NextPage } from 'next';
import { chakra } from '@chakra-ui/system';

import Navbar from 'src/modules/shared/components/Navbar';
import Calendar from 'src/modules/calendar/components/Calendar';
import { useRender } from 'src/modules/shared/hooks';
import { CalendarProviders } from 'src/modules/calendar/components/Calendar/CalendarProviders';
import { withAuthentication } from 'src/modules/auth/HOCS';
import { useAuthenticationState } from 'src/modules/auth/providers';

const CalendarPage: NextPage = () => {
  const render = useRender();
  const { user } = useAuthenticationState();
  return (
    <chakra.div height="100vh">
      <Navbar user={user} />

      <CalendarProviders>{render.onClient && <Calendar />}</CalendarProviders>
    </chakra.div>
  );
};

export default withAuthentication({ WrappedComponent: CalendarPage });
