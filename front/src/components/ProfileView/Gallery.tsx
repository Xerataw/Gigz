import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  Button,
  Card,
  Center,
  FileButton,
  Grid,
  Image,
  Loader,
  Text,
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import GigzFetcher from '../../services/GigzFetcher';
import EMediaType from '../../types/EMediaType';
import IMedia from '../../types/IMedia';
import {
  handleAddFiles,
  handleRemovePicture,
  maxFile,
} from '../Steps/PresentationPicturesStep';

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
    setPictures(pictures);
  };
  const handleAddPictures = (pictures: IMedia[]) => {
    setPictures((old) => [...old, ...pictures]);
  };

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
      {isOnProfile && (
        <Carousel.Slide
          key="edit profile"
          className="flex flex-col justify-center"
        >
          <Card
            shadow="sm"
            radius="md"
            withBorder
            className="h-[150px] py-[5px] flex flex-col justify-center m-5"
          >
            <div>
              <Text align="center" mb="sm" weight={500}>
                {t('register.presentationPicturesStep.add')} {pictures.length}/
                {maxFile}
              </Text>
              <Center>
                <FileButton
                  disabled={pictures.length >= maxFile}
                  onChange={(e) =>
                    handleAddFiles(e, handleAddPictures, pictures, maxFile)
                  }
                  accept="image/png,image/jpeg"
                  multiple
                >
                  {(props) => (
                    <Button {...props} disabled={pictures.length >= maxFile}>
                      <IconPlus />
                    </Button>
                  )}
                </FileButton>
              </Center>
            </div>
          </Card>

          <Grid justify="center" px="md">
            {pictures.map((image, index) => (
              <Grid.Col key={index} span={6}>
                <div className="relative">
                  <Image
                    radius="md"
                    fit="cover"
                    withPlaceholder
                    key={index}
                    height={100}
                    src={GigzFetcher.getImageUri(image.media)}
                  />
                  <div className="absolute top-0 right-0">
                    <ActionIcon
                      color="red"
                      className="bg-white rounded-none rounded-bl-lg"
                      onClick={() =>
                        handleRemovePicture(
                          image.id,
                          pictures,
                          handleSetPictures
                        )
                      }
                    >
                      <IconTrash size={'sm'} />
                    </ActionIcon>
                  </div>
                </div>
              </Grid.Col>
            ))}
          </Grid>
        </Carousel.Slide>
      )}
    </Carousel>
  );
};

export default Gallery;
