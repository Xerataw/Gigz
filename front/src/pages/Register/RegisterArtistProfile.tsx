import { Button, Group, Loader, Stepper, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import {
  IconAlignCenter,
  IconCircleCheck,
  IconCircleCheckFilled,
  IconExternalLink,
  IconPencil,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import FirstStepArtist from '../../components/Register/ProfileArtist/FirstStepArtist';
import SecondStepArtist from '../../components/Register/ProfileArtist/SecondStepArtist';
import ThirdStepArtist from '../../components/Register/ProfileArtist/ThirdStepArtist';

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

const RegisterArtistProfile: React.FC = () => {
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
      city: '',
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

        default:
          return {};
      }
    },
  });

  const [debounced] = useDebouncedValue(form.values, 600);

  const nextStep = () => {
    if (formStep === 2) {
      setFormStep((old) => old + 1);
      console.log('to send', form.values);

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

      case 1:
      case 2:
        break;
    }
  }, [debounced]);

  return (
    <div className="pt-10 border border-red-500 flex flex-col items-center">
      <Text>Informations du profil</Text>
      <Group position="right" m="xl" className="w-full">
        <Button disabled={formStep > 2}>Passer</Button>
      </Group>
      <Stepper active={formStep} orientation="horizontal" p="xl" w={'100%'}>
        <Stepper.Step icon={<IconPencil />}>
          <FirstStepArtist form={form} nextStep={() => nextStep()} />
        </Stepper.Step>
        <Stepper.Step icon={<IconAlignCenter />}>
          <SecondStepArtist form={form} nextStep={() => nextStep()} />
        </Stepper.Step>
        <Stepper.Step icon={<IconExternalLink />}>
          <ThirdStepArtist form={form} nextStep={() => nextStep()} />
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
        {formStep > 0 && (
          <Button
            variant="default"
            disabled={formStep === 3}
            onClick={prevStep}
          >
            Retour
          </Button>
        )}
        {formStep < 3 && <Button onClick={nextStep}>Prochaine étape</Button>}
      </Group>
    </div>
  );
};

export default RegisterArtistProfile;
