import { Loader, ScrollArea, Stepper, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import {
  IconAlignCenter,
  IconArrowUpBar,
  IconBoxMultiple,
  IconChecks,
  IconDeviceTvOld,
  IconExternalLink,
  IconMapPin,
  IconMusic,
  IconPencil,
  IconUserCircle,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { patchArtistProfile } from '../../api/user';
import Fade from '../../components/Animations/Fade';
import AddressCompleteStep from '../../components/Steps/AddressCompleteStep';
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
  artistInitialValues,
  artistValidate,
  getArtistValuesReq,
  linksArtist,
} from '../../configs/steppers/stepperArtistConfig';
import { useHistory } from 'react-router';
import EmbedStep from '../../components/Steps/EmbedStep';

const RegisterArtistProfile: React.FC = () => {
  const NUMBER_OF_STEPS = 8;
  const history = useHistory();

  const { t } = useTranslation();
  const [formStep, setFormStep] = useState<number>(0);
  const [stepWillChange, setStepWillChange] = useState<boolean>(false);

  const form = useForm({
    validateInputOnBlur: true,
    initialValues: artistInitialValues,
    validate: (values) => artistValidate(values, formStep),
  });
  const [debounced] = useDebouncedValue(form.values, 1000);

  const nextStep = () => {
    if (formStep === NUMBER_OF_STEPS - 1) {
      setFormStep((old) => old + 1);
      patchArtistProfile(getArtistValuesReq(form.values)).then(() => {
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

      default:
        break;
    }
  }, [debounced]);

  useEffect(() => {
    if (formStep > 0) history.push('/register/artist/' + formStep);
  }, [formStep]);

  useEffect(() => {
    setFormStep(
      Number.parseInt(window.location.pathname.split('artist/')[1] ?? 0)
    );
  }, []);

  return (
    <div className="pt-10 border border-red-500 flex flex-col items-center relative h-full">
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
            <IconBoxMultiple key={5} />,
            <IconExternalLink key={2} />,
            <IconDeviceTvOld key={10} />,

            <IconArrowUpBar key={8} />,
            <IconChecks key={9} />,
          ]}
          currentStep={formStep}
          form={form}
        />
      </div>
      <ScrollArea className="mt-28 mb-20 w-full h-full">
        <Stepper active={formStep} {...stepperProps}>
          <Stepper.Step>
            <Fade isVisible={stepWillChange} afterHide={nextStep}>
              <NameStep form={form} />
            </Fade>
          </Stepper.Step>

          <Stepper.Step>
            <Fade isVisible={stepWillChange} afterHide={nextStep}>
              <DescriptionStep form={form} />
            </Fade>
          </Stepper.Step>

          <Stepper.Step>
            <Fade isVisible={stepWillChange} afterHide={nextStep}>
              <AddressCompleteStep form={form} type="municipality" />
            </Fade>
          </Stepper.Step>

          <Stepper.Step>
            <Fade isVisible={stepWillChange} afterHide={nextStep}>
              <ProfilePictureStep form={form} />
            </Fade>
          </Stepper.Step>

          <Stepper.Step>
            <Fade isVisible={stepWillChange} afterHide={nextStep}>
              <GenreStep form={form} />
            </Fade>
          </Stepper.Step>

          <Stepper.Step>
            <Fade isVisible={stepWillChange} afterHide={nextStep}>
              <PresentationPicturesStep form={form} />
            </Fade>
          </Stepper.Step>

          <Stepper.Step>
            <Fade isVisible={stepWillChange} afterHide={nextStep}>
              <SocialLinksStep links={linksArtist} form={form} />
            </Fade>
          </Stepper.Step>

          <Stepper.Step>
            <Fade isVisible={stepWillChange} afterHide={nextStep}>
              <EmbedStep form={form} />
            </Fade>
          </Stepper.Step>

          <Stepper.Step>
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

      <div className="absolute bottom-3">
        <StepButtons
          formStep={formStep}
          numberOfSteps={NUMBER_OF_STEPS}
          nextStep={handleNextStep}
          prevStep={prevStep}
        />
      </div>
    </div>
  );
};

export default RegisterArtistProfile;
