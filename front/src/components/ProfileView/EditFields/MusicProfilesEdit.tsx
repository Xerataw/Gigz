import { ActionIcon, Modal, useMantineColorScheme } from '@mantine/core';
import {
  IconBrandApple,
  IconBrandSoundcloud,
  IconBrandSpotify,
  IconBrandYoutube,
} from '@tabler/icons-react';
import { t } from 'i18next';
import { useState } from 'react';
import { useProfileEdit } from '../../../store/ProfileEditProvider';
import ExternalLinkIcon from '../../ExternalLinkIcon';
import ProfileSection from '../ProfileSections/ProfileSection';
import LinkEditModalContent, { ILinkEdit } from './LinkEditModalContent';
import { actionIconClassname, iconPencilOrPlus } from './SocialsEdit';

interface IMusicProfilesEditProps {
  spotifyLink?: string;
  deezerLink?: string;
  appleMusicLink?: string;
  youtubeLink?: string;
  soundcloudLink?: string;
}

const MusicProfilesEdit: React.FC<IMusicProfilesEditProps> = ({
  spotifyLink,
  deezerLink,
  appleMusicLink,
  youtubeLink,
  soundcloudLink,
}) => {
  const isLightTheme = useMantineColorScheme().colorScheme === 'light';
  const {
    setEditedSpotify,
    setEditedDeezer,
    setEditedAppleMusic,
    setEditedYoutube,
    setEditedSoundcloud,
  } = useProfileEdit();
  const [currentSpotify, setCurrentSpotify] = useState<string | undefined>(
    spotifyLink
  );
  const [currentDeezer, setCurrentDeezer] = useState<string | undefined>(
    deezerLink
  );
  const [currentAppleMusic, setCurrentAppleMusic] = useState<
    string | undefined
  >(appleMusicLink);
  const [currentYoutube, setCurrentYoutube] = useState<string | undefined>(
    youtubeLink
  );
  const [currentSoundcloud, setCurrentSoundcloud] = useState<
    string | undefined
  >(soundcloudLink);
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
      <ProfileSection name={t('profile.socials.title')}>
        <ul className="flex flex-flow flex-nowrap justify-start gap-4">
          <li className="relative">
            <ActionIcon
              className={actionIconClassname(isLightTheme)}
              onClick={() =>
                openEditionModal({
                  linkName: 'Spotify',
                  linkLogo: <IconBrandSpotify />,
                  updateLinkFunction: (newLink: string) => {
                    setCurrentSpotify(newLink);
                    setEditedSpotify(newLink);
                  },
                  defaultLink: currentSpotify,
                  placeholder: 'https://open.spotify.com/user/your-profile',
                  regex: RegExp(
                    '(?:https?://)?open\\.spotify\\.com/user/[a-zA-Z0-9]+/?'
                  ),
                })
              }
            >
              {iconPencilOrPlus(currentSpotify, isLightTheme)}
            </ActionIcon>
            <ExternalLinkIcon
              link={spotifyLink}
              logo={<IconBrandSpotify color="white" size="32" />}
              background="#1DB954"
            />
          </li>
          <li className="relative">
            <ActionIcon
              className={actionIconClassname(isLightTheme)}
              onClick={() =>
                openEditionModal({
                  linkName: 'Deezer',
                  linkLogo: (
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABGElEQVR4nGNgGAWjYBTQGEiuivmPjiVWx4bS2l44GHWAxOrYUHQsvTZahmFIgY+7JYo+7hZfjYoliojRKzi7azU6FprVYUGiA8RXf9wj8R8F7xZfTYxeodld/zHwnK7QoeYAiYGNggEHb1KMLN6mGYQiY5AYSG6/Wa7MXuPMUHQM08vfsj0UHQvVbyMtG75N1V/9Ns3gPwpO1QenAaiF/9ExTK9Ay7b/6BjkiFEHMIwCdPCzTfg/Bm4XAgfVNV+X1dd8Xf+jYhdwIswxaA/N1W//j45h5gpmnP+PjoUyz2NGwc9RB7QLhaLjrx1C4ALjmq+LxVU/11BkDBIDyeXqdsiAogEdw0IWFNwYOOXiEGsPjIJRwEBDAAAG0fix2AHJfwAAAABJRU5ErkJggg==" />
                  ),
                  updateLinkFunction: (newLink: string) => {
                    setCurrentDeezer(newLink);
                    setEditedDeezer(newLink);
                  },
                  defaultLink: currentDeezer,
                  placeholder: 'https://www.deezer.com/profile/1111111',
                  regex: RegExp(
                    '(?:https?://)?(?:www\\.)?deezer\\.com(?:/en)?/profile/[0-9]+/?'
                  ),
                })
              }
            >
              {iconPencilOrPlus(currentDeezer, isLightTheme)}
            </ActionIcon>
            <ExternalLinkIcon
              link={deezerLink}
              logo={
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABGElEQVR4nGNgGAWjYBTQGEiuivmPjiVWx4bS2l44GHWAxOrYUHQsvTZahmFIgY+7JYo+7hZfjYoliojRKzi7azU6FprVYUGiA8RXf9wj8R8F7xZfTYxeodld/zHwnK7QoeYAiYGNggEHb1KMLN6mGYQiY5AYSG6/Wa7MXuPMUHQM08vfsj0UHQvVbyMtG75N1V/9Ns3gPwpO1QenAaiF/9ExTK9Ay7b/6BjkiFEHMIwCdPCzTfg/Bm4XAgfVNV+X1dd8Xf+jYhdwIswxaA/N1W//j45h5gpmnP+PjoUyz2NGwc9RB7QLhaLjrx1C4ALjmq+LxVU/11BkDBIDyeXqdsiAogEdw0IWFNwYOOXiEGsPjIJRwEBDAAAG0fix2AHJfwAAAABJRU5ErkJggg==" />
              }
            />
          </li>
          <li className="relative">
            <ActionIcon
              className={actionIconClassname(isLightTheme)}
              onClick={() =>
                openEditionModal({
                  linkName: 'Apple Music',
                  linkLogo: <IconBrandApple />,
                  updateLinkFunction: (newLink: string) => {
                    setCurrentAppleMusic(newLink);
                    setEditedAppleMusic(newLink);
                  },
                  defaultLink: currentAppleMusic,
                  placeholder: 'https://music.apple.com/your-profile',
                  regex: RegExp(
                    '/(?:https://)?music\\.apple\\.com(?:/[a-z]{2})?/artist/[-_a-zA-Z0-9]+/[0-9]+/?'
                  ),
                })
              }
            >
              {iconPencilOrPlus(currentAppleMusic, isLightTheme)}
            </ActionIcon>
            <ExternalLinkIcon
              link={appleMusicLink}
              logo={<IconBrandApple size="32" />}
            />
          </li>
          <li className="relative">
            <ActionIcon
              className={actionIconClassname(isLightTheme)}
              onClick={() =>
                openEditionModal({
                  linkName: 'Youtube',
                  linkLogo: <IconBrandYoutube />,
                  updateLinkFunction: (newLink: string) => {
                    setCurrentYoutube(newLink);
                    setEditedYoutube(newLink);
                  },
                  defaultLink: currentYoutube,
                  placeholder: 'https://youtube.com/user/your-profile',
                  regex: RegExp(
                    '(?:(?:https://)?(?:www\\.)?youtube\\.com/(?:c/|user/|channel/)|youtube\\.com/(?:c/|user/|channel/))(?:[a-zA-Z0-9_-]+)'
                  ),
                })
              }
            >
              {iconPencilOrPlus(currentYoutube, isLightTheme)}
            </ActionIcon>
            <ExternalLinkIcon
              link={youtubeLink}
              logo={<IconBrandYoutube color="white" size="32" />}
              background="#FF0000"
            />
          </li>
          <li className="relative">
            <ActionIcon
              className={actionIconClassname(isLightTheme)}
              onClick={() =>
                openEditionModal({
                  linkName: 'Soundcloud',
                  linkLogo: <IconBrandSoundcloud />,
                  updateLinkFunction: (newLink: string) => {
                    setCurrentSoundcloud(newLink);
                    setEditedSoundcloud(newLink);
                  },
                  defaultLink: currentSoundcloud,
                  placeholder: 'https://soundcloud.com/your-profile',
                  regex: RegExp(
                    '(?:https://)?(?:www\\.)?soundcloud\\.com/[a-zA-Z0-9-_]+/?'
                  ),
                })
              }
            >
              {iconPencilOrPlus(currentSoundcloud, isLightTheme)}
            </ActionIcon>
            <ExternalLinkIcon
              link={soundcloudLink}
              logo={<IconBrandSoundcloud color="white" size="32" />}
              background="#ff8800"
            />
          </li>
        </ul>
      </ProfileSection>

      <Modal
        opened={editLinkModalOpened}
        onClose={() => closeEditionModal()}
        withCloseButton={false}
        title="Edit social media link"
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

export default MusicProfilesEdit;
