import EMediaType from '../types/EMediaType';
import IArtistProfile from '../types/IArtistProfile';
import IHostProfile from '../types/IHostProfile';
import IMedia from '../types/IMedia';

export function buildProfile(
  baseProfile: IArtistProfile | IHostProfile,
  profilePicture?: string
): IArtistProfile | IHostProfile {
  const finalGallery: IMedia[] = [];
  for (const galleryItem of baseProfile.gallery) {
    finalGallery.push({
      id: galleryItem.id,
      media: galleryItem.media,
      type: EMediaType.IMAGE,
    });
  }
  return {
    ...baseProfile,
    gallery: finalGallery.sort((media1, media2) => media1.id - media2.id),
    genres: baseProfile.genres ? baseProfile.genres : [],
    profilePicture,
  };
}
