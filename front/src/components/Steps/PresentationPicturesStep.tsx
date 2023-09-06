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
import { deletePhotoGallery, postPhotoGallery } from '../../api/user';
import GigzFetcher from '../../services/GigzFetcher';
import IMedia from '../../types/IMedia';
import { IStepProps } from '../../types/IStepProps';
import Helper from '../Tooltip/Helper';
import StepTitle from './Utils/StepTitle';

export const handleRemovePicture = (
  idToRemove: number,
  pictures: IMedia[],
  handleSetPictures: (pictures: IMedia[]) => void
) => {
  const indexToRemove = pictures.findIndex((pic) => pic.id === idToRemove) ?? 0;

  deletePhotoGallery(idToRemove).then(() => {
    handleSetPictures([
      ...pictures.slice(0, indexToRemove),
      ...pictures.slice(indexToRemove + 1, pictures.length),
    ]);
  });
};

export const handleAddFiles = (
  filesToAdd: File[],
  handleSetPictures: (pictures: IMedia[]) => void,
  pictures: IMedia[],
  maxFile: number
) => {
  postPhotoGallery(filesToAdd)
    .then((res) => res.data)
    .then((res) => {
      res?.forEach((picture) => {
        if (pictures.length < maxFile) handleSetPictures([picture]);
      });
    });
};
export const maxFile = 5;

const PresentationPicturesStep: React.FC<IStepProps> = ({ form }) => {
  const [pictures, setPictures] = useState<IMedia[]>(form.values.gallery);

  useEffect(() => {
    form.values.gallery = pictures;
  }, [pictures]);

  const handleSetPictures = (pictures: IMedia[]) => {
    setPictures((old) => [...pictures, ...old]);
  };

  return (
    <>
      <StepTitle label={t('register.presentationPicturesStep.label')} />
      <Helper.UnderTitle
        label={t('register.presentationPicturesStep.helper')}
        labelDirection="right"
      >
        {t('register.presentationPicturesStep.max')} ({pictures.length}/5)
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
                  onClick={() =>
                    handleRemovePicture(image.id, pictures, handleSetPictures)
                  }
                >
                  <IconTrash size={'sm'} />
                </ActionIcon>
              </div>
            </div>
          </Grid.Col>
        ))}
        {pictures.length < maxFile && (
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
          </Grid.Col>
        )}
      </Grid>
    </>
  );
};

export default PresentationPicturesStep;
