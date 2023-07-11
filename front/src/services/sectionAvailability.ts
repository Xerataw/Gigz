import IArtistProfile from '../types/IArtistProfile';
import IHostProfile from '../types/IHostProfile';
import IProfile from '../types/IProfile';

/**
 * Check if the biography section of a profile can be displayed
 * @param bio the biography returned by the backend
 * @returns true if the biography can be displayed, false otherwise
 */
export const isBioSectionAvaiblable = (bio: string | undefined): boolean => {
  return typeof bio === 'string' && bio.length > 0;
};

/**
 * Check if the music section of an artist profile can be displayed
 * @param profile the artist profile returned by the backend
 * @returns true if the music section can be displayed, false otherwise
 */
export const isMusicSectionAvailable = (profile: IArtistProfile): boolean => {
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
    (typeof profile.musicLink === 'string' && profile.musicLink.length > 0)
  );
};

/**
 * Check if the map section of a host profile can be displayed
 * @param profile the host profile returned by the backend
 * @returns true if the map section can be displayed, false otherwise
 */
export const isMapSectionAvailable = (profile: IHostProfile): boolean => {
  return (
    typeof profile.longitude === 'number' &&
    typeof profile.latitude === 'number'
  );
};

/**
 * Check if the social media section of a host or artist profile can be displayed
 * @param profile the host or artist profile returned by the backend
 * @returns true if the social media section can be displayed, false otherwise
 */
export const isSocialsSectionAvailable = (profile: IProfile): boolean => {
  return (
    (typeof profile.instagramLink === 'string' &&
      profile.instagramLink.length > 0) ||
    (typeof profile.facebookLink === 'string' &&
      profile.facebookLink.length > 0) ||
    (typeof profile.websiteLink === 'string' && profile.websiteLink.length > 0)
  );
};
