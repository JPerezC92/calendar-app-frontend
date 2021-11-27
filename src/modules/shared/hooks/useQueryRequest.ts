import { useEffect, useState } from 'react';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

interface UseQueryRequest {
  <Result>(request: () => Promise<Result>): readonly [
    result: Result | null,
    isLoading: boolean
  ];
}

let __isMounted = true;

export const useQueryRequest: UseQueryRequest = (request) => {
  const [result, setResult] = useState<Awaited<
    ReturnType<typeof request>
  > | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const callRequest = async () => {
      setIsLoading(() => true);
      const result = await request();
      setResult(result);
      setIsLoading(() => false);
    };

    if (__isMounted) {
      callRequest();
    }
    return () => {
      __isMounted = false;
    };
  }, [request]);

  return [result, isLoading];
};
