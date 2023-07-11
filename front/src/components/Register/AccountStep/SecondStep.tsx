import { Text, TextInput, Title } from '@mantine/core';
import { IStepProps } from './FirstStep';

const SecondStep: React.FC<IStepProps> = ({ form }) => {
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
        icon={
          <Text color="black" size="sm">
            +33
          </Text>
        }
        label="Téléphone"
        placeholder="612345678"
        {...form.getInputProps('phone')}
      />
    </>
  );
};

export default SecondStep;
