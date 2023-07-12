import GigzFetcher from '../services/GigzFetcher';

interface IGalleryPhoto {
  media: string;
  accountId: number;
}

export const postPhotoGallery = (files: File[]) => {
  const formData = new FormData();

  files.forEach((file) => formData.append('media', file));

  return GigzFetcher.post<IGalleryPhoto[]>(
    'me/gallery',
    formData,
    { 'Content-Type': 'multipart/form-data' },
    true
  );
};

export const deletePhotoGallery = (index: number) => {
  return GigzFetcher.delete<IGalleryPhoto>('me/gallery/' + index, {}, {}, true);
};
