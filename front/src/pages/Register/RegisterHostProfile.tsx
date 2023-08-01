import { Loader, ScrollArea, Stepper, Title } from '@mantine/core';
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
import { patchHostProfile } from '../../api/user';
import Fade from '../../components/Animations/Fade';
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
  const [stepWillChange, setStepWillChange] = useState<boolean>(false);

  const form = useForm({
    validateInputOnBlur: true,
    initialValues: hostInitialValues,
    validate: (values) => hostValidate(values, formStep),
  });
  const [debounced] = useDebouncedValue(form.values, 1000);

  const nextStep = () => {
    if (formStep === NUMBER_OF_STEPS - 1) {
      setFormStep((old) => old + 1);
      patchHostProfile(getHostValuesReq(form.values)).then((res) => {
        setFormStep((old) => old + 1);
      });
    } else {
      setFormStep((current) => {
        if (form.validate().hasErrors) {
          return current;
        }
        return current < NUMBER_OF_STEPS - 1 ? current + 1 : current;
      });
    }
    setStepWillChange(false);
  };

  const handleNextStep = () => {
    if (form.validate().hasErrors === false) setStepWillChange(true);
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
      case 6:
        form.validate();
        break;

      default:
        break;
    }
  }, [debounced]);

  return (
    <div className="pt-10 flex flex-col items-center relative h-full">
      <div className="absolute">
        <Title order={2} mb={'sm'}>
          {t('register.title')}
        </Title>
        <StepperIcons
          icons={[
            <IconPencil key={0} />,
            <IconAlignCenter key={1} />,
            <IconMapPin key={3} />,
            <IconUserCircle key={6} />,
            <IconMusic key={4} />,
            <IconRulerMeasure key={7} />,
            <IconExternalLink key={2} />,
            <IconBoxMultiple key={5} />,

            <IconArrowUpBar key={5} />,
            <IconChecks key={6} />,
          ]}
          currentStep={formStep}
          form={form}
        />
      </div>
      <ScrollArea className="mt-28 mb-20 w-full h-full">
        <Stepper active={formStep} {...stepperProps}>
          {/* STEP 0 */}
          <Stepper.Step>
            <Fade isVisible={stepWillChange} afterHide={nextStep}>
              <NameStep form={form} translate="host" />
            </Fade>
          </Stepper.Step>

          {/* STEP 1 */}
          <Stepper.Step>
            <Fade isVisible={stepWillChange} afterHide={nextStep}>
              <DescriptionStep form={form} translate="host" />
            </Fade>
          </Stepper.Step>

          {/* STEP 2 */}
          <Stepper.Step>
            <Fade isVisible={stepWillChange} afterHide={nextStep}>
              <AddressCompleteStep
                form={form}
                type="address"
                translate="host"
              />
            </Fade>
          </Stepper.Step>

          {/* STEP 3 */}
          <Stepper.Step>
            <Fade isVisible={stepWillChange} afterHide={nextStep}>
              <ProfilePictureStep form={form} />
            </Fade>
          </Stepper.Step>

          {/* STEP 4 */}
          <Stepper.Step>
            <Fade isVisible={stepWillChange} afterHide={nextStep}>
              <GenreStep form={form} />
            </Fade>
          </Stepper.Step>

          {/* STEP 5 */}
          <Stepper.Step>
            <Fade isVisible={stepWillChange} afterHide={nextStep}>
              <CapacityStep form={form} />
            </Fade>
          </Stepper.Step>

          {/* STEP 6 */}
          <Stepper.Step>
            <Fade isVisible={stepWillChange} afterHide={nextStep}>
              <SocialLinksStep links={linksHost} form={form} />
            </Fade>
          </Stepper.Step>

          {/* STEP 7 */}
          <Stepper.Step>
            <Fade isVisible={stepWillChange} afterHide={nextStep}>
              <PresentationPicturesStep form={form} />
            </Fade>
          </Stepper.Step>

          <Stepper.Step
            icon={<IconCircleCheck />}
            completedIcon={<IconCircleCheckFilled />}
          >
            <Loader variant="bars" />
          </Stepper.Step>

          <Stepper.Completed>
            <StepperCompleted
              label={t('register.competeProfile')}
              path="auth/profile"
            />
          </Stepper.Completed>
        </Stepper>
      </ScrollArea>

      <StepButtons
        formStep={formStep}
        nextStep={handleNextStep}
        numberOfSteps={NUMBER_OF_STEPS}
        prevStep={prevStep}
      />
    </div>
  );
};

export default RegisterHostProfile;
