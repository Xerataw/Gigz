import { Button, Container } from '@mantine/core';
import { t } from 'i18next';
import { IStepProps } from '../../types/IStepProps';
import TooltipMenu from '../TooltipMenu';
import StepTitle from './Utils/StepTitle';

const ProfileTypeStep: React.FC<IStepProps> = ({ form, label, nextStep }) => {
  const handleClick = (type: string) => {
    form.setValues((values) => ({
      ...values,
      userType: type,
    }));
    setTimeout(() => {
      if (nextStep) nextStep();
    }, 200);
  };

  return (
    <>
      <StepTitle label={label} />
      <Button.Group orientation="vertical">
        <Container className="w-full relative" p="xl">
          <Button
            fullWidth
            onClick={() => handleClick('artist')}
            size="xl"
            variant={form.values.userType === 'artist' ? 'filled' : 'outline'}
          >
            {t('register.profileTypeStep.artist')}
          </Button>
          <div className="absolute p-10 top-0 right-0">
            <TooltipMenu label={t('register.profileTypeStep.artistTooltip')} />
          </div>
        </Container>

        <Container className="w-full relative" p="xl">
          <Button
            fullWidth
            onClick={() => handleClick('host')}
            size="xl"
            variant={form.values.userType === 'host' ? 'filled' : 'outline'}
          >
            {t('register.profileTypeStep.host')}
          </Button>
          <div className="absolute p-10 top-0 right-0">
            <TooltipMenu label={t('register.profileTypeStep.hostTooltip')} />
          </div>
        </Container>
      </Button.Group>
    </>
  );
};

export default ProfileTypeStep;
