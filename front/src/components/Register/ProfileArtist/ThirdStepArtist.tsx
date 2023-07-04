import { ActionIcon, Chip, TextInput, ThemeIcon, Title } from '@mantine/core';
import {
  IconBrandApple,
  IconBrandDeezer,
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandSoundcloud,
  IconBrandSpotify,
  IconBrandYoutube,
  IconExternalLink,
  IconWorldWww,
} from '@tabler/icons-react';
import { StepProps } from '../AccountStep/FirstStep';

export interface Link {
  label: string;
  icon: React.JSX.Element;
  value: string;
  color: string;
}

const links = [
  {
    label: 'Spotify',
    value: 'spotifyLink',
    color: 'green',
    icon: <IconBrandSpotify />,
  },
  {
    label: 'Instagram',
    value: 'instagramLink',
    color: 'pink',
    icon: <IconBrandInstagram />,
  },
  {
    label: 'Facebook',
    value: 'facebookLink',
    color: 'indigo',
    icon: <IconBrandFacebookFilled />,
  },
  {
    label: 'Soundcloud',
    value: 'soundcloudLink',
    color: 'orange',
    icon: <IconBrandSoundcloud />,
  },
  {
    label: 'Youtube',
    value: 'youtubeLink',
    color: 'red',
    icon: <IconBrandYoutube />,
  },
  {
    label: 'AppleMusic',
    value: 'appleMusicLink',
    color: 'gray',
    icon: <IconBrandApple />,
  },
  {
    label: 'Deezer',
    value: 'deezerLink',
    color: 'dark',
    icon: <IconBrandDeezer />,
  },
  {
    label: 'Site',
    value: 'websiteLink',
    color: 'blue',
    icon: <IconWorldWww />,
  },
];

const ThirdStepArtist: React.FC<StepProps> = ({ form }) => {
  return (
    <>
      <Title>Où peut-on vous retrouver ?</Title>
      <Chip.Group>
        {links.map((link) => (
          <div className="my-3" key={link.value}>
            <TextInput
              {...form.getInputProps(link.value)}
              icon={
                <ThemeIcon size="lg" color={link.color} radius="xl">
                  {link.icon}
                </ThemeIcon>
              }
              rightSection={
                <ActionIcon
                  radius="xl"
                  color="dark"
                  onClick={() => {
                    window.open(form.values[link.value], '_blank');
                  }}
                  disabled={form.values[link.value].length <= 0}
                >
                  <IconExternalLink />
                </ActionIcon>
              }
              radius="xl"
              styles={(theme) => ({
                input: {
                  '&:focus-within': {
                    borderColor: theme.colors[link.color][7],
                    borderWidth: 3,
                  },
                },
              })}
            />
          </div>
        ))}
      </Chip.Group>
    </>
  );
};

export default ThirdStepArtist;
