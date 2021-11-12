import { NextPage } from 'next';
import { chakra } from '@chakra-ui/system';

import Navbar from 'src/modules/shared/components/Navbar';
import Calendar from 'src/modules/calendar/components/Calendar';
import { useRender } from 'src/modules/shared/hooks';
import { CalendarProviders } from 'src/modules/calendar/components/Calendar/CalendarProviders';

const CalendarPage: NextPage = () => {
  const render = useRender();
  return (
    <chakra.div height="100vh">
      <Navbar />

      <CalendarProviders>{render.onClient && <Calendar />}</CalendarProviders>
    </chakra.div>
  );
};

export default CalendarPage;
