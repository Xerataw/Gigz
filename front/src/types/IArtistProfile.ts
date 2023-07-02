import IProfile from './IProfile';

export default interface IArtistProfile extends IProfile {
  instagramLink?: string;
  facebookLink?: string;
  twitterLink?: string;
  youtubeLink?: string;
  spotifyLink?: string;
  deezerLink?: string;
  appleMusicLink?: string;
  soundCloundLink?: string;
  embedMusicLink?: string;
}
