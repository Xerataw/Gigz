import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import GigzFetcher from '../../services/GigzFetcher';
import EMediaType from '../../types/EMediaType';
import IMedia from '../../types/IMedia';

interface IGalleryProps {
  mediaList: IMedia[];
  withEmbed?: boolean;
}

const Gallery: React.FC<IGalleryProps> = ({ mediaList, withEmbed = false }) => {
  const slidesHeight = withEmbed ? '35.75rem' : '42.25rem';

  return (
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
