import { useCallback, useEffect, useState } from 'react';
import { useIsMounted } from './useIsMounted';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

interface UseQueryRequest {
  <Result>(request: () => Promise<Result>): readonly [
    result: Result | null,
    isLoading: boolean
  ];
}

/*
 * If you provide a request in a callback function, wrap it in a useCallback
 * to avoid unnecessary re-renders.
 */
export const useQueryRequest: UseQueryRequest = (request) => {
  const isMounted = useIsMounted();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<Awaited<
    ReturnType<typeof request>
  > | null>(null);

  const fetchData = useCallback(async () => {
    try {
      if (isMounted()) {
        const result = await request();
        setResult(() => result);
        setIsLoading(() => false);
      }
    } catch (error) {
      console.log(error);
      if (isMounted()) {
        setResult(() => null);
        setIsLoading(() => false);
      }
    }
  }, [isMounted, request]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [result, isLoading];
};
