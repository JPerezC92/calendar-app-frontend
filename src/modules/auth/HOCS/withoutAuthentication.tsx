import React from 'react';
import Redirect from 'src/modules/shared/components/Redirect';
import { AppWebRoute } from 'src/modules/shared/routes/app';
import { useAuthenticationState } from '../providers';

interface WithoutAuthenticationProps {
  WrappedComponent: React.FC;
}

export function withoutAuthentication({
  WrappedComponent,
}: WithoutAuthenticationProps): React.FC {
  const WithoutAuthentication: React.FC = () => {
    const { isAuthenticated } = useAuthenticationState();

    if (isAuthenticated) {
      return <Redirect to={AppWebRoute.ROOT} />;
    }

    return <WrappedComponent />;
  };

  return WithoutAuthentication;
}
