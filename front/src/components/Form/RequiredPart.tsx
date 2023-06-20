import { Checkbox, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onSubmit: (values: { [value: string]: string | boolean }) => void;
}

const RequiredPart: React.FC<Props> = ({ children, onSubmit }) => {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        {...form.getInputProps('email')}
      />

      <Checkbox
        mt="md"
        label="I agree to sell my privacy"
        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
      />
      {children}
    </form>
  );
};

export default RequiredPart;
