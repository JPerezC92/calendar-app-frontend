import { FormEventHandler, useCallback, useState } from 'react';
import { useIsMounted } from './useIsMounted';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

interface UseSubmit {
  <Result>(request: () => Promise<Result>): readonly [
    handleOnSubmit: FormEventHandler<HTMLFormElement>,
    result: Result | null,
    isSubmitting: boolean
  ];
}

/*
 * If you provide a request in a callback function, wrap it in a useCallback
 * to avoid unnecessary computation.
 */
export const useSubmit: UseSubmit = (request) => {
  const isMounted = useIsMounted();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<Awaited<
    ReturnType<typeof request>
  > | null>(null);

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

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