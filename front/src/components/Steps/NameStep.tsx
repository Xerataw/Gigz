import { TextInput } from '@mantine/core';
import { t } from 'i18next';
import { IStepProps } from '../../types/IStepProps';
import StepTitle from './Utils/StepTitle';
import Helper from '../Tooltip/Helper';

const NameStep: React.FC<IStepProps> = ({ form }) => {
  return (
    <>
      <StepTitle label={t('register.nameStep.label')} />
      <TextInput
        autoFocus
        mt="sm"
        label={
          <Helper.Label label={t('register.nameStep.nameHelper')}>
            {t('register.nameStep.name')}
          </Helper.Label>
        }
        placeholder="Antarctic Lemur"
        {...form.getInputProps('name')}
      />
    </>
  );
};

export default NameStep;
