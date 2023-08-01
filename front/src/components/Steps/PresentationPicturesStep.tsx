import {
  ActionIcon,
  Button,
  Card,
  Center,
  FileButton,
  Grid,
  Image,
  Text,
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import {
  IGalleryPhoto,
  deletePhotoGallery,
  postPhotoGallery,
} from '../../api/user';
import GigzFetcher from '../../services/GigzFetcher';
import { IStepProps } from '../../types/IStepProps';
import Helper from '../Tooltip/Helper';
import StepTitle from './Utils/StepTitle';

const PresentationPicturesStep: React.FC<IStepProps> = ({ form }) => {
  const maxFile = 5;
  const [pictures, setPictures] = useState<IGalleryPhoto[]>(
    form.values.gallery
  );

  const handleRemovePicture = (idToRemove: number) => {
    const indexToRemove =
      pictures.findIndex((pic) => pic.id === idToRemove) ?? 0;

    deletePhotoGallery(idToRemove).then(() => {
      setPictures((old) => [
        ...old.slice(0, indexToRemove),
        ...old.slice(indexToRemove + 1, old.length),
      ]);
    });
  };

  const handleAddFiles = (filesToAdd: File[]) => {
    postPhotoGallery(filesToAdd)
      .then((res) => res.data)
      .then((res) => {
        res?.forEach((picture) => {
          setPictures((old) => {
            if (old.length === maxFile) return old;
            return [...old, picture];
          });
        });
      });
  };

  useEffect(() => {
    form.values.gallery = pictures;
  }, [pictures]);

  return (
    <>
      <StepTitle label={t('register.presentationPicturesStep.label')} />
      <Helper.UnderTitle
        label={t('register.presentationPicturesStep.helper')}
        labelDirection="right"
      >
        {t('register.presentationPicturesStep.max')}
      </Helper.UnderTitle>

      <Grid justify="center">
        {pictures.map((image, index) => (
          <Grid.Col key={index} span={6}>
            <div className="relative">
              <Image
                radius="md"
                fit="cover"
                withPlaceholder
                key={index}
                height={200}
                src={GigzFetcher.getImageUri(image.media)}
              />
              <div className="absolute top-0 right-0">
                <ActionIcon
                  color="red"
                  className="bg-white rounded-none rounded-bl-lg"
                  onClick={() => handleRemovePicture(image.id)}
                >
                  <IconTrash size={'sm'} />
                </ActionIcon>
              </div>
            </div>
          </Grid.Col>
        ))}
        {pictures.length < 5 && (
          <Grid.Col span={6}>
            <Card
              shadow="sm"
              radius="md"
              withBorder
              className="h-[200px] py-[5px] flex flex-col justify-center"
            >
              <div>
                <Text align="center" mb="sm" weight={500}>
                  {t('register.presentationPicturesStep.add')}
                </Text>
                <Center>
                  <FileButton
                    onChange={handleAddFiles}
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
          </Grid.Col>
        )}
      </Grid>
    </>
  );
};

export default PresentationPicturesStep;
