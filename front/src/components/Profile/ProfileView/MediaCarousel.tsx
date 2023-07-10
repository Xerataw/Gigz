import { Carousel } from '@mantine/carousel';
import Media from '../../../types/Media';

export interface IMediaCarouselProps {
  mediaList: Media[];
}

export default function MediaCarousel({ mediaList }: IMediaCarouselProps) {
  return (
    <Carousel>
      {mediaList.map((media) => (
        <Carousel.Slide key={media.source}>{media.source}</Carousel.Slide>
      ))}
    </Carousel>
  );
}
