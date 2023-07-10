import GigzFetcher from '../services/GigzFetcher';
import GigzResponse from '../types/GigzResponse';

interface IProfile {
  accountId: number;
  appleMusicLink: string | null;
  cityId: string | null;
  deezerLink: string | null;
  description: string | null;
  facebookLink: string | null;
  id: number;
  instagramLink: string | number;
  musicLink: string | null;
  name: string | null;
  profilePicture: string | null;
  soundcloudLink: string | null;
  spotifyLink: string | null;
  websiteLink: string | null;
  youtubeLink: string | null;
}

export class Profile {
  public static getProfilePicture = async (
    file: File
  ): Promise<GigzResponse<IProfile>> => {
    const formData = new FormData();

    formData.append('profile-picture', file);

    return GigzFetcher.patch(
      'profiles/profile-picture',
      formData,
      { 'Content-Type': 'multipart/form-data' },
      true
    );
  };
}

export default Profile;
