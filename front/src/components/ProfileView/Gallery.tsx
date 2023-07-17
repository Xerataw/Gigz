import { Carousel } from '@mantine/carousel';
import { Center, Image, Loader } from '@mantine/core';
import { useContext } from 'react';
import { ProfileLoadingContext } from '../../pages/Profile/Profile';
import GigzFetcher from '../../services/GigzFetcher';
import EMediaType from '../../types/EMediaType';
import IMedia from '../../types/IMedia';

interface IGalleryProps {
  mediaList: IMedia[];
  withEmbed?: boolean;
}

const Gallery: React.FC<IGalleryProps> = ({ mediaList, withEmbed = false }) => {
  const profileLoading = useContext(ProfileLoadingContext);
  const slidesHeight = withEmbed ? '35.75rem' : '42.25rem';

  return profileLoading ? (
    <Center h={slidesHeight}>
      <Loader />
    </Center>
  ) : (
    <Carousel withIndicators withControls={false} height={slidesHeight}>
      {mediaList.map(
        (media) =>
          media.type === EMediaType.IMAGE && (
            <Carousel.Slide key={media.id}>
              <Image
                src={GigzFetcher.getImageUri(media.source)}
                height={slidesHeight}
                alt="Gallery"
              />
            </Carousel.Slide>
          )
      )}
    </Carousel>
  );
};

export default Gallery;
