import { useState } from 'react';

export type ToFormValues<Type> = { [key in keyof Type]: string };
interface FormError<FormValues> {
  errorField: keyof FormValues;
  errorMessage: string;
}

interface UseForm {
  <FormValues = Record<string, string>>(values: FormValues): {
    formValues: FormValues;
    formErrors: Record<keyof typeof values, string>;
    handleInputChange(
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void;
    setFormValues(newFormValues: Partial<typeof values>): void;
    setFormError(formError: FormError<typeof values>): void;
    reset(): void;
  };
}

export type UseFormResult = ReturnType<UseForm>;

export const useForm: UseForm = (initialStateValues) => {
  const [values, setValues] = useState(initialStateValues);

  const [formErrors, setFormErrors] = useState(
    Object.fromEntries(
      Object.entries(initialStateValues).map(([key]) => [key, ''])
    ) as Record<keyof typeof initialStateValues, string>
  );

  const setFormError = ({
    errorField,
    errorMessage,
  }: {
    errorField: keyof typeof formErrors;
    errorMessage: string;
  }) => {
    setFormErrors((prevState) => ({
      ...prevState,
      [errorField]: errorMessage,
    }));
  };

  const handleInputChange: UseFormResult['handleInputChange'] = (event) => {
    const { name, value, validity, validationMessage } = event.target;
    const errorField = name as keyof typeof formErrors;

    if (!validity.valid) {
      setFormError({
        errorField,
        errorMessage: validationMessage,
      });
    } else {
      setFormError({ errorField, errorMessage: '' });
    }

    setValues((prevState) => ({ ...prevState, [name.trim()]: value }));
  };

  const setFormValues: UseFormResult['setFormValues'] = (newFormValues) => {
    setValues((prevState) => ({
      ...prevState,
      ...newFormValues,
    }));
  };

  const reset: UseFormResult['reset'] = () => {
    setValues(() => initialStateValues);
  };

  return {
    formValues: values,
    formErrors,
    handleInputChange,
    setFormValues,
    setFormError,
    reset,
  };
};
