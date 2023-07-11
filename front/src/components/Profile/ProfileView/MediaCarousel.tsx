import { Carousel } from '@mantine/carousel';
import Media from '../../../types/Media';

interface IMediaCarouselProps {
  mediaList: Media[];
}

const MediaCarousel: React.FC<IMediaCarouselProps> = ({ mediaList }) => {
  return (
    <Carousel>
      {mediaList.map((media) => (
        <Carousel.Slide key={media.source}>{media.source}</Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default MediaCarousel;
