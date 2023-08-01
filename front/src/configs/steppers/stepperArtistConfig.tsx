import {
  IconBrandApple,
  IconBrandDeezer,
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandSoundcloud,
  IconBrandSpotify,
  IconBrandYoutube,
  IconWorldWww,
} from '@tabler/icons-react';
import { LinkUtils } from '../../services/LinkUtils';
import IArtistProfile from '../../types/IArtistProfile';

export const artistInitialValues = {
  name: '',
  description: '',

  websiteLink: '',
  instagramLink: '',
  facebookLink: '',
  youtubeLink: '',

  spotifyLink: '',
  deezerLink: '',
  appleMusicLink: '',
  soundcloudLink: '',

  address: {
    value: '',
    city: '',
    cityCode: '',
    longitude: 0,
    latitude: 0,
  },

  genres: [],
  gallery: [],
  picture: '',
};

export const artistValidate = (
  values: { [key: string]: any },
  formStep: number
) => {
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
    case 6:
      return {
        spotifyLink: LinkUtils.validateLink(
          values.spotifyLink,
          'spotify.com/artist',
          'Spotify'
        ),
        instagramLink: LinkUtils.validateLink(
          values.instagramLink,
          'instagram.com/',
          'Instagram'
        ),
        facebookLink: LinkUtils.validateLink(
          values.facebookLink,
          'facebook.com',
          'Facebook'
        ),
        soundcloudLink: LinkUtils.validateLink(
          values.soundcloudLink,
          'soundcloud.com',
          'SoundCloud'
        ),
        youtubeLink: LinkUtils.validateLink(
          values.youtubeLink,
          'youtube.com',
          'Youtube'
        ),
        appleMusicLink: LinkUtils.validateLink(
          values.appleMusicLink,
          'music.apple.com',
          'Apple Music'
        ),
        deezerLink: LinkUtils.validateLink(
          values.deezerLink,
          'www.deezer.com',
          'Deezer'
        ),
        websiteLink: LinkUtils.validateLink(
          values.websiteLink,
          'http',
          'de site web valide'
        ),
      };
    case 2:
      return {
        address:
          values.address.value.length === 0 || values.address.value.length > 1
            ? null
            : 'Veuillez entrer une adressse valide',
      };

    default:
      return {};
  }
};

export const linksArtist = [
  {
    label: 'Spotify',
    placeholder: 'https://open.spotify.com/...',
    value: 'spotifyLink',
    color: 'green',
    icon: <IconBrandSpotify />,
  },
  {
    label: 'Soundcloud',
    placeholder: 'https://soundcloud.com/...',
    value: 'soundcloudLink',
    color: 'orange',
    icon: <IconBrandSoundcloud />,
  },
  {
    label: 'AppleMusic',
    placeholder: 'https://music.apple.com/...',
    value: 'appleMusicLink',
    color: 'gray',
    icon: <IconBrandApple />,
  },
  {
    label: 'Deezer',
    placeholder: 'https://www.deezer.com/...',
    value: 'deezerLink',
    color: 'dark',
    icon: <IconBrandDeezer />,
  },
  {
    label: 'Instagram',
    placeholder: 'https://www.instagram.com/...',
    value: 'instagramLink',
    color: 'pink',
    icon: <IconBrandInstagram />,
  },
  {
    label: 'Facebook',
    placeholder: 'https://www.facebook.com/...',
    value: 'facebookLink',
    color: 'indigo',
    icon: <IconBrandFacebookFilled />,
  },
  {
    label: 'Youtube',
    placeholder: 'https://www.youtube.com/channel/...',
    value: 'youtubeLink',
    color: 'red',
    icon: <IconBrandYoutube />,
  },
  {
    label: 'Site',
    placeholder: 'https://www.mysite.com/...',
    value: 'websiteLink',
    color: 'blue',
    icon: <IconWorldWww />,
  },
];

export const getArtistValuesReq = (values: any): IArtistProfile => {
  return {
    ...values,
    ...values.address,
    city: values.address.value.split(',')[0],
  };
};
