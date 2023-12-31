import { TextInput } from '@mantine/core';
import { t } from 'i18next';
import { IStepProps } from '../../types/IStepProps';
import StepTitle from './Utils/StepTitle';
import Helper from '../Tooltip/Helper';

const NameStep: React.FC<IStepProps> = ({ form, translate }) => {
  return (
    <>
      <StepTitle label={t('register.nameStep.label')} />
      <TextInput
        autoFocus
        withAsterisk
        mt="sm"
        label={
          <Helper.Label
            label={t('register.nameStep.nameHelper.' + (translate ?? 'artist'))}
          >
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
