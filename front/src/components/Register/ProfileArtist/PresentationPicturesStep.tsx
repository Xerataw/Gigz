import {
  ActionIcon,
  Button,
  Card,
  Center,
  FileButton,
  Grid,
  Group,
  Image,
  Text,
  Title,
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { postPhotoGallery } from '../../../api/gallery';
import { IStepProps } from '../AccountStep/FirstStep';

const PresentationPicturesStep: React.FC<IStepProps> = ({ form }) => {
  const maxFile = 5;
  const [pictures, setPictures] = useState<string[]>(form.values.gallery);

  const handleRemovePicture = (indexToRemove: number) => {
    /**
     * May the route be patch
     *
     * deletePhotoGallery(indexToRemove).then(() =>
     *   setPictures((old) => [
     *     ...old.slice(0, indexToRemove),
     *     ...old.slice(indexToRemove + 1, old.length),
     *   ])
     * );
     */
  };

  const handleAddFiles = (filesToAdd: File[]) => {
    postPhotoGallery(filesToAdd)
      .then((res) => res.data)
      .then((res) => res?.map((picture) => picture.media))
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
      <Title mb="sm">À quoi ressemble votre groupe ?</Title>

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
                src={'http://localhost:3000/static/' + image}
              />
              <div className="absolute top-0 right-0">
                <ActionIcon
                  color="red"
                  className="bg-white rounded-none rounded-bl-lg"
                  onClick={() => handleRemovePicture(index)}
                >
                  <IconTrash size={'sm'} />
                </ActionIcon>
              </div>
            </div>
          </Grid.Col>
        ))}
        {pictures.length < 5 && (
          <Grid.Col span={6}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group mt="md" mb="xs">
                <Text align="center" weight={500}>
                  Ajouter des images
                </Text>
              </Group>

              <Text size="sm" color="dimmed" align="center">
                Vous pouvez ajouter jusqu&apos;à 5 images ({pictures.length}/
                {maxFile}) qui vous représentent
              </Text>
              <Center mt="sm">
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
            </Card>
          </Grid.Col>
        )}
      </Grid>
    </>
  );
};

export default PresentationPicturesStep;
