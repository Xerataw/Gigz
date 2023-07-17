import { Text, TextInput } from '@mantine/core';
import { IStepProps } from '../../../types/IStepProps';
import TitleStep from '../ProfileSteps/TitleStep';

const MailPhoneStep: React.FC<IStepProps> = ({ form, label }) => {
  return (
    <>
      <TitleStep label={label} />
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

export default MailPhoneStep;
