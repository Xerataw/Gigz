import GigzFetcher from '../services/GigzFetcher';

interface IProfilePicture {
  media: string;
}

export const patchProfilePicture = async (file: File) => {
  const formData = new FormData();

  formData.append('profile-picture', file);

  return GigzFetcher.patch<IProfilePicture>('me/profile-picture', formData, {
    'Content-Type': 'multipart/form-data',
  });
};

export const deleteProfilePicture = async () => {
  return GigzFetcher.delete<IProfilePicture>('me/profile-picture');
};
