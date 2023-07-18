import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandYoutube,
  IconWorldWww,
} from '@tabler/icons-react';
import { LinkUtils } from '../../services/LinkUtils';

export const hostInitialValues = {
  name: '',
  description: '',

  instagramLink: '',
  facebookLink: '',
  youtubeLink: '',
  websiteLink: '',

  address: {
    value: '',
    longitude: 0,
    latitude: 0,
  },
  genres: [],
  gallery: [],
  picture: '',
};

export const hostValidate = (
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
    case 2:
      return {
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
        youtubeLink: LinkUtils.validateLink(
          values.youtubeLink,
          'youtube.com',
          'Youtube'
        ),
        websiteLink: LinkUtils.validateLink(
          values.websiteLink,
          'http',
          'de site web valide'
        ),
      };
    case 3:
      return {
        address:
          values.address.value.length === 0 || values.address.value.length > 5
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
};

export const linksHost = [
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
    label: 'Youtube',
    value: 'youtubeLink',
    color: 'red',
    icon: <IconBrandYoutube />,
  },
  {
    label: 'Site',
    value: 'websiteLink',
    color: 'blue',
    icon: <IconWorldWww />,
  },
];
