import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';

import LoadingSpinner from '../LoadingSpinner';

interface RedirectProps {
  to: string;
}

const Redirect: React.FC<RedirectProps> = ({ to }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [router, to]);

  return <LoadingSpinner />;
};

export default Redirect;
