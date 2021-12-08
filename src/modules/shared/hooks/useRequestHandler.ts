import { useCallback, useState } from 'react';
import { useIsMounted } from './useIsMounted';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

interface UseRequestHandler {
  <Result>(request: () => Promise<Result>): readonly [
    handleOnSubmit: (event?: React.FormEvent<HTMLFormElement>) => void,
    result: Result | null,
    isSubmitting: boolean
  ];
}

/*
 * If you provide a request in a callback function, wrap it in a useCallback
 * to avoid unnecessary computation.
 */
export const useRequestHandler: UseRequestHandler = (request) => {
  const isMounted = useIsMounted();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<Awaited<
    ReturnType<typeof request>
  > | null>(null);

  const handleOnSubmit = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      event && event.preventDefault();

      try {
        if (isMounted()) {
          setIsSubmitting(true);
          const result = await request();
          setResult(() => result);
          setIsSubmitting(false);
        }
      } catch (error) {
        console.log(error);
        if (isMounted()) {
          setResult(() => null);
          setIsSubmitting(() => false);
        }
      }
    },
    [isMounted, request]
  );

  return [handleOnSubmit, result, isSubmitting] as const;
};
