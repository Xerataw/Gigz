import { PasswordInput } from '@mantine/core';
import TitleStep from '../ProfileSteps/TitleStep';
import { IStepProps } from '../../../types/IStepProps';

const PasswordStep: React.FC<IStepProps> = ({ form, label }) => {
  return (
    <>
      <TitleStep label={label} />
      <PasswordInput
        mt="sm"
        autoFocus
        label="Mot de passe"
        {...form.getInputProps('password')}
      />
      <PasswordInput
        mt="sm"
        label="Répéter le mot de passe"
        {...form.getInputProps('confirmPassword')}
      />
    </>
  );
};

export default PasswordStep;
