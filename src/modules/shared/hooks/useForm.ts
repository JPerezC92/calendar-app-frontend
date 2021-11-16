import { useState } from 'react';

interface FormError<FormValues> {
  errorField: keyof FormValues;
  errorMessage: string;
}

interface UseForm {
  <FormValues = Record<string, unknown>>(values: FormValues): {
    formValues: FormValues;
    formErrors: Record<keyof FormValues, string>;
    isValid: boolean;
    handleInputChange(
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void;
    setFormValue<Key extends keyof FormValues>(
      newFormValues: Record<Key, FormValues[Key]>
    ): void;
    setFormError(formError: FormError<FormValues>): void;
    setNewformValues(newFormState: FormValues): void;
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

  const isValid = Object.values(formErrors).every((value) => value === '');

  const setNewformValues = (newFormValues = initialStateValues) => {
    setValues(() => newFormValues);
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

  const setFormValue: UseFormResult['setFormValue'] = (newFormValues) => {
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
    isValid,
    handleInputChange,
    setFormValue,
    setFormError,
    reset,
    setNewformValues,
  };
};
