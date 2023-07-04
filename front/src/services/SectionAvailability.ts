import IProfile from '../types/IProfile';
import IArtistProfile from '../types/IArtistProfile';
import IHostProfile from '../types/IHostProfile';

export function isBioSectionAvaiblable(bio: string | undefined): boolean {
  return typeof bio === 'string' && bio.length > 0;
}

export function isMusicSectionAvailable(profile: IArtistProfile): boolean {
  return (
    (typeof profile.appleMusicLink === 'string' &&
      profile.appleMusicLink.length > 0) ||
    (typeof profile.deezerLink === 'string' && profile.deezerLink.length > 0) ||
    (typeof profile.spotifyLink === 'string' &&
      profile.spotifyLink.length > 0) ||
    (typeof profile.soundCloudLink === 'string' &&
      profile.soundCloudLink.length > 0) ||
    (typeof profile.youtubeLink === 'string' &&
      profile.youtubeLink.length > 0) ||
    (typeof profile.embedMusicLink === 'string' &&
      profile.embedMusicLink.length > 0)
  );
}

export function isMapSectionAvailable(profile: IHostProfile): boolean {
  return (
    typeof profile.longitude === 'number' &&
    typeof profile.latitude === 'number'
  );
}

export function isSocialsSectionAvailable(profile: IProfile): boolean {
  console.log(profile);
  return (
    (typeof profile.instagramLink === 'string' &&
      profile.instagramLink.length > 0) ||
    (typeof profile.facebookLink === 'string' &&
      profile.facebookLink.length > 0) ||
    (typeof profile.websiteLink === 'string' && profile.websiteLink.length > 0)
  );
}
