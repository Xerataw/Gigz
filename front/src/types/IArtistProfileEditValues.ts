import IProfileEditValues from './IProfileEditValues';

export interface IArtistProfileEditValues extends IProfileEditValues {
  spotifyLink?: string;
  deezerLink?: string;
  appleMusicLink?: string;
  soundcloudLink?: string;
  musicLink?: string;
}
