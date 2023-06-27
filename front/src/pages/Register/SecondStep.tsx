import { TextInput, Title } from '@mantine/core';
import { StepProps } from './FirstStep';

const SecondStep: React.FC<StepProps> = ({ form }) => {
  return (
    <>
      <Title>Pour vous retrouver</Title>
      <TextInput
        autoFocus
        mt="sm"
        label="Email"
        placeholder="email@host.com"
        {...form.getInputProps('email')}
      />
      <TextInput
        mt="sm"
        label="Téléphone"
        placeholder="0695818549"
        {...form.getInputProps('phone')}
      />
    </>
  );
};

export default SecondStep;
