import { LinkUtils } from '../services/LinkUtils';
export const artistInitialValues = {
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
    case 2:
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
