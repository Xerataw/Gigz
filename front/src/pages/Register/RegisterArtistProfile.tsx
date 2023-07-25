import { Loader, ScrollArea, Stepper, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import {
  IconAlignCenter,
  IconArrowUpBar,
  IconBoxMultiple,
  IconChecks,
  IconExternalLink,
  IconMapPin,
  IconMusic,
  IconPencil,
  IconUserCircle,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { patchArtistProfile } from '../../api/profile';
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
import { useUser } from '../../store/UserProvider';

const RegisterArtistProfile: React.FC = () => {
  const NUMBER_OF_STEPS = 7;

  const { t } = useTranslation();
  const user = useUser();
  const [formStep, setFormStep] = useState<number>(0);
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: artistInitialValues,
    validate: (values) => artistValidate(values, formStep),
  });
  const [debounced] = useDebouncedValue(form.values, 1000);

  const nextStep = () => {
    if (formStep === NUMBER_OF_STEPS - 1) {
      setFormStep((old) => old + 1);
      user.setName(form.values.name);
      user.setProfilePicture(form.values.picture);
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
            <NameStep form={form} label={t('register.nameStep')} />
          </Stepper.Step>

          <Stepper.Step>
            <DescriptionStep
              form={form}
              label={t('register.descriptionStep')}
            />
          </Stepper.Step>

          <Stepper.Step>
            <AddressCompleteStep
              form={form}
              type="municipality"
              label={t('register.addressCompleteStep')}
            />
          </Stepper.Step>

          <Stepper.Step>
            <ProfilePictureStep
              form={form}
              label={t('register.presentationPicturesStep')}
            />
          </Stepper.Step>

          <Stepper.Step>
            <GenreStep form={form} label={t('register.genreStep')} />
          </Stepper.Step>

          <Stepper.Step>
            <PresentationPicturesStep
              form={form}
              label={t('register.presentationPicturesStep')}
            />
          </Stepper.Step>

          <Stepper.Step>
            <SocialLinksStep
              links={linksArtist}
              form={form}
              label={t('register.socialLinksStep')}
            />
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
          nextStep={nextStep}
          prevStep={prevStep}
        />
      </div>
    </div>
  );
};

export default RegisterArtistProfile;
