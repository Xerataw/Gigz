import { Text, TextInput } from '@mantine/core';
import { t } from 'i18next';
import { IStepProps } from '../../types/IStepProps';
import Helper from '../Tooltip/Helper';
import StepTitle from './Utils/StepTitle';

const MailPhoneStep: React.FC<IStepProps> = ({ form }) => {
  return (
    <>
      <StepTitle label={t('register.mailPhoneStep.label')} />
      <TextInput
        withAsterisk
        autoFocus
        mt="sm"
        label={
          <Helper.Label
            label={t('register.mailPhoneStep.emailHelper')}
            labelDirection="right"
          >
            {t('register.mailPhoneStep.email')}
          </Helper.Label>
        }
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
        label={
          <Helper.Label
            label={t('register.mailPhoneStep.phoneHelper')}
            labelDirection="right"
          >
            {t('register.mailPhoneStep.phone')}
          </Helper.Label>
        }
        placeholder="612345678"
        {...form.getInputProps('phone')}
      />
    </>
  );
};

export default MailPhoneStep;
