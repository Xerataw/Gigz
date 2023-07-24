import { Carousel } from '@mantine/carousel';
import { Center, Image, Loader } from '@mantine/core';
import GigzFetcher from '../../services/GigzFetcher';
import EMediaType from '../../types/EMediaType';
import IMedia from '../../types/IMedia';

interface IGalleryProps {
  mediaList: IMedia[];
  loading: boolean;
  withEmbed?: boolean;
}

const Gallery: React.FC<IGalleryProps> = ({
  mediaList,
  loading,
  withEmbed = false,
}) => {
  const slidesHeight = withEmbed ? '35.75rem' : '42.25rem';

  return loading ? (
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
