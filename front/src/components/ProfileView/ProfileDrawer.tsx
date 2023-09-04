import { Global } from '@emotion/react';
import { ScrollArea, useMantineColorScheme } from '@mantine/core';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { ReactNode, useState } from 'react';
import IArtistProfile from '../../types/IArtistProfile';
import IHostProfile from '../../types/IHostProfile';
import ProfileBanner from './ProfileBanner';
import MusicEmbed from './ProfileSections/MusicEmbeds/MusicEmbed';
import { useProfileEdit } from '../../store/ProfileEditProvider';
import EmbedEdit from './EditFields/EmbedEdit';

interface IProfileDrawerProps {
  profile: IArtistProfile | IHostProfile;
  profileLoading: boolean;
  children: ReactNode;
}

const ProfileDrawer: React.FC<IProfileDrawerProps> = ({
  profile,
  profileLoading,
  children,
}) => {
  const { editMode } = useProfileEdit();
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const toggleDrawer = () => setDrawerOpened(!drawerOpened);

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const hasMusicEmbed =
    (!profileLoading &&
      'musicLink' in profile &&
      typeof profile.musicLink === 'string' &&
      profile.musicLink.length > 0) ||
    editMode;

  return (
    <div>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(75% - ${hasMusicEmbed ? '9.375' : '6.25'}rem)`,
            overflow: 'visible',
            backgroundColor: isDark ? '#1A1B1E' : 'white',
          },
        }}
      />
      <SwipeableDrawer
        open={drawerOpened}
        onOpen={toggleDrawer}
        onClose={toggleDrawer}
        anchor="bottom"
        disableSwipeToOpen={false}
        disableDiscovery={true}
        allowSwipeInChildren={false}
        swipeAreaWidth={hasMusicEmbed ? 280 : 180}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div
          className={`absolute visible right-0 left-0 ${
            hasMusicEmbed ? '-top-[17.5rem]' : '-top-[11.25rem]'
          }`}
        >
          <ProfileBanner
            username={profile?.name}
            loading={profileLoading}
            profilePicture={profile?.profilePicture}
            city={profile?.city}
            genres={profile?.genres}
            capacity={(profile as IHostProfile)?.capacity}
            withDrawer={true}
            drawerOpened={drawerOpened}
          />
        </div>
        <ScrollArea
          className={
            (isDark ? ' bg-[#1A1B1E] ' : ' bg-white ') +
            (hasMusicEmbed ? 'p-4 pt-0 pb-16 ' : 'p-4 pt-0 pb-16  -mt-12')
          }
          style={hasMusicEmbed ? { marginTop: '-9.2rem' } : undefined}
          type="never"
        >
          {hasMusicEmbed && (
            <div className="-mb-10 visible ">
              {editMode ? (
                <EmbedEdit
                  defaultLink={(profile as IArtistProfile)?.musicLink}
                />
              ) : (
                <MusicEmbed
                  musicLink={(profile as IArtistProfile)?.musicLink as string}
                />
              )}
            </div>
          )}
          {children}
        </ScrollArea>
      </SwipeableDrawer>
    </div>
  );
};

export default ProfileDrawer;
