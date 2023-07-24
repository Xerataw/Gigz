import IProfile from './IProfile';

export default interface IArtistProfile extends IProfile {
  spotifyLink?: string;
  deezerLink?: string;
  appleMusicLink?: string;
  soundcloudLink?: string;

  musicLink?: string;
}
