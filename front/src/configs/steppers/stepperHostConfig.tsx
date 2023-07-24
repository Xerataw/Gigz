import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandYoutube,
  IconWorldWww,
} from '@tabler/icons-react';
import { LinkUtils } from '../../services/LinkUtils';
import IHostProfile from '../../types/IHostProfile';

export const hostInitialValues = {
  name: '',
  description: '',

  websiteLink: '',
  instagramLink: '',
  facebookLink: '',
  youtubeLink: '',

  address: {
    value: '',
    city: '',
    cityCode: '',
    longitude: 0,
    latitude: 0,
  },

  capacity: 0,

  picture: '',
  genres: [],
  gallery: [],
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
    case 7:
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
    case 2:
      return {
        address:
          values.address.value.length === 0 || values.address.value.length > 5
            ? null
            : 'Veuillez entrer une adressse valide',
      };

    default:
      return {};
  }
};

export const linksHost = [
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

export const getHostValuesReq = (values: any): IHostProfile => {
  return { ...values, ...values.address, address: values.address.value };
};
