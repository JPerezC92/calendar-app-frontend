import React from 'react';
import Redirect from 'src/modules/shared/components/Redirect';
import { AuthWebRoute } from 'src/modules/shared/routes/app';
import { useAuthenticationState } from '../providers';

interface WithAuthenticationProps {
  WrappedComponent: React.FC;
}

export function withAuthentication({
  WrappedComponent,
}: WithAuthenticationProps): React.FC {
  const WithAuthentication: React.FC = () => {
    const { isAuthenticated } = useAuthenticationState();

    if (!isAuthenticated) {
      return <Redirect to={AuthWebRoute.LOGIN} />;
    }

    return <WrappedComponent />;
  };

  return WithAuthentication;
}
