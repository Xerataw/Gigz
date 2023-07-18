import { Loader, Stepper, Title } from '@mantine/core';
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
import StepButtons from '../../components/Steps/Utils/StepButtons';
import StepperIcons from '../../components/Steps/Utils/StepperIcons';
import {
  artistInitialValues,
  artistValidate,
  linksArtist,
} from '../../configs/steppers/stepperArtistConfig';

const RegisterArtistProfile: React.FC = () => {
  const numberOfSteps = 7;

  const { t } = useTranslation();
  const [formStep, setFormStep] = useState<number>(0);
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: artistInitialValues,
    validate: (values) => artistValidate(values, formStep),
  });
  const [debounced] = useDebouncedValue(form.values, 1000);

  const nextStep = () => {
    if (formStep === numberOfSteps - 1) {
      setFormStep((old) => old + 1);

      patchArtistProfile(form.values).then((res) => {
        setFormStep((old) => old + 1);
      });
    } else {
      setFormStep((current) => {
        if (form.validate().hasErrors) {
          return current;
        }
        return current < numberOfSteps - 1 ? current + 1 : current;
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
          <IconExternalLink key={2} />,
          <IconMapPin key={3} />,
          <IconMusic key={4} />,
          <IconBoxMultiple key={5} />,
          <IconUserCircle key={6} />,

          <IconArrowUpBar key={8} />,
          <IconChecks key={9} />,
        ]}
        currentStep={formStep}
        form={form}
      />
      <Stepper
        active={formStep}
        p="xl"
        w={'100%'}
        styles={{
          stepIcon: {
            display: 'none',
          },

          separator: {
            display: 'none',
          },
        }}
      >
        <Stepper.Step>
          <NameStep form={form} label={t('stepper.nameStep')} />
        </Stepper.Step>

        <Stepper.Step>
          <DescriptionStep form={form} label={t('stepper.descriptionStep')} />
        </Stepper.Step>

        <Stepper.Step>
          <SocialLinksStep
            links={linksArtist}
            form={form}
            label={t('stepper.socialLinksStep')}
          />
        </Stepper.Step>

        <Stepper.Step>
          <AddressCompleteStep
            form={form}
            label={t('stepper.addressCompleteStep')}
          />
        </Stepper.Step>

        <Stepper.Step>
          <GenreStep form={form} label={t('stepper.genreStep')} />
        </Stepper.Step>

        <Stepper.Step>
          <PresentationPicturesStep
            form={form}
            label={t('stepper.presentationPicturesStep')}
          />
        </Stepper.Step>

        <Stepper.Step>
          <ProfilePictureStep
            form={form}
            label={t('stepper.presentationPicturesStep')}
          />
        </Stepper.Step>

        <Stepper.Step>
          <Loader variant="bars" />
        </Stepper.Step>

        <Stepper.Completed>
          <div>this form is completed</div>
          <div>redirect to home</div>
        </Stepper.Completed>
      </Stepper>

      <StepButtons
        formStep={formStep}
        numberOfSteps={numberOfSteps}
        nextStep={nextStep}
        prevStep={prevStep}
      />
    </div>
  );
};

export default RegisterArtistProfile;
