import { Badge, Flex, Skeleton } from '@mantine/core';
import { IconCheck, IconMapPin, IconPencil, IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import GigzFetcher from '../../services/GigzFetcher';
import { useProfileEditMode } from '../../store/ProfileEditProvider';
import IGenre from '../../types/IGenre';
import LightRoundButton from '../LightRoundButton';
import ProfilePicture from '../ProfilePicture';

interface IProfileBannerProps {
  username: string;
  loading: boolean;
  profilePicture?: string;
  city?: string;
  genres: IGenre[];
  withDrawer?: boolean;
  drawerOpened?: boolean;
}

const loadingGenres: IGenre[] = [
  { id: 1, name: 'loading' },
  { id: 2, name: 'loading' },
  { id: 3, name: 'loading' },
];

const ProfileBanner: React.FC<IProfileBannerProps> = ({
  username,
  loading,
  profilePicture,
  city,
  genres,
  withDrawer = false,
  drawerOpened = false,
}) => {
  const { t } = useTranslation();
  const { editMode, editConfirmed } = useProfileEditMode();
  const canEdit = useLocation().pathname.includes('/auth/profile');
  const genresToDisplay = loading ? loadingGenres : genres;

  return (
    <div className="bg-white pl-3 pr-3 rounded-tl-md rounded-tr-md">
      {withDrawer && (
        <span className="w-[15%] ml-[42.5%] inline-block h-1.5 bg-gray-700 rounded-md"></span>
      )}
      {!loading && canEdit && (
        <div className="relative">
          {editMode.editMode ? (
            <Flex className="absolute -top-3 right-0" gap="xs">
              <LightRoundButton
                onClick={() => {
                  editConfirmed.setEditConfirmed(true);
                  editMode.setEditMode(false);
                }}
              >
                <IconCheck
                  size="1.5rem"
                  className="mt-[0.075rem] mr-[0.125rem]"
                />
              </LightRoundButton>
              <LightRoundButton onClick={() => editMode.setEditMode(false)}>
                <IconX size="1.5rem" className="mt-[0.075rem] mr-[0.125rem]" />
              </LightRoundButton>
            </Flex>
          ) : (
            <LightRoundButton
              onClick={() => editMode.setEditMode(!editMode.editMode)}
              disabled={!drawerOpened}
              className="absolute -top-3 right-0"
            >
              <IconPencil size="1.5rem" />
            </LightRoundButton>
          )}
        </div>
      )}
      <div className="flex flex-row flex-nowrap items-center pt-3 pb-3">
        <Skeleton visible={loading} w="5.5rem" radius="md">
          <ProfilePicture
            src={
              loading ? null : GigzFetcher.getImageUri(profilePicture as string)
            }
            radius="xl"
            size="xl"
            alt={username}
          />
        </Skeleton>
        <div className="ml-3">
          <Skeleton
            visible={loading}
            h={loading ? '1.5rem' : 'inherit'}
            mb={loading ? '0.25rem' : 'inherit'}
            className="flex flex-row flex-nowrap items-center"
          >
            <h3 className="pr-2">{username}</h3>
          </Skeleton>
          <Skeleton
            visible={loading}
            h={loading ? '1.5rem' : 'inherit'}
            mb={loading ? '0.25rem' : 'inherit'}
            className="flex flex-row flex-nowrap"
          >
            <IconMapPin size="20" className="mt-[2px]" />
            <p className="italic text-gray-600 font-semibold">
              {city ? city : t('profile.banner.emptyCity')}
            </p>
          </Skeleton>
          <ul className="flex flex-row flew-wrap p-0 m-0">
            {genresToDisplay?.map((genre) => (
              <li key={genre.id} className="mr-1">
                <Skeleton
                  h={loading ? '1.5rem' : 'inherit'}
                  mr={loading ? '0.25rem' : 'inherit'}
                  visible={loading}
                >
                  <Badge variant="filled">{genre.name}</Badge>
                </Skeleton>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
