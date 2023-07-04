import { PasswordInput, Title } from '@mantine/core';
import { StepProps } from './FirstStep';

const ThirdStep: React.FC<StepProps> = ({ form }) => {
  return (
    <>
      <Title>La sécurité</Title>
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

export default ThirdStep;