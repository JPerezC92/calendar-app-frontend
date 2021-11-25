import React, { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { CircularProgress } from '@chakra-ui/progress';
import { Box } from '@chakra-ui/layout';

interface RedirectProps {
  to: string;
}

const Redirect: React.FC<RedirectProps> = ({ to }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [router, to]);

  return (
    <Box width="100vw" height="100vh" display="flex">
      <CircularProgress isIndeterminate color="green.300" margin="auto" />
    </Box>
  );
};

export default Redirect;
