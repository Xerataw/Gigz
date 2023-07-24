import { Text, TextInput } from '@mantine/core';
import { IStepProps } from '../../types/IStepProps';
import StepTitle from './Utils/StepTitle';

const MailPhoneStep: React.FC<IStepProps> = ({ form, label }) => {
  return (
    <>
      <StepTitle label={label} />
      <TextInput
        withAsterisk
        autoFocus
        mt="sm"
        label="Email"
        placeholder="email@host.com"
        {...form.getInputProps('email')}
      />
      <TextInput
        withAsterisk
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

export default MailPhoneStep;
