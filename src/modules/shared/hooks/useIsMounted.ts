import { useCallback, useEffect, useRef } from 'react';

export const useIsMounted = () => {
  const __isMounted = useRef(true);

  const isMounted = useCallback(() => __isMounted.current, []);

  useEffect(() => {
    __isMounted.current = true;
    return () => {
      __isMounted.current = false;
    };
  }, []);

  return isMounted;
};
