import {
  Button,
  Center,
  Modal,
  Skeleton,
  useMantineColorScheme,
} from '@mantine/core';
import { IconBrandSpotify, IconPencil } from '@tabler/icons-react';
import { useState } from 'react';
import { useProfileEdit } from '../../../store/ProfileEditProvider';
import LinkEditModalContent, { ILinkEdit } from './LinkEditModalContent';

interface IEmbedEditProps {
  defaultLink?: string;
}

const EmbedEdit: React.FC<IEmbedEditProps> = ({ defaultLink }) => {
  const isLightTheme = useMantineColorScheme().colorScheme === 'light';
  const { setEditedMusicLink } = useProfileEdit();
  const [skeletonVisible, setSkeletonVisible] = useState<boolean>(
    defaultLink ? true : false
  );
  const [currentLink, setCurrentLink] = useState(defaultLink);
  const [editLinkModalOpened, setEditLinkModalOpened] =
    useState<boolean>(false);
  const [currentEditedLinkProps, setCurrentEditedLinkProps] =
    useState<ILinkEdit>();

  const openEditionModal = (editedLinkProps: ILinkEdit) => {
    setCurrentEditedLinkProps(editedLinkProps);
    setEditLinkModalOpened(true);
  };

  const closeEditionModal = () => {
    setCurrentEditedLinkProps(undefined);
    setEditLinkModalOpened(false);
  };

  return (
    <>
      <Skeleton
        visible={skeletonVisible}
        radius={skeletonVisible ? 'md' : undefined}
        className="w-full h-32 mb-12 border-0"
      >
        {currentLink ? (
          <>
            <iframe
              className="w-full border-0 -mb-[4.4rem]"
              src={`${currentLink.replace(
                '/track',
                '/embed/track'
              )}?utm_source=generator&theme=0`}
              loading="lazy"
              onLoad={() => {
                setSkeletonVisible(false);
              }}
            ></iframe>
            <Center>
              <Button
                leftIcon={<IconPencil size="1.2rem" />}
                className="mb-2"
                style={{ backgroundColor: '#1DB954' }}
                onClick={() =>
                  openEditionModal({
                    linkName: 'Spotify',
                    linkLogo: <IconBrandSpotify />,
                    updateLinkFunction: (newLink: string) => {
                      setCurrentLink(newLink);
                      setEditedMusicLink(newLink);
                    },
                    defaultLink: currentLink,
                    placeholder: 'https://open.spotify.com/track/your-track',
                    regex: RegExp(
                      '(?:https://open\\.spotify\\.com/track/[a-zA-Z0-9]+)/?'
                    ),
                  })
                }
              >
                Change your song
              </Button>
            </Center>
          </>
        ) : (
          <div
            className="w-full h-32 border-0 mb-12 rounded-2xl"
            style={{
              backgroundColor: isLightTheme
                ? 'rgb(241, 243, 245)'
                : 'rgb(37,38,43)',
            }}
          >
            <a
              href={currentLink}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <IconBrandSpotify
                className={
                  'w-[12%] h-auto p-0 ml-[44%] mr-[44%] mt-5 ' +
                  (isLightTheme ? ' text-black ' : ' text-white ')
                }
              />
            </a>
            <Center>
              <Button
                style={{ backgroundColor: '#1DB954' }}
                onClick={() =>
                  openEditionModal({
                    linkName: 'Spotify',
                    linkLogo: <IconBrandSpotify />,
                    updateLinkFunction: (newLink: string) => {
                      setCurrentLink(newLink);
                      setEditedMusicLink(newLink);
                    },
                    defaultLink: currentLink,
                    placeholder: 'https://open.spotify.com/track/your-track',
                    regex: RegExp(
                      '(?:https://open\\.spotify\\.com/track/[a-zA-Z0-9]+)/?'
                    ),
                  })
                }
              >
                Add your song
              </Button>
            </Center>
          </div>
        )}
      </Skeleton>

      <Modal
        opened={editLinkModalOpened}
        onClose={() => closeEditionModal()}
        withCloseButton={false}
        title="Edit your Spotify song"
        centered
        styles={{
          overlay: { zIndex: 10000 },
          inner: { zIndex: 100000 },
        }}
        closeOnEscape={false}
      >
        {editLinkModalOpened && (
          <LinkEditModalContent
            linkProps={currentEditedLinkProps as ILinkEdit}
            setModalOpened={setEditLinkModalOpened}
          />
        )}
      </Modal>
    </>
  );
};

export default EmbedEdit;
