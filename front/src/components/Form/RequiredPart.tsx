import { Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { ReactElement, ReactNode } from 'react';

interface Input {
  required: boolean;
  label: string;
  placeholder: string;
  validate: (
    value: string,
    values: {
      [key: string]: string;
    }
  ) => string | null;
  initialValue: string;
  id: string;
}

const getInput = (input: Input): ReactNode => {
  const props = {
    label: input.label,
    placeholder: input.placeholder,
    withAsterisk: input.required,
  };

  switch (input.id) {
    case 'password':
    case 'passwordConfirmation':
      return <PasswordInput {...props} />;

    default:
      return <TextInput {...props} />;
  }
};

interface Props {
  onSubmit: (values: { [value: string]: string | boolean }) => void;
  currentPart?: number;
  updateCurrentPart?: (part: number) => void;
  inputs: Input[];
}

const RequiredPart: React.FC<Props> = ({
  onSubmit,
  currentPart,
  updateCurrentPart,
  inputs,
}) => {
  const initialValues: { [key: string]: string } = {};
  const validate: {
    [key: string]: (
      value: string,
      values: {
        [key: string]: string;
      }
    ) => string | null;
  } = {};

  inputs.forEach((element) => {
    initialValues[element.id] = element.initialValue;
    validate[element.id] = (value, values) => element.validate(value, values);
  });

  const form = useForm({
    initialValues,
    validate,
  });

  const _currentPart = currentPart ?? 0;
  const _updateCurrentPart = updateCurrentPart ?? (() => undefined);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values);
        if (_currentPart < inputs.length - 1)
          _updateCurrentPart(_currentPart + 1);
      })}
    >
      {inputs.map((input) => (
        <div key={input.id}>
          {React.cloneElement(getInput(input) as ReactElement, {
            ...form.getInputProps(input.id),
          })}
        </div>
      ))}
      <Group>
        {_currentPart > 0 && (
          <Button
            onClick={() => {
              if (_currentPart > 0) _updateCurrentPart(_currentPart - 1);
            }}
          >
            Précédent
          </Button>
        )}
        <Button type="submit">
          {_currentPart < inputs.length - 1 ? 'Prochaine Étape' : 'Valider'}
        </Button>
      </Group>
    </form>
  );
};

export default RequiredPart;
