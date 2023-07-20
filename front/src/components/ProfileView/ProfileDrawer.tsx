import { ReactNode, useContext, useState } from 'react';
import { Global } from '@emotion/react';
import { ScrollArea } from '@mantine/core';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ProfileBanner from './ProfileBanner';
import MusicEmbed from './ProfileSections/MusicEmbeds/MusicEmbed';
import IArtistProfile from '../../types/IArtistProfile';
import IHostProfile from '../../types/IHostProfile';
import { ProfileContext } from '../../pages/Profile/Profile';

interface IProfileDrawerProps {
  profile: IArtistProfile | IHostProfile;
  children: ReactNode;
}

const ProfileDrawer: React.FC<IProfileDrawerProps> = ({
  profile,
  children,
}) => {
  const profileLoading = useContext(ProfileContext).loading;
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const toggleDrawer = () => setDrawerOpened(!drawerOpened);

  const hasMusicEmbed =
    !profileLoading &&
    'musicLink' in profile &&
    typeof profile.musicLink === 'string' &&
    profile.musicLink.length > 0;

  return (
    <div>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(75% - ${hasMusicEmbed ? '9.375' : '6.25'}rem)`,
            overflow: 'visible',
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
            username={profileLoading ? 'loading username' : profile.name}
            loading={profileLoading}
            profilePicture={
              profileLoading
                ? 'loading profile picture'
                : profile.profilePicture
            }
            city={profileLoading ? 'loading city name' : profile.city}
            genres={profileLoading ? [] : profile.genres}
            withDrawer={true}
            drawerOpened={drawerOpened}
          />
        </div>
        <ScrollArea
          className={
            hasMusicEmbed
              ? 'p-4 pt-0 pb-16 bg-white'
              : 'p-4 pt-0 pb-16 bg-white -mt-12'
          }
          style={hasMusicEmbed ? { marginTop: '-9.2rem' } : undefined}
          type="never"
        >
          {hasMusicEmbed && (
            <div className="-mb-10 visible">
              <MusicEmbed musicLink={profile.musicLink as string} />
            </div>
          )}
          {children}
        </ScrollArea>
      </SwipeableDrawer>
    </div>
  );
};

export default ProfileDrawer;
