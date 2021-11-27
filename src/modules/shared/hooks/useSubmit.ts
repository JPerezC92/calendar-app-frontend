import { FormEventHandler, useEffect, useState } from 'react';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

interface UseSubmit {
  <Result>(request: () => Promise<Result>): readonly [
    handleOnSubmit: FormEventHandler<HTMLFormElement>,
    result: Result | null,
    isSubmitting: boolean
  ];
}

let __isMounted = true;

export const useSubmit: UseSubmit = (request) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<Awaited<
    ReturnType<typeof request>
  > | null>(null);

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (__isMounted) {
      const result = await request();
      setResult(() => result);

      setIsSubmitting(false);
    }
  };

  useEffect(
    () => () => {
      __isMounted = false;
    },
    []
  );

  return [handleOnSubmit, result, isSubmitting] as const;
};
