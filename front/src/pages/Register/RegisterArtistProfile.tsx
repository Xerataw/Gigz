import { ActionIcon, Group, Loader, Stepper, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import {
  IconAlignCenter,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpBar,
  IconChecks,
  IconCircleCheck,
  IconCircleCheckFilled,
  IconExternalLink,
  IconMapPin,
  IconMusic,
  IconPencil,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import FifthStepArtist from '../../components/Register/ProfileArtist/FifthStepArtist';
import FirstStepArtist from '../../components/Register/ProfileArtist/FirstStepArtist';
import FourthStepArtist from '../../components/Register/ProfileArtist/FourthStepArtist';
import SecondStepArtist from '../../components/Register/ProfileArtist/SecondStepArtist';
import ThirdStepArtist from '../../components/Register/ProfileArtist/ThirdStepArtist';
import StepperIcons from '../../components/Register/StepperIcons';

const linkRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const valideLink = (
  value: string,
  includeTag: string,
  errorLabel: string
): string | null => {
  return value.length === 0 ||
    (value.includes(includeTag) && linkRegex.test(value))
    ? null
    : 'Veuillez inclure un lien ' + errorLabel + '.';
};

const pathRoute = '/register/artist/';

const RegisterArtistProfile: React.FC = () => {
  const numberOfSteps = 5;

  const [formStep, setFormStep] = useState<number>(0);
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      name: '',
      description: '',
      spotifyLink: '',
      instagramLink: '',
      facebookLink: '',
      soundcloudLink: '',
      youtubeLink: '',
      appleMusicLink: '',
      websiteLink: '',
      deezerLink: '',
      address: {
        value: '',
        longitude: 0,
        latitude: 0,
      },
      genres: [],
    },
    validate: (values) => {
      switch (formStep) {
        case 0:
          return {
            name: /^.{2,255}$/.test(values.name)
              ? null
              : 'Veuillez entrer un nom de plus de 2 caractères',
          };

        case 1:
          return {
            description: /^.{0,2000}$/.test(values.description)
              ? null
              : 'La description est trop longue',
          };

        // links are all optional
        case 2:
          return {
            spotifyLink: valideLink(
              values.spotifyLink,
              'spotify.com/artist',
              'Spotify'
            ),
            instagramLink: valideLink(
              values.instagramLink,
              'instagram.com/',
              'Instagram'
            ),
            facebookLink: valideLink(
              values.facebookLink,
              'facebook.com',
              'Facebook'
            ),
            soundcloudLink: valideLink(
              values.soundcloudLink,
              'soundcloud.com',
              'SoundCloud'
            ),
            youtubeLink: valideLink(
              values.youtubeLink,
              'youtube.com',
              'Youtube'
            ),
            appleMusicLink: valideLink(
              values.appleMusicLink,
              'music.apple.com',
              'Apple Music'
            ),
            deezerLink: valideLink(
              values.deezerLink,
              'www.deezer.com',
              'Deezer'
            ),
            websiteLink: valideLink(
              values.websiteLink,
              'http',
              'de site web valide'
            ),
          };
        case 3:
          return {
            address:
              values.address.value.length === 0 ||
              values.address.value.length > 5
                ? null
                : 'Veuillez entrer une adressse valide',
          };

        case 4:
          //can have genres but optionnal
          return {
            genres: null,
          };

        default:
          return {};
      }
    },
  });
  const [debounced] = useDebouncedValue(form.values, 1000);

  const nextStep = () => {
    if (formStep === numberOfSteps - 1) {
      setFormStep((old) => old + 1);

      // simulate request
      setTimeout(() => {
        setFormStep((old) => old + 1);
      }, 1000);
    } else {
      setFormStep((current) => {
        if (form.validate().hasErrors) {
          return current;
        }
        return current < 4 ? current + 1 : current;
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

      case 1:
      case 2:
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
          <IconArrowUpBar key={5} />,
          <IconChecks key={6} />,
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
        <Stepper.Step icon={<IconPencil />}>
          {/* <Stepper.Step icon={<></>} > */}
          <FirstStepArtist form={form} nextStep={() => nextStep()} />
        </Stepper.Step>

        <Stepper.Step icon={<IconAlignCenter />}>
          <SecondStepArtist form={form} nextStep={() => nextStep()} />
        </Stepper.Step>

        <Stepper.Step icon={<IconExternalLink />}>
          <ThirdStepArtist form={form} nextStep={() => nextStep()} />
        </Stepper.Step>

        <Stepper.Step icon={<IconMapPin />}>
          <FourthStepArtist form={form} nextStep={() => nextStep()} />
        </Stepper.Step>

        <Stepper.Step icon={<IconMusic />}>
          <FifthStepArtist form={form} nextStep={() => nextStep()} />
        </Stepper.Step>

        <Stepper.Step
          icon={<IconCircleCheck />}
          completedIcon={<IconCircleCheckFilled />}
        >
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
