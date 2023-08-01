import { Textarea } from '@mantine/core';
import { t } from 'i18next';
import { IStepProps } from '../../types/IStepProps';
import Helper from '../Tooltip/Helper';
import StepTitle from './Utils/StepTitle';

const DescriptionStep: React.FC<IStepProps> = ({ form, translate }) => {
  return (
    <>
      <StepTitle label={t('register.descriptionStep.label')} />
      <Textarea
        autoFocus
        placeholder={t('register.descriptionStep.placeholder')}
        label={
          <Helper.Label
            label={t(
              'register.descriptionStep.descriptionHelper.' +
                (translate ?? 'artist')
            )}
          >
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
