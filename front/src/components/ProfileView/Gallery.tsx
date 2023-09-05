import { Carousel } from '@mantine/carousel';
import {
  Button,
  Card,
  Center,
  FileButton,
  Image,
  Loader,
  Text,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import GigzFetcher from '../../services/GigzFetcher';
import EMediaType from '../../types/EMediaType';
import IMedia from '../../types/IMedia';
import { handleAddFiles, maxFile } from '../Steps/PresentationPicturesStep';

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
  const isOnProfile = window.location.pathname.includes('profile');
  const [pictures, setPictures] = useState<IMedia[]>(
    mediaList.filter((media) => media.type === EMediaType.IMAGE)
  );

  const handleSetPictures = (pictures: IMedia[]) => {
    setPictures((old) => [...pictures, ...old]);
  };

  useEffect(() => {
    console.log('update pictures :', pictures);
  }, [pictures]);

  return loading ? (
    <Center h={slidesHeight}>
      <Loader />
    </Center>
  ) : (
    <Carousel withIndicators withControls={false} height={slidesHeight}>
      {pictures.map((media) => (
        <Carousel.Slide key={media.id}>
          <Image
            src={GigzFetcher.getImageUri(media.media)}
            height={slidesHeight}
            alt="Gallery"
          />
        </Carousel.Slide>
      ))}
      {isOnProfile && pictures.length < maxFile && (
        <Carousel.Slide
          key="edit profile"
          className="flex flex-col justify-center"
        >
          <Card
            shadow="sm"
            radius="md"
            withBorder
            className="h-[200px] py-[5px] flex flex-col justify-center m-5"
          >
            <div>
              <Text align="center" mb="sm" weight={500}>
                {t('register.presentationPicturesStep.add')}
              </Text>
              <Center>
                <FileButton
                  onChange={(e) =>
                    handleAddFiles(e, handleSetPictures, pictures, maxFile)
                  }
                  accept="image/png,image/jpeg"
                  multiple
                >
                  {(props) => (
                    <Button {...props}>
                      <IconPlus />
                    </Button>
                  )}
                </FileButton>
              </Center>
            </div>
          </Card>
        </Carousel.Slide>
      )}
    </Carousel>
  );
};

export default Gallery;
