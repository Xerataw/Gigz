import { Textarea } from '@mantine/core';
import StepTitle from './Utils/StepTitle';
import { IStepProps } from '../../types/IStepProps';
import { t } from 'i18next';
import Helper from '../Tooltip/Helper';

const DescriptionStep: React.FC<IStepProps> = ({ form }) => {
  return (
    <>
      <StepTitle label={t('register.descriptionStep.label')} />
      <Textarea
        autoFocus
        placeholder={t('register.descriptionStep.placeholder')}
        label={
          <Helper.Label label={t('register.descriptionStep.descriptionHelper')}>
            {t('register.descriptionStep.description')}
          </Helper.Label>
        }
        autosize
        minRows={4}
        {...form.getInputProps('description')}
      />
    </>
  );
};

export default DescriptionStep;
