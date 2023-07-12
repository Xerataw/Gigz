import { Carousel } from '@mantine/carousel';
import IMedia from '../../types/IMedia';

interface IMediaCarouselProps {
  mediaList: IMedia[];
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
