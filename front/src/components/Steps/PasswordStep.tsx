import { PasswordInput } from '@mantine/core';
import { t } from 'i18next';
import { IStepProps } from '../../types/IStepProps';
import Helper from '../Tooltip/Helper';
import StepTitle from './Utils/StepTitle';

const PasswordStep: React.FC<IStepProps> = ({ form }) => {
  return (
    <>
      <StepTitle label={t('register.passwordStep.label')} />
      <PasswordInput
        withAsterisk
        mt="sm"
        autoFocus
        label={
          <Helper.Label
            label={t('register.passwordStep.passwordHelper')}
            labelDirection="right"
          >
            {t('register.passwordStep.password')}
          </Helper.Label>
        }
        {...form.getInputProps('password')}
      />
      <PasswordInput
        mt="sm"
        label={
          <Helper.Label
            label={t('register.passwordStep.passwordConfirmationHelper')}
            labelDirection="right"
          >
            {t('register.passwordStep.passwordConfirmation')}
          </Helper.Label>
        }
        {...form.getInputProps('confirmPassword')}
      />
    </>
  );
};

export default PasswordStep;
