import { useEffect, useState } from 'react';
import { ApplicationSide } from '../utils/ApplicationSide';

export interface UseRender {
  (): { onClient: boolean; onServer: boolean };
}

export type Render = ReturnType<UseRender>;

export const useRender: UseRender = () => {
  const [onClient, setOnClient] = useState(false);

  useEffect(() => {
    if (ApplicationSide.isBrowser) {
      setOnClient(true);
    }
  }, []);

  return { onClient, onServer: !onClient };
};
