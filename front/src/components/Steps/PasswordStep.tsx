import { PasswordInput } from '@mantine/core';
import { IStepProps } from '../../types/IStepProps';
import StepTitle from './Utils/StepTitle';

const PasswordStep: React.FC<IStepProps> = ({ form, label }) => {
  return (
    <>
      <StepTitle label={label} />
      <PasswordInput
        withAsterisk
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
