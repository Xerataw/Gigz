import { Loader, Stepper, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import {
  IconAlignCenter,
  IconArrowUpBar,
  IconBoxMultiple,
  IconChecks,
  IconCircleCheck,
  IconCircleCheckFilled,
  IconExternalLink,
  IconMapPin,
  IconMusic,
  IconPencil,
  IconRulerMeasure,
  IconUserCircle,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { patchHostProfile } from '../../api/profile';
import AddressCompleteStep from '../../components/Steps/AddressCompleteStep';
import CapacityStep from '../../components/Steps/CapacityStep';
import DescriptionStep from '../../components/Steps/DescriptionStep';
import GenreStep from '../../components/Steps/GenreStep';
import NameStep from '../../components/Steps/NameStep';
import PresentationPicturesStep from '../../components/Steps/PresentationPicturesStep';
import ProfilePictureStep from '../../components/Steps/ProfilePictureStep';
import SocialLinksStep from '../../components/Steps/SocialLinksStep';
import StepperCompleted from '../../components/Steps/StepperCompleted';
import StepButtons from '../../components/Steps/Utils/StepButtons';
import StepperIcons from '../../components/Steps/Utils/StepperIcons';
import { stepperProps } from '../../configs/steppers/globalConfig';
import {
  getHostValuesReq,
  hostInitialValues,
  hostValidate,
  linksHost,
} from '../../configs/steppers/stepperHostConfig';

const RegisterHostProfile: React.FC = () => {
  const NUMBER_OF_STEPS = 8;

  const { t } = useTranslation();

  const [formStep, setFormStep] = useState<number>(0);
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: hostInitialValues,
    validate: (values) => hostValidate(values, formStep),
  });
  const [debounced] = useDebouncedValue(form.values, 1000);

  const nextStep = () => {
    if (formStep === NUMBER_OF_STEPS - 1) {
      setFormStep((old) => old + 1);
      patchHostProfile(getHostValuesReq(form.values)).then(() =>
        setFormStep((old) => old + 1)
      );
    } else {
      setFormStep((current) => {
        if (form.validate().hasErrors) {
          return current;
        }
        return current < NUMBER_OF_STEPS - 1 ? current + 1 : current;
      });
    }
  };

  const prevStep = () =>
    setFormStep((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    switch (formStep) {
      case 0:
        if (debounced.name.length > 0) {
          form.validate();
        }
        break;
      case 3:
        if (debounced.address.value?.length > 0)
          form.validateField('address.value');
        break;

      default:
        break;
    }
  }, [debounced]);

  return (
    <div className="pt-10 border border-red-500 flex flex-col items-center">
      <Title order={2} mb={'sm'}>
        {t('stepper.title')}
      </Title>
      <StepperIcons
        icons={[
          <IconPencil key={0} />,
          <IconAlignCenter key={1} />,
          <IconMapPin key={3} />,
          <IconMusic key={4} />,
          <IconUserCircle key={6} />,
          <IconBoxMultiple key={5} />,
          <IconRulerMeasure key={7} />,
          <IconExternalLink key={2} />,

          <IconArrowUpBar key={5} />,
          <IconChecks key={6} />,
        ]}
        currentStep={formStep}
        form={form}
      />
      <Stepper active={formStep} {...stepperProps}>
        <Stepper.Step>
          <NameStep form={form} label={t('stepper.nameStep')} />
        </Stepper.Step>

        <Stepper.Step>
          <DescriptionStep form={form} label={t('stepper.descriptionStep')} />
        </Stepper.Step>

        <Stepper.Step>
          <AddressCompleteStep
            form={form}
            type="address"
            label={t('stepper.addressCompleteStep')}
          />
        </Stepper.Step>

        <Stepper.Step>
          <ProfilePictureStep
            form={form}
            label={t('stepper.presentationPicturesStep')}
          />
        </Stepper.Step>

        <Stepper.Step>
          <GenreStep form={form} label={t('stepper.genreStep')} />
        </Stepper.Step>

        <Stepper.Step>
          <CapacityStep form={form} label={t('stepper.capacityStep')} />
        </Stepper.Step>

        <Stepper.Step>
          <SocialLinksStep
            links={linksHost}
            form={form}
            label={t('stepper.socialLinksStep')}
          />
        </Stepper.Step>

        <Stepper.Step>
          <PresentationPicturesStep
            form={form}
            label={t('stepper.presentationPicturesStep')}
          />
        </Stepper.Step>

        <Stepper.Step
          icon={<IconCircleCheck />}
          completedIcon={<IconCircleCheckFilled />}
        >
          <Loader variant="bars" />
        </Stepper.Step>

        <Stepper.Completed>
          <StepperCompleted
            label={t('stepper.competeProfile')}
            path="auth/profile"
          />
        </Stepper.Completed>
      </Stepper>

      <StepButtons
        formStep={formStep}
        nextStep={nextStep}
        numberOfSteps={NUMBER_OF_STEPS}
        prevStep={prevStep}
      />
    </div>
  );
};

export default RegisterHostProfile;
