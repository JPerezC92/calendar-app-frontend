import { useCallback, useEffect, useMemo, useState } from 'react';
import { useIsMounted } from './useIsMounted';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

interface UseQueryRequest {
  <Result>(request: () => Promise<Result>): readonly [
    result: Result | null,
    isLoading: boolean
  ];
}

export const useQueryRequest: UseQueryRequest = (request) => {
  const isMounted = useIsMounted();

  const [currentRequest] = useState(() => request);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Awaited<
    ReturnType<typeof request>
  > | null>(null);

  const fetchData = useCallback(async () => {
    try {
      if (isMounted()) {
        setIsLoading(() => true);
        const result = await currentRequest();
        setResult(() => result);
        setIsLoading(() => false);
      }
    } catch (error) {
      console.log(error);
      if (isMounted()) setResult(() => null);
    } finally {
      if (isMounted()) setIsLoading(() => false);
    }
  }, [isMounted, currentRequest]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [result, isLoading];
};
