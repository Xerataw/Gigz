import { ActionIcon, Group, Loader, Stepper, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import {
  IconAlignCenter,
  IconArrowLeft,
  IconArrowRight,
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
import { patchArtistProfile } from '../../api/profile';
import AddressCompleteStep from '../../components/Register/ProfileSteps/AddressCompleteStep';
import DescriptionStep from '../../components/Register/ProfileSteps/DescriptionStep';
import GenreStep from '../../components/Register/ProfileSteps/GenreStep';
import NameStep from '../../components/Register/ProfileSteps/NameStep';
import PresentationPicturesStep from '../../components/Register/ProfileSteps/PresentationPicturesStep';
import ProfilePictureStep from '../../components/Register/ProfileSteps/ProfilePictureStep';
import SocialLinksStep from '../../components/Register/ProfileSteps/SocialLinksStep';
import StepperIcons from '../../components/Register/StepperIcons';
import {
  artistInitialValues,
  artistValidate,
} from '../../configs/profileFormArtistConfig';

const RegisterArtistProfile: React.FC = () => {
  const numberOfSteps = 7;

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
        Complétez votre profil
      </Title>
      <StepperIcons
        icons={[
          <IconPencil key={0} />,
          <IconAlignCenter key={1} />,
          <IconExternalLink key={2} />,
          <IconMapPin key={3} />,
          <IconMusic key={4} />,
          // <IconRulerMeasure key={7} />,
          <IconBoxMultiple key={5} />,
          <IconUserCircle key={6} />,

          <IconArrowUpBar key={8} />,
          <IconChecks key={9} />,
        ]}
        currentStep={formStep}
        nextStep={nextStep}
      />
      <Stepper
        active={formStep}
        p="xl"
        w={'100%'}
        styles={{
          stepIcon: {
            display: 'none',
            borderWidth: 4,
          },

          separator: {
            display: 'none',
          },
        }}
      >
        <Stepper.Step>
          <NameStep form={form} nextStep={() => nextStep()} />
        </Stepper.Step>

        <Stepper.Step>
          <DescriptionStep form={form} nextStep={() => nextStep()} />
        </Stepper.Step>

        <Stepper.Step>
          <SocialLinksStep form={form} nextStep={() => nextStep()} />
        </Stepper.Step>

        <Stepper.Step>
          <AddressCompleteStep form={form} nextStep={() => nextStep()} />
        </Stepper.Step>

        <Stepper.Step>
          <GenreStep form={form} nextStep={() => nextStep()} />
        </Stepper.Step>

        {/* <Stepper.Step>
          <CapacityStep form={form} nextStep={() => nextStep()} />
        </Stepper.Step> */}

        <Stepper.Step>
          <PresentationPicturesStep form={form} nextStep={() => nextStep()} />
        </Stepper.Step>

        <Stepper.Step>
          <ProfilePictureStep form={form} nextStep={() => nextStep()} />
        </Stepper.Step>

        <Stepper.Step>
          <Loader variant="bars" />
        </Stepper.Step>

        <Stepper.Completed>
          <div>this form is completed</div>
          <div>redirect to home</div>
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {formStep > 0 && formStep < numberOfSteps && (
          <ActionIcon variant="default" onClick={prevStep} size="lg">
            <IconArrowLeft />
          </ActionIcon>
        )}
        {formStep < numberOfSteps && (
          <ActionIcon
            variant="filled"
            color="primary"
            onClick={nextStep}
            size="xl"
          >
            <IconArrowRight />
          </ActionIcon>
        )}
      </Group>
    </div>
  );
};

export default RegisterArtistProfile;
